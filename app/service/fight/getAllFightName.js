import mongodb from 'mongodb'
import mongoKey from '../../mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;

const getAllFightName = function (callback) {

    mongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            throw err;
        }
        console.log('database connected for getAllFightName');

        let onedb = db.db(dbName),
            oneCollection = onedb.collection('fightMatch'); 

        oneCollection.find().toArray(function (err2, allFight) {
            if (err2) {
                throw err2;
            }

            let currentFight = allFight[allFight.length - 1];
            let list = currentFight.list;

            let outputList = list.map(one => {
                return one.label;
            });

            callback(outputList); // array

            db.close();
            console.log('database closed for getOneTurn');

        });

    });
};

export default getAllFightName;