import mongodb from 'mongodb'
import mongoKey from '../../mongoKey'
import checkUID from '../user/checkUID'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;


const updateNames = function (data, callback) {
    let uid = data.uid;
    if (typeof uid !== 'string') {
        callback({
            code: 0,
            data: null,
            msg: 'uid is not string.'
        });
        return;
    }
    // let rg = new RegExp('^\\d{3}$', 'ig');
    // if (!rg.test(uid)) {
    //     callback({
    //         code: 0,
    //         data: null,
    //         msg: 'not numbers.'
    //     });
    //     return;
    // }
    checkUID({
        uid
    }, rst => {
        if (rst.code === 1) {
            mongoClient.connect(dbUrl, function (err, db) {
                if (err) {
                    throw err;
                }
                console.log('database connected for updateNames');

                var onedb = db.db(dbName),
                    oneCollection = onedb.collection('userIds');

                oneCollection.updateOne({
                    'uid': uid
                }, {
                    $set: {
                        'name': rst.data
                    }
                });
                callback({
                    code: 1,
                    data: rst.data,
                    msg: 'ok.'
                });
    
                db.close();
                console.log('database closed for updateNames');

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

// updateNames('27885754', outstring => {
//     console.log(outstring);
// });