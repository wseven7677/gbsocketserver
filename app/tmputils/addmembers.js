import mongodb from 'mongodb'
import mongoKey from '../mongoKey'
import svc from '../svc.js'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;


function addmembers() {
    svc.getMapScore({
        uid: 'all'
    }, rst => {
        console.log(rst.data);
    });
    // data.forEach(oneData => {
    //     svc.registerForFight(ondData, () => {});
    // });
    
};

addmembers();