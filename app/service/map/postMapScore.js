import mongodb from 'mongodb'
import mongoKey from '../mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;


const postMapScore = function (req, callback) {
    mongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            throw err;
        }
        console.log('database connected for postMapScore');

        var onedb = db.db(dbName),
            oneCollection = onedb.collection('mapScores');

        oneCollection.update({
            'uid': req.uid
        }, {
            $set: {
                'score': req.score
            }
        });

        callback({
            code: 1,
            msg: 'done.',
            data: null
        });

        db.close();
        console.log('database closed for postMapScore');


    });
};

export default postMapScore;