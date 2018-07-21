import express from 'express'
import socket from 'socket.io'
import http from 'http'

import bodyparser from 'body-parser'
import multer from 'multer'

var app = express(),
    httpser = http.Server(app),
    io = socket(httpser),

    nodePort = 8010,
    
    storage = multer.diskStorage({
        destination: '/usr/cycodes/greenbluechatserver/files',
        filename(req, file, cb) {
            cb(null, 'uploadfile-' + Date.now() + '.png');
        }
    }),
    upload = multer({
        storage
    });

app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());

/**********************************/

    app.get('/io', function(req, res) {

            res.sendFile(__dirname + '/index.html');
    });

// ---upload pictures---
app.post('/api/members2uploadpic/', upload.single('imgObj'), function(req, res) {
    // 取数据，发数据：
 /*   mongo('members', handleUploadPic(req), function(resd) {
        res.send(resd);
    });*/
});

// ----- user validate ------

app.post('/api/users', (req, res) => {
  /*  mongoUser('users', req.body, resd => {
        res.send(resd); // true
    });*/
});

io.on('connection', function(socket){
  console.log('a user connected');
});


// =============================
app.listen(nodePort, 'localhost', function() {
    console.log('service is on.');
});

