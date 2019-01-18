import mongodb from 'mongodb'
import mongoKey from '../mongoKey'
import svc from '../svc.js'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;

const getscore = function (req, callback) {
    mongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            throw err;
        }
        console.log('database connected for getMapScore');

        let onedb = db.db(dbName),
            oneCollection = onedb.collection('mapScores'),
            colUsers = onedb.collection('userIds');

        oneCollection.find().toArray(function (err2, idList) {
            if (err2) {
                throw err2;
            }

            let list = idList.map(one => {
                return {
                    uid: one.uid,
                    score: one.score
                };
            });
            if (req.uid === 'all') {
                colUsers.find().toArray((err3, users) => {
                    if (err3) throw err3;
                    let tidyList = list.map(one => {
                        let rst = users.find(oneUser => {
                            return oneUser.uid === one.uid;
                        });
                        return {
                            name: rst.name,
                            uid: one.uid,
                            score: one.score
                        };
                    });

                    callback({
                        code: 1,
                        msg: 'all',
                        data: tidyList
                    });
                });
            } else {
                let index = list.findIndex(one => {
                    return one.uid === req.uid;
                });
                if (index === -1) {
                    callback({
                        code: 0,
                        msg: '用户不存在',
                        data: null
                    });
                } else {
                    callback({
                        code: 1,
                        msg: 'success.',
                        data: list[index]
                    });

                }
            }

            db.close();
            console.log('database closed for getMapScore');
        });


    });
};
const registerForFight = function (data, cb) {

    let contestants = data;

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

            let callbackarr = [];

            contestants.forEach(oneContestant => {
                let currentFight = allFight[allFight.length - 1];
                let list = currentFight.list;
                let log = currentFight.log;

                let flagHad = list.findIndex(one => { // 是否已报名
                    if (one.value === oneContestant.value) {
                        return true;
                    } else {
                        return false;
                    }
                });

                if (log.length > 0) {
                    callbackarr.push('已截止');
                } else if (flagHad !== -1) {
                    callbackarr.push('请不要重复签订');
                } else {
                    list.push(oneContestant);

                    oneCollection.update({
                        'time': currentFight.time
                    }, {
                        'memo': currentFight.memo,
                        'time': currentFight.time,
                        'list': list,
                        'log': log
                    })

                    callbackarr.push('契约签订成功');
                }
            });

            cb(callbackarr);

            db.close();
            console.log('database closed for registerForFight');

        });

    });
};

function addmembers() {
    getscore({
        uid: 'all'
    }, rst => {
        console.log(rst.data);
        let data = rst.data.map(d => {
            return {
                value: d.uid,
                label: d.name,
                score: d.score
            };
        });
        registerForFight(data, msg => {
            console.log(msg);
        });
    });

};

addmembers();