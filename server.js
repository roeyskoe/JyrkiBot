require("dotenv").config();
const apikey = process.env.API_KEY; // Ladataan salainen api-avain .env-tiedostosta

const Discord = require("discord.js");

const bot = new Discord.Client();

bot.on("ready", () => {
  console.log("Ready"); 

});

bot.on("message", async message => {
  if(message.author.bot) return; // Jos botti lähettää viestin niin ignoorataan

  const command = message.content.toLowerCase();
  
  if(command === "jyrki") {
    await message.channel.send("älä tyrki");
  }
});

bot.login(apikey);