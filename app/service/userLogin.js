import mongodb from 'mongodb'
import mongoKey from '../mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;


const userLogin = function(logUser, callback) {
    mongoClient.connect(dbUrl, function(err, db) {
        if (err) {
            throw err;
        }
        console.log('database connected for userLogin');

        var onedb = db.db(dbName),
            oneCollection = onedb.collection('userIds');

        oneCollection.find().toArray(function(err2, idList) {
            if (err2) {
                throw err2;
            }

            let list = idList.map(one => {
                return {
                    uid: one.uid,
                    pw: one.pw,
                    name: one.name
                };
            });

            let index = list.findIndex(one => {
                return one.uid === logUser.uid;
            });
            if(index === -1) {
                callback({
                    code: 0,
                    msg: '用户不存在',
                    data: null
                });
            }else {
                if(list[index].pw === logUser.pw) {
                    callback({
                        code: 1,
                        msg: 'success.',
                        data: list[index]
                    });
                }else {
                    callback({
                        code: 0,
                        msg: '密码错误',
                        data: null
                    });
                }
            }

            db.close();
            console.log('database closed for userLogin');
        });


    });
};

export default userLogin;
