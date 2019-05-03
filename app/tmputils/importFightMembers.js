import mongodb from 'mongodb'
import mongoKey from '../mongoKey'

import members from './member.json' // 批量导入的报名列表

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;

/**
 * 本程序用来批量报名武道大会 批量覆盖
 */

function importFightMembers() {
    mongoClient.connect(dbUrl, {
        useNewUrlParser: true
    }, (err, client) => {
        if (err) {
            throw err;
        }
        let db = client.db(dbName);
        let col = db.collection('fightMatch');

        col.find().toArray(function (err2, allFight) {
            if (err2) {
                throw err2;
            }

            let callbackarr = [];

            let currentFight = allFight[allFight.length - 1]; // 最后一个比赛
            // let list = currentFight.list;
            let log = currentFight.log;
            if (log.length > 0) {
                callbackarr.push('已截止');
            } else {
                col.updateOne({
                    'time': currentFight.time
                }, {
                    $set: {
                        'list': members,
                        'log': log
                    }
                });
            }

            console.log(callbackarr);
            client.close();

        });
    });
}

importFightMembers();