import mongodb from 'mongodb'
import mongoKey from '../mongoKey'

import members from './member.json' // 批量导入的报名列表

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;

    /**
     * 本程序用来批量报名武道大会
     */

function importFightMembers() {
    mongoClient.connect(dbUrl,{ useNewUrlParser: true }, (err, client) => {
        if(err) {
            throw err;
        }
        let db = client.db(dbName);
        let col = db.collection('fightMatch');

        col.find().toArray(function (err2, allFight) {
            if (err2) {
                throw err2;
            }

            let callbackarr = [];

            members.forEach(oneContestant => {
                let currentFight = allFight[allFight.length - 1]; // 最后一个比赛
                let list = currentFight.list;
                let log = currentFight.log;

                let flagHad = list.findIndex(one => { // 是否已报名
                    return one.value === oneContestant.value;
                });

                if (log.length > 0) {
                    callbackarr.push('已截止');
                }else if (flagHad === -1) { // 未报名
                    list.push(oneContestant);
                    col.updateOne({
                        'time': currentFight.time
                    }, {
                        $set: {
                            'list': list,
                            'log': log
                        }
                    })

                    callbackarr.push('成功');
                }

            });

            console.log(callbackarr);
            client.close();

        });
    });
}

importFightMembers();