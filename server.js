require("dotenv").config();
const apikey = process.env.API_KEY; // Ladataan salainen api-avain .env-tiedostosta

const Discord = require("discord.js");

const PiCamera = require('pi-camera');
const myCamera = new PiCamera({
  mode: 'photo',
  output: `kuva.jpg`,
  width: 1920,
  height: 1080,
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
