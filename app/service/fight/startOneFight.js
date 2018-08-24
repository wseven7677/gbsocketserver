import mongodb from 'mongodb'
import mongoKey from '../../mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;

const startOneFight = function (data, callback) {

    let memo = data.memo;

    mongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            throw err;
        }
        console.log('database connected for startOneFight');

        let onedb = db.db(dbName),
            oneCollection = onedb.collection('fightMatch');

        oneCollection.insert({
            'memo': memo,
            'time': new Date().getTime(),
            'list': [],
            'log': []
        });

        callback('success');

        db.close();
        console.log('database closed for startOneFight');
    });
};

export default startOneFight;