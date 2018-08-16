import mongodb from 'mongodb'
import mongoKey from './mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;

const mongoName = function (data, callback) {

    // something--

    // 连接数据库处理数据--
    mongoClient.connect(dbUrl, function (err, db) {
      if(err) {
        throw err;
      }
      console.log('database connected for xxx');

      let onedb = db.db(dbName),
          oneCollection = onedb.collection('collection name'); // 此处直接写collection的名字，原则上不要传参，将各个服务分隔清楚

      // 进行增删改查--

      callback('success');
      // 特别注意close的时机--
      db.close();
      console.log('database closed for xxx');
    });
};

export default mongoName;
