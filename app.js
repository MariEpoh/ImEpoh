const express = require('express');
const { Client, Server } = require ('node-osc');
const fs = require('fs');
const app = express();
const favicon = require('serve-favicon');
const port = 42069;
const path = require('path');

app.use(express.static('public'));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")))

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

var cat0 = false;
var cat1 = false;
var cat2 = false;

var oscServer = new Server(23301, 'localhost', () => {
    console.log("Started Listening");
})

var paramters = {};
var avatar = JSON.parse(fs.readFileSync("avatar.json"));
avatar["parameters"].forEach(element => {
    if(!('input' in element)){
        oscServer.on(element.output.address, (msg) => {
            paramters[msg[0]] = msg[1];
        })
    }
});

app.get('/epoh_data', (req, res) => {
    res.send(paramters);
})

app.get('/cat0_toggle', (req, res) => {
    const client = new Client('192.168.100.89', 9000);
    client.send("/avatar/parameters/cat0", cat0 , () => {
        cat0 = !cat0;
        client.close();
    })
    res.end();
})

app.get('/cat1_toggle', (req, res) => {
    const client = new Client('192.168.100.89', 9000);
    client.send("/avatar/parameters/cat1", cat1 , () => {
        cat1 = !cat1;
        client.close();
    })
    res.end();
})

app.get('/cat2_toggle', (req, res) => {
    const client = new Client('192.168.100.89', 9000);
    client.send("/avatar/parameters/cat2", cat2 , () => {
        cat2 = !cat2;
        client.close();
    })
    res.end();
})



app.listen(port, '0.0.0.0');