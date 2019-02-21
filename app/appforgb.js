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
    server = app.listen(nodePort, 'localhost', function () {
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
        svc.addMessageSaid(sth);
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


// app.get('/api/getRoleName', (req, res) => {
//     svc.getRoleName((gotName) => {
//         res.send(gotName);
//     });
// });

// app.get('/api/getAllAvaName', (req, res) => {
//     svc.getAllAvaName((gotName) => {
//         res.send(gotName);
//     });
// });

// app.post('/api/addNewName', (req, res) => {
//     svc.addNewName(req.body.name, rstmsg => res.send(rstmsg));
// });

app.get('/api/getMessageSaid', (req, res) => {
    svc.getMessageSaid((saidMsg) => {
        res.send(saidMsg);
    });
});
/******************************** */
// system:
app.get('/api/sys/clearZero', (req, res) => {
    svc.clearZero(rst => res.send(rst));
});

app.post('/api/sys/updateNames', (req, res) => {
    svc.updateNames(req.body, rst => res.send(rst));
});

/******************************** */
// user:
app.post('/api/user/login', (req, res) => {
    svc.userLogin(req.body, rst => res.send(rst));
});
app.post('/api/user/registerUser', (req, res) => {
    svc.registerUser(req.body, rst => res.send(rst));
});
app.post('/api/user/checkUID', (req, res) => {
    svc.checkUID(req.body, rst => res.send(rst));
});

/******************************** */
// map:
app.post('/api/map/getMapScore', (req, res) => {
    svc.getMapScore(req.body, rst => res.send(rst));
});
app.post('/api/map/postMapScore', (req, res) => {
    svc.postMapScore(req.body, rst => res.send(rst));
});

/**********************************/
// fight：

app.post('/api/fight/registerForFight', (req, res) => {
    svc.registerForFight(req.body, rstmsg => res.send(rstmsg));
});

app.get('/api/fight/getCurrFightInfo', (req, res) => {
    svc.getCurrFightInfo(output => res.send(output));
});

app.post('/api/fight/checkRight', (req, res) => {
    svc.checkRight(req.body, rstmsg => res.send(rstmsg));
});

app.get('/api/fight/getOneTurn', (req, res) => {
    svc.getOneTurn(rst => res.send(rst));
});

app.post('/api/fight/startOneFight', (req, res) => {
    svc.startOneFight(req.body, rstmsg => res.send(rstmsg));
});

//----
app.get('/api/biaoqingbao/name', (req, res) => {
    svc.getBiaoqingNames(rst => res.send(rst));
});