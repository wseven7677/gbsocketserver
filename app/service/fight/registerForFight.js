import mongodb from 'mongodb'
import mongoKey from '../../mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;

const registerForFight = function (data, callback) {

    // checkRight--todo(此处验证则为二次验证)
    if (false) {
        callback('failed');
        return;
    }

    let oneContestant = data.name;
    // 参数格式验证--
    if (!oneContestant.value || !oneContestant.label) {
        callback('failed: 参数格式错误');
        return;
    }


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

            let flagHad = list.findIndex(one => { // 是否已报名
                if(one.value === oneContestant.value) {
                    return true;
                }else{
                    return false;
                }
            });

            if (log.length > 0) {
                callback('已截止');
            } else if(flagHad !== -1){
                callback('请不要重复签订');
            }else {
                list.push(oneContestant);

                oneCollection.update({
                    'time': currentFight.time
                }, {
                    'memo': currentFight.memo,
                    'time': currentFight.time,
                    'list': list,
                    'log': log
                })

                callback('契约签订成功');
            }

            db.close();
            console.log('database closed for registerForFight');

        });

    });
};

export default registerForFight;