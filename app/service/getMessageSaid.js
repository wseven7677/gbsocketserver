import mongodb from 'mongodb'
import mongoKey from '../mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;


const getMessageSaid = function(callback) {

    // 与数据库交互--
    mongoClient.connect(dbUrl, function(err, db) {
        if (err) {
            throw err;
        }
        console.log('database connected for getMessageSaid');

        let onedb = db.db(dbName),
            oneCollection = onedb.collection('saidMessage');

        oneCollection.find().toArray(function(err2, saidMsg) {
            if (err2) {
                throw err2;
            }
            let tmp = [];
            if(saidMsg.length > 5) {
                tmp = saidMsg.slice(saidMsg.length-5);
            }else {
                tmp = saidMsg;
            }
            let rst = tmp.map(one => {
                return {
                    name: one.name,
                    content: one.content,
                    time: one.time
                };
            });
            callback(rst);
            db.close();
            console.log('database closed for getMessageSaid');
        });

    });
};

export default getMessageSaid;
