import mongodb from 'mongodb'
import mongoKey from '../mongoKey'
import checkUID from '../service/user/checkUID'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;


const updateUsers = function (req, callback) {
    mongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            throw err;
        }
        console.log('database connected for updateUsers');

        var onedb = db.db(dbName),
            oneCollection = onedb.collection('userIds');

            oneCollection.find().toArray(function(err2, idList) {
                if (err2) {
                    throw err2;
                }
    
                idList.forEach(one => {
                    checkUID({uid: one.uid}, res => {
                        if(res.code === 1) {
                            oneCollection.update({
                                'uid': one.uid
                            }, {
                                $set: {
                                    'name': res.data
                                }
                            });
                        }
                    });
                });
    
                db.close();
                console.log('database closed for updateUsers');
            });

    });
};

updateUsers();