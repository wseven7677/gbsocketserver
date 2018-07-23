import mongodb from 'mongodb'
import mongoKey from './mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;


const getAllAvaName = function(callback) {
    mongoClient.connect(dbUrl, function(err, db) {
        if (err) {
            throw err;
        }
        console.log('database connected.');

        var onedb = db.db(dbName),
            oneCollection = onedb.collection('availableRoleNameList');

        oneCollection.find().toArray(function(err2, availableList) {
            if (err2) {
                throw err2;
            }

            // 返回数据处:
            callback(availableList);

        });

        db.close();
        console.log('database closed.');

    });
};

export default getAllAvaName;
