import express from 'express'

import bodyparser from 'body-parser'
import multer from 'multer'

var app = express(),
    nodePort = 8010,
    rs = ['history', 'pictures', 'members','news'], // 需手动添加数据库中的collcetions，后续改自动识别。
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

// === GET & cardCollection post ===

    // ---get:---
    app.get('/api/' + value, function(req, res) {

        // 后端验证：

        // 取数据，发数据：
        mongo(value, req.query, function(resd) {
            res.send(resd);
        });
    });

// ---upload pictures---

app.post('/api/members2uploadpic/', upload.single('imgObj'), function(req, res) {
    // 取数据，发数据：
    mongo('members', handleUploadPic(req), function(resd) {
        res.send(resd);
    });
});

// ----- user validate ------

app.post('/api/users', (req, res) => {
    // 取数据，发数据：
    mongoUser('users', req.body, resd => {
        res.send(resd); // true
    });
});




// =============================
app.listen(nodePort, 'localhost', function() {
    console.log('service is on.');
});
