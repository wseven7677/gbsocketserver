import mongodb from 'mongodb'
import mongoKey from '../mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;


const registerUser = function (req, callback) {
    mongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            throw err;
        }
        console.log('database connected for registerUser');

        var onedb = db.db(dbName),
            oneCollection = onedb.collection('userIds'),
            colMapScores = onedb.collection('mapScores');

        oneCollection.insert({
            uid: req.uid,
            pw: req.pw,
            name: req.name
        });
        colMapScores.insert({
            uid: req.uid,
            score: 0
        });

        callback({
            code: 1,
            msg: 'done.'
        });

        db.close();
        console.log('database closed for registerUser');


    });
};

export default registerUser;