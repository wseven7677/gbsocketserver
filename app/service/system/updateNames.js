import mongodb from 'mongodb'
import mongoKey from '../../mongoKey'
import checkUID from '../user/checkUID'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;


const updateNames = function (uid, callback) {
    if (typeof uid !== 'string') {
        callback({
            code: 0,
            data: null,
            msg: 'uid is not string.'
        });
        return;
    }
    let rg = new RegExp('^\\d{3}$', 'ig');
    if (!rg.test(uid)) {
        callback({
            code: 0,
            data: null,
            msg: 'not numbers.'
        });
        return;
    }
    checkUID({
        uid
    }, rst => {
        if (rst.code === 1) {
            newName = rst.data;
            mongoClient.connect(dbUrl, function (err, db) {
                if (err) {
                    throw err;
                }
                console.log('database connected for updateNames');

                var onedb = db.db(dbName),
                    oneCollection = onedb.collection('userIds');

                oneCollection.update({
                    'uid': uid
                }, {
                    'name': rst.data
                });

            });
        } else {
            callback({
                code: 0,
                data: null,
                msg: rst.msg
            });
        }
    });
};

export default updateNames;