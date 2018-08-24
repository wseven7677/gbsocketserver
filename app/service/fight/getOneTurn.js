import mongodb from 'mongodb'
import mongoKey from '../../mongoKey'
import pk from './pk2'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;

const getOneTurn = function (callback) {

    // 连接数据库处理数据--
    mongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            throw err;
        }
        console.log('database connected for getOneTurn');

        let onedb = db.db(dbName),
            oneCollection = onedb.collection('fightMatch'); 

        // 进行增删改查--
        oneCollection.find().toArray(function (err2, allFight) {
            if (err2) {
                throw err2;
            }

            let currentFight = allFight[allFight.length - 1];
            let oneTurn = [];
            let log = currentFight.log;
            let initList = currentFight.list;

            if (log.length === 0) {
                oneTurn = pk(initList, 'init');
            } else {
                oneTurn = pk(log[log.length - 1]);
            }
            log.push(oneTurn);
            oneCollection.update({
                'time': currentFight.time
            }, {
                'log': log
            })

            callback(log);
            db.close();
            console.log('database closed for getOneTurn');

        });
    });
};

export default getOneTurn;