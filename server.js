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


const bot = new Discord.Client();

bot.on("ready", () => {
    console.log("Ready"); 
});

bot.on("message", async message => {
    if(message.author.bot) return; // Jos botti lähettää viestin niin ignoorataan
    if(message.channel.name != "jyrkikanava") return; // Kuunnellaan vaan tietyllä kanavalla
    const command = message.content.toLowerCase();
  
    if(command === "jyrki") {
        await message.channel.send("älä tyrki");
    }
    else if(command == "kuva"){
        myCamera.snap()
        .then((result) => {
            message.channel.send("kuva", { files: ["kuva.jpg"] });
        })
        .catch((error) => {
            console.log(error);
        });
    }
});

bot.login(apikey);
