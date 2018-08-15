import express from 'express'
import socketIo from 'socket.io'

import bodyparser from 'body-parser'
import multer from 'multer'

import svc from './svc.js'

let app = express(),

    nodePort = 8010,

    storage = multer.diskStorage({
        destination: __dirname + '/files',
        filename(req, file, cb) {
            cb(null, 'uploadfile-' + Date.now() + '.png');
        }
    }),
    upload = multer({
        storage
    }),

    server = app.listen(nodePort, function () {
        console.log('service is on ' + nodePort + '.');
    }),

    io = socketIo(server);


/**********************************/

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

let realTimeNumber = 0;

io.on('connection', function (socket) {
    console.log('a user connected');
    realTimeNumber++;
    io.emit('realTimeCounter', realTimeNumber);

    socket.on('saySth', sth => {
        // 存到数据库

        // 发布到聊天区：
        io.emit('saidSth', sth);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
        realTimeNumber--;
        io.emit('realTimeCounter', realTimeNumber);
    });

});

app.get('/api/getRoleName', function (req, res) {
    svc.getRoleName((gotName) => {
        res.send(gotName);
    });
});
app.get('/api/getAllAvaName', function (req, res) {
    svc.getAllAvaName((gotName) => {
        res.send(gotName);
    });
});

app.post('/api/addNewName', (req, res) => {
    svc.addNewName(req.body.name, rstmsg => res.send(rstmsg));
});