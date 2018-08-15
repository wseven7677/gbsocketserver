import mongodb from 'mongodb'
import mongoKey from '../mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;


const addNewName = function(newName, callback) {
    mongoClient.connect(dbUrl, function(err, db) {
        if (err) {
            throw err;
        }
        console.log('database connected for addNewName');

        var onedb = db.db(dbName),
            oneCollection = onedb.collection('availableRoleNameList');

        oneCollection.find().toArray(function(err2, availableList) {
            if (err2) {
                throw err2;
            }

            // 所有可用name列表：
            let list = availableList.map(one => {
                return one.name;
            });

            if(list.indexOf(newName) === -1) {
                oneCollection.insert({
                    'name': newName
                });
                callback('success.');
            }else {
                callback('failed: already had the name');
            }

            db.close();
            console.log('database closed for addNewName');
        });


    });
};

export default addNewName;
