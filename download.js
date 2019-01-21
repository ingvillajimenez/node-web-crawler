const http = require('http');
const fs = require('fs');
const path = require('path');
const uuidv5 = require('uuid/v5');

const downloadpage = (URL) => {
    fs.mkdir(`./${uuidv5(URL, uuidv5.URL)}`, { recursive: true }, (err) => {
        if (err) throw err;
      });
    return URL;
}

downloadpage('https://www.google.com');