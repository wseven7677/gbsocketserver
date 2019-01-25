import fs from 'fs'
// import path from 'path'

// const filePath = path.join(__dirname, './test.log'); // 从该文件所在位置出发
const filePath = '/var/www/greenblue.tk/biaoqingbao/names.log'; // 绝对路径

function getNames(cb) {
    fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
            console.log('error: ' + err.message);
            return;
        }

        let list = content.trim().split(' ').filter(one => {
            return one.split('.')[1] === 'jpg';
        });
        cb(list);

    });
}

const getBiaoqingNames = function (callback) {
    getNames(list => callback(list));
};

export default getBiaoqingNames;