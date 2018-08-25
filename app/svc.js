import getRoleName from './service/getRoleName.js'
import getAllAvaName from './service/getAllAvaName.js'
import addNewName from './service/addNewName.js'

import registerForFight from './service/fight/registerForFight.js'
import getCurrFightInfo from './service/fight/getCurrFightInfo.js'
import checkRight from './service/fight/checkRight.js'
import getOneTurn from './service/fight/getOneTurn.js'
import startOneFight from './service/fight/startOneFight.js'

const svc = {
    getRoleName,
    getAllAvaName,
    addNewName,

    // fight--
    registerForFight,
    getCurrFightInfo,
    checkRight,
    getOneTurn,
    startOneFight
};
export default svc;
