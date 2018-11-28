import mongodb from 'mongodb'
import mongoKey from '../mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;


const addMessageSaid = function(sth) {

    // 与数据库交互--
    mongoClient.connect(dbUrl, function(err, db) {
        if (err) {
            throw err;
        }
        console.log('database connected for addMessageSaid');

        let onedb = db.db(dbName),
            oneCollection = onedb.collection('saidMessage');

        oneCollection.insert(sth);

        db.close();
        console.log('database closed for addMessageSaid');
    });
};

export default addMessageSaid;
