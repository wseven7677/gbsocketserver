import mongodb from 'mongodb'
import mongoKey from '../../mongoKey'

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

            oneCollection.find().toArray(function(err2, idList) {
                if (err2) {
                    throw err2;
                }
    
                let list = idList.map(one => {
                    return one.uid;
                });

                if(list.indexOf(req.uid) > -1) {
                    callback({
                        code: 0,
                        msg: '用户已存在'
                    });
                }else {
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
                }
    
                db.close();
                console.log('database closed for userLogin');
            });

    });
};

export default registerUser;