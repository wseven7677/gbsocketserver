import mongodb from 'mongodb'
import mongoKey from '../../mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;


const clearZero = function(callback) {
    mongoClient.connect(dbUrl, function(err, db) {
        if (err) {
            throw err;
        }
        console.log('database connected for clearZero');

        var onedb = db.db(dbName),
            oneCollection = onedb.collection('mapScores'),
            colUsers = onedb.collection('userIds');

        oneCollection.find().toArray(function(err2, list) {
            if (err2) {
                throw err2;
            }

            let zeroUserList = list.filter(one => {
                return one.score === 0;
            }).map(one => {
                return one.uid;
            });

            zeroUserList.forEach(oneUser => {
                colUsers.remove({
                    uid: oneUser
                });
            });

            callback({
                code: 1,
                data: zeroUserList,
                msg: '已删除得分为0的用户.'
            });

            db.close();
            console.log('database closed for clearZero');
        });

    });
};

export default clearZero;
