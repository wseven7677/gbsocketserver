import mongodb from 'mongodb'
import mongoKey from '../../mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;

const registerForFight = function (data, callback) {

    // checkRight--todo
    if (false) {
        callback('failed');
        return;
    }

    let oneContestant = data;

    // 连接数据库处理数据--
    mongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            throw err;
        }
        console.log('database connected for registerForFight');

        let onedb = db.db(dbName),
            oneCollection = onedb.collection('fightMatch'); 

        // 进行增删改查--
        oneCollection.find().toArray(function (err2, allFight) {
            if (err2) {
                throw err2;
            }

            let currentFight = allFight[allFight.length - 1];
            let list = currentFight.list;
            let log = currentFight.log;

            if (log.length > 0) {
                callback('报名已截止');
            } else {
                list.push(oneContestant);

                oneCollection.update({
                    'time': currentFight.time
                }, {
                    'list': list
                })

                callback('success');
            }

            db.close();
            console.log('database closed for getOneTurn');

        });

    });
};

export default registerForFight;