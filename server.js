require("dotenv").config();
const apikey = process.env.API_KEY; // Ladataan salainen api-avain .env-tiedostosta

const Discord = require("discord.js");

const PiCamera = require('pi-camera');
const myCamera = new PiCamera({
  mode: 'photo',
  output: `kuva.jpg`,
  width: 640,
  height: 480,
  nopreview: true,
});

var date = new Date();
var prevtime = date.getTime(); //Estetään spämmiä :D

const bot = new Discord.Client();

bot.on("ready", () => {
    console.log("Ready"); 
});

bot.on("message", async message => {
    if(message.author.bot) return; // Jos botti lähettää viestin niin ignoorataan
    if(message.channel.name != "jyrkikanava") return; // Kuunnellaan vaan tietyllä kanavalla
    const command = message.content.toLowerCase();

    if(command === "apua") {
        await message.channel.send("Älä huoli, kyllä se siitä :)");
    }
    else if(command == "jyrki"){
        const currtime = new Date();
        if(currtime.getTime()-prevtime < 60000){ // yksi minuutti
            await message.channel.send("Jyrkistä on juuri äsken otettu kuva. Odota pieni hetki :)");
            return;
        }
        myCamera.snap()
        .then((result) => {
            message.channel.send("", { files: ["kuva.jpg"] });
            prevtime = currtime.getTime();
        })
        .catch((error) => {
            console.log(error);
        });
    }
});

bot.login(apikey);
