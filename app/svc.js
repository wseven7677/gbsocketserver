import mongodb from 'mongodb'
import mongoKey from './mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;

const getRoleName = function(callback) {
    mongoClient.connect(dbUrl, function(err, db) {
        if (err) {
            throw err;
        }
        console.log('database connected.');

        var onedb = db.db(dbName),
            oneCollection = onedb.collection('availableRoleNameList'),
            gotName;
        // 随机取名字：
        oneCollection.find().toArray(function(err2, availableList) {
            if (err2) {
                throw err2;
            }

            var len = availableList.length,
                num = Math.round(Math.random() * (len - 1));

            gotName = availableList[num];

        });
        // 将该名字从该集合去除
        oneCollection.remove({
            name: gotName
        }, {
            justOne: true
        });
        // 返回数据处:
        callback(gotName);

        db.close();
        console.log('database closed.');

    });
};

const svc = {
    getRoleName
};
export default svc;
