const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {

    ws.interval = null;

    ws.on('message', function incoming(oTime) {
        let time = Number(oTime);
        if (isNaN(time)){
            return;
        }
        clearInterval(this.interval);
        this.interval = setInterval(() =>{
            ws.send("ping");
        }, Math.max(time, 1000));
    });

    ws.send("ping");

    ws.on('close', function close() {
        try {
            clearInterval(ws.interval);
        } catch (err){
            console.log(err);
        }
    });
});



