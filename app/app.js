import express from 'express'
import socketIo from 'socket.io'

import bodyparser from 'body-parser'
import multer from 'multer'

import svc from './svc.js'

let app = express(),
    // 服务开启端口--
    nodePort = 8010,
    // 文件存储服务，包含：存储路径、重命名--
    storage = multer.diskStorage({
        destination: __dirname + '/files',
        filename(req, file, cb) {
            cb(null, 'uploadfile-' + Date.now() + '.png');
        }
    }),
    upload = multer({
        storage
    }),
    // 开启监听--
    server = app.listen(nodePort, function () {
        console.log('service is on ' + nodePort + '.');
    }),
    // socket服务--
    io = socketIo(server);


/**********************************/
// bodyparser--用于保证post服务正常运行，会将post信息放在req.body中从而得到--

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

/**********************************/
// socket实时服务：


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

/**********************************/
// 普通服务：


app.get('/api/getRoleName', (req, res) => {
    svc.getRoleName((gotName) => {
        res.send(gotName);
    });
});

app.get('/api/getAllAvaName', (req, res) => {
    svc.getAllAvaName((gotName) => {
        res.send(gotName);
    });
});

app.post('/api/addNewName', (req, res) => {
    svc.addNewName(req.body.name, rstmsg => res.send(rstmsg));
});

/**********************************/
// fight：

app.post('/api/fight/registerForFight', (req, res) => {
    svc.registerForFight(req.body.name, rstmsg => res.send(rstmsg));
});

app.get('/api/fight/getAllFightName', (req, res) => {
    svc.getAllFightName(output => res.send(output));
});

app.post('/api/fight/checkRight', (req, res) => {
    svc.registerForFight(req.body.id, rstmsg => res.send(rstmsg));
});

