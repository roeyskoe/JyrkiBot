
const request = require('request')
const fs = require('fs');

data = require('./viestit.json');
async function lataa(){
    var n = 0;
    for(var i = 0; i < data.length; i++){
        if(data[i]["attachments"].length != 0){
            n++;
            path = "kuvat/" + data[i]["createdTimestamp"] + ".jpg";
            url = "https://cdn.discordapp.com/attachments/" + data[i]["channelID"] + "/" + data[i]["attachments"][0] +"/kuva.jpg";
            
            if(!fs.existsSync(path)){ // Jotta uudet kuvat saadaan helposti ladattua ilman olemassaolevien uudelleenlatausta
                await download(url, path, () => {
                    console.log(url)
                });
            }
        }
    }
    console.log(n);
}

async function download (url, path, callback)  {
    request.head(url, (err, res, body) => {
      request(url)
        .pipe(fs.createWriteStream(path))
        .on('close', callback)
    });

    return new Promise(resolve => setTimeout(resolve, 300)); // Ettei ladata liian nopeasti josta Discord ei tunnu tykkäävän.
  }


lataa();
