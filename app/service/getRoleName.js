import mongodb from 'mongodb'
import mongoKey from '../mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;


const getRoleName = function(callback) {
    if(Math.random() < 0.5) {
        callback('一个没有颜色的人（' + Math.round(Math.random()*10000) + '号）');
        return;
    }
    mongoClient.connect(dbUrl, function(err, db) {
        if (err) {
            throw err;
        }
        console.log('database connected for getRoleName');

        var onedb = db.db(dbName),
            oneCollection = onedb.collection('availableRoleNameList'),
            gotName;
        // 随机取名字：
        oneCollection.find().toArray(function(err2, availableList) {
            if (err2) {
                throw err2;
            }

            var len = availableList.length;
            if(len === 0) {
                callback('failed');
            }else {
                var num = Math.round(Math.random() * (len - 1));
    
                gotName = availableList[num].name;
                // 返回数据处:
                callback(gotName);
    
                // 将该名字从该集合去除
                oneCollection.remove({
                    'name': gotName
                });
            }
    
            db.close();
            console.log('database closed for getRoleName');
        });

    });
};

export default getRoleName;
