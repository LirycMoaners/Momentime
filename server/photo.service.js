const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

const originsWhitelist = ['http://localhost:4200'];

const corsOptions = {
  origin: function(origin, callback){
    const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials:true
}

app.use(cors(corsOptions));


const folders = fs.readdirSync('../src/assets/image/picture/');

app.get('/', function (req, res) {
  const categories = [];
  for(const folder of folders) {
    categories.push({
      category: folder,
      images: fs.readdirSync('../src/assets/image/picture/' + folder)
    })
  }
  res.send(categories);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
