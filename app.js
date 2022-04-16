const express = require('express');
const { Client, Server } = require ('node-osc');
const fs = require('fs');
const app = express();
const favicon = require('serve-favicon');
const port = 42069;
const path = require('path');
const { captureRejections } = require('events');

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

var pcat0res, pcat0rej, pcat1res, pcat1rej, pcat2res, pcat2rej;

oscServer.on("/avatar/parameters/cat0", (msg) => {
    cat0 = msg[1];
    pcat0res();
})

oscServer.on("/avatar/parameters/cat1", (msg) => {
    cat1 = msg[1];
    pcat1res();
})

oscServer.on("/avatar/parameters/cat2", (msg) => {
    cat2 = msg[1];
    pcat2res();
})

// const client = new Client('192.168.100.89', 9000);
// client.send("/avatar/parameters/cat0", true , () => {
//     client.send("/avatar/parameters/cat0", false , () => {
//         client.send("/avatar/parameters/cat1", true , () => {
//             client.send("/avatar/parameters/cat1", false , () => {
//                 client.send("/avatar/parameters/cat2", true , () => {
//                     client.send("/avatar/parameters/cat2", false , () => {
//                         client.close();
//                     })
//                 })
//             })
//         })
//     })
// })

function Cat0() {
    return {
    p: new Promise((res,rej) => {
        pcat0res = res;
        pcat0rej = rej;
    }),
    t : setTimeout(() => pcat0rej("p1"), 250)
    };
}

function Cat1() {
    return {
    p: new Promise((res,rej) => {
        pcat1res = res;
        pcat1rej = rej;
    }),
    t : setTimeout(() => pcat1rej("p1"), 250)
    };
}

function Cat2() {
    return {
    p: new Promise((res,rej) => {
        pcat2res = res;
        pcat2rej = rej;
    }),
    t : setTimeout(() => pcat2rej("p1"), 250)
    };
}

function Timeout(promiseReject){
    return setTimeout(() => promiseReject("p1"), 250);
}

app.get('/epoh_data', (req, res) => {
    res.send(paramters);
})

app.get('/cat_state', (req, res) => {
    res.send({cat0 : cat0, cat1 : cat1, cat2 : cat2});
})

app.get('/cat0_toggle', (req, res) => {
    const client = new Client('192.168.100.89', 9000);
    client.send("/avatar/parameters/cat0", !cat0 , async  () => {
        let cat = Cat0();
        cat.p.then( () => { 
            clearTimeout(cat.t);
            client.close();
        }).catch(() => {
            cat0 = !cat0;
            client.send("/avatar/parameters/cat0", !cat0 ,  () => {
                client.close();
            })
        })
    })
    res.send(cat0);
})

app.get('/cat1_toggle', (req, res) => {
    const client = new Client('192.168.100.89', 9000);
    client.send("/avatar/parameters/cat1", !cat1 , async  () => {
        let cat = Cat1();
        cat.p.then( () => { 
            clearTimeout(cat.t);
            client.close();
        }).catch(() => {
            cat1 = !cat1;
            client.send("/avatar/parameters/cat1", !cat1 ,  () => {
                client.close();
            })
        })
    })
    res.send(cat1);
})

app.get('/cat2_toggle', (req, res) => {
    const client = new Client('192.168.100.89', 9000);
    client.send("/avatar/parameters/cat2", !cat2 , async  () => {
        let cat = Cat2();
        cat.p.then( () => { 
            clearTimeout(cat.t);
            client.close();
        }).catch(() => {
            cat2 = !cat2;
            client.send("/avatar/parameters/cat2", !cat2 ,  () => {
                client.close();
            })
        })
    })
    res.send(cat2);
})



app.listen(port, '0.0.0.0');