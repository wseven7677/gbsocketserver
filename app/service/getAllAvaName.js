import mongodb from 'mongodb'
import mongoKey from '../mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;


const getAllAvaName = function(callback) {
    mongoClient.connect(dbUrl, function(err, db) {
        if (err) {
            throw err;
        }
        console.log('database connected for getAllAvaName');

        var onedb = db.db(dbName),
            oneCollection = onedb.collection('availableRoleNameList');

        oneCollection.find().toArray(function(err2, availableList) {
            if (err2) {
                throw err2;
            }

            // 只将名字返回--
            let list = availableList.map(one => {
                return one.name;
            });
            // 返回数据处:
            callback(list);

            db.close();
            console.log('database closed for getAllAvaName');
        });

    });
};

export default getAllAvaName;
