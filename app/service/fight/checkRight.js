import fs from 'fs'
import path from 'path'

// const filePath = path.join(__dirname, './test.log'); // 从该文件所在位置出发
const filePath = '/usr/cycodes/bili/fan.log'; // 绝对路径

function getFileData(cb) {
    fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
            console.log('error: ' + err.message);
            return;
        }

        let list = [];
        let tmpList = content.trim().split(';');
        tmpList.forEach(one => {
            let oneArray = one.trim().split(',');
            if(oneArray.length == 2) {
                list.push({
                    value: oneArray[0].trim(),
                    label: oneArray[1].trim()
                });

            }
        });
        cb(list);

    });
}

const checkRight = function (data, callback) {
    // 入口参数验证，以防被不对应的程序调用--
    if (typeof data.id !== 'string') {
        callback({
            data: '',
            msg: 'failed: 参数格式错误'
        });
        return;
    }

    getFileData(fansList => {
        let foundFan = fansList.find(one => {
            if (one.value === data.id) {
                return true;
            }
        });

        if (foundFan) {
            callback({
                data: foundFan.label,
                msg: '您通过了试金石的验证！'
            });
        } else {
            callback({
                data: '',
                msg: '没有通过验证'
            });
        }
    });

};

export default checkRight;