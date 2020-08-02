require("dotenv").config();
const apikey = process.env.API_KEY; // Ladataan salainen api-avain .env-tiedostosta

const Discord = require("discord.js");

const PiCamera = require('pi-camera');
const myCamera = new PiCamera({
  mode: 'photo',
  output: `kuva.jpg`,
  width: 1920,
  height: 1920,
  nopreview: true,
});

const commands = {
    apua: function(msg){
        msg.channel.send("Älä huoli, kyllä se siitä :)");
    },
    jyrki: function(msg){
        myCamera.snap()
            .then((result) => {
                msg.channel.send("", { files: ["kuva.jpg"] });
            })
            .catch((error) => {
                msg.channel.send(error);
        });
    },
    tallennakaikki: async function(msg){ // Tätä ei tietenkään jätettäisi oikeaan tuotantobottiin :)
        msg.channel.messages.fetch().then(async function(m){
            global.m = m;
            global.msgs = m.array();
            while(global.m.size > 0){ // Discord antaa enintään 100 viestiä kerralla.
                await msg.channel.messages.fetch({before: global.m.array()[global.m.size-1]["id"]}).then(function(ms){
                    global.msgs = global.msgs.concat(ms.array());
                    global.m = ms;
                    console.log(global.msgs.length);
                })
            }
            const fs = require('fs');
            let data = JSON.stringify(global.msgs);
            fs.writeFileSync('viestit.json', data);
        })
    }
}

var prevtime = 0;

const bot = new Discord.Client();

bot.on("ready", () => {
    console.log("Ready"); 
});

bot.on("message", async message => {
    if(message.author.bot) return; // Jos botti lähettää viestin niin ignoorataan
    if(message.channel.name != "jyrkikanava") return; // Kuunnellaan vaan tietyllä kanavalla

    var currtime = new Date();
    currtime = currtime.getTime();

    const command = message.content.toLowerCase();

    if(command in commands){
        if(currtime-prevtime < 60000){ // yksi minuutti
            await message.channel.send("Älä hätäile, Jyrki haluaa olla hetken rauhassa :(");
            return;
        }
    
        prevtime = currtime;

        await commands[command](message);
    }

});

bot.login(apikey);
