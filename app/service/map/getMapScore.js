import mongodb from 'mongodb'
import mongoKey from '../../mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;


const getMapScore = function(req, callback) {
    mongoClient.connect(dbUrl, function(err, db) {
        if (err) {
            throw err;
        }
        console.log('database connected for getMapScore');

        var onedb = db.db(dbName),
            oneCollection = onedb.collection('mapScores');

        oneCollection.find().toArray(function(err2, idList) {
            if (err2) {
                throw err2;
            }

            let list = idList.map(one => {
                return {
                    uid: one.uid,
                    score: one.score
                };
            });
            if(req.uid === 'all') {
                callback({
                    code: 1,
                    msg: 'all',
                    data: list
                });
            }else {
                let index = list.findIndex(one => {
                    return one.uid === req.uid;
                });
                if(index === -1) {
                    callback({
                        code: 0,
                        msg: '用户不存在',
                        data: null
                    });
                }else {
                    callback({
                        code: 1,
                        msg: 'success.',
                        data: list[index]
                    });
               
                }
            }

            db.close();
            console.log('database closed for getMapScore');
        });


    });
};

export default getMapScore;
