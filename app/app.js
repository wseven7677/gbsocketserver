import express from 'express'
import socket from 'socket.io'
import http from 'http'

import bodyparser from 'body-parser'
import multer from 'multer'

import svc from './svc.js'

var app = express(),
    httpser = http.Server(app),
    io = socket(httpser),

    nodePort = 8010,

    storage = multer.diskStorage({
        destination: __dirname + '/files',
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

// app.post('/api/members2uploadpic/', upload.single('imgObj'), function(req, res) {
//     /*   mongo('members', handleUploadPic(req), function(resd) {
//            res.send(resd);
//        });*/
// });

// app.post('/api/users', (req, res) => {
//
// });

app.get('/io', function(req, res) {
    res.send('hello!!!');
});

app.get('/api/getRoleName', function(req, res) {
    svc.getRoleName((gotName) => {
        res.send(gotName);
    })
});
app.get('/api/getAllAvaName', function(req, res) {
    svc.getAllAvaName((gotName) => {
        res.send(gotName);
    })
});


io.on('connection', function(socket) {
    console.log('a user connected');
});



/**********************************/

app.listen(nodePort, 'localhost', function() {
    console.log('service is on ' + nodePort + '.');
});
