const http = require('http');
const fs = require('fs');
const path = require('path');
const uuidv5 = require('uuid/v5');

const downloadpage = async (URL) => {

    console.log('downloading ' + URL)
    //generando el valor random para guardalo en la variable folder
    const folder =  await uuidv5(URL, uuidv5.URL) 
    //del modulo fs se usa mkdir para crear la carpeta
    fs.mkdir(`./${folder}`, { recursive: true }, (err) => {
        if (err) throw err;
    });
    //el callback va a retornar la informacion cuando se ejecute la funcion fetchPage
    const fetchPage = (linkUrl, callback) => {

        let content = ""; 
        //se hace la solicitud get a la url que se esta recibiendo
        const req = http.request(URL, function(res) {//la respuesta esta en res
            res.setEncoding("utf8");//se aplica un codigo utf8
            res.on("data", chunk => content += chunk); //se trabaja en los datos recibidos
    
            res.on("end", function () {//la respuesta cuando finaliza se va ejecutar un callback
                callback(folder, content, URL);
            });
        });
        //Para cachar el error
        req.on('error', (e) => console.error(e));
        //la solicitud se cierra
        req.end();
    }

    const write = (carpet, data, urlData) => {
        fs.writeFile(`./${carpet}/file.html`, data, (err) => {
            if (err) throw err;
            // console.log('The file has been saved!');
        });
        fs.writeFile(`./${carpet}/url.txt`, urlData, (err) => {
            if (err) throw err;
        });
        //mensaje de descarga
        console.log('downloading is done in folder ' + carpet)

    }

    fetchPage(URL, write)
}

downloadpage(process.argv[2]);

// console.log(process.argv)