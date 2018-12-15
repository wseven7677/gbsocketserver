import getRoleName from './service/getRoleName.js'
import getAllAvaName from './service/getAllAvaName.js'
import addNewName from './service/addNewName.js'

import getMessageSaid from './service/getMessageSaid.js'
import addMessageSaid from './service/addMessageSaid.js'

import userLogin from './service/user/userLogin.js'
import registerUser from './service/user/registerUser.js'
import checkUID from './service/user/checkUID.js'

import getMapScore from './service/map/getMapScore.js'
import postMapScore from './service/map/postMapScore.js'

import registerForFight from './service/fight/registerForFight.js'
import getCurrFightInfo from './service/fight/getCurrFightInfo.js'
import checkRight from './service/fight/checkRight.js'
import getOneTurn from './service/fight/getOneTurn.js'
import startOneFight from './service/fight/startOneFight.js'

const svc = {
    getRoleName,
    getAllAvaName,
    addNewName,

    getMessageSaid,
    addMessageSaid,

    userLogin,
    registerUser,
    checkUID,

    getMapScore,
    postMapScore,

    // fight--
    registerForFight,
    getCurrFightInfo,
    checkRight,
    getOneTurn,
    startOneFight
};
export default svc;
