import getRoleName from './service/getRoleName.js'
import getAllAvaName from './service/getAllAvaName.js'
import addNewName from './service/addNewName.js'

import registerForFight from './service/fight/registerForFight.js'
import getAllFightName from './service/fight/getAllFightName.js'
import checkRight from './service/fight/checkRight.js'

const svc = {
    getRoleName,
    getAllAvaName,
    addNewName,

    // fight--
    registerForFight,
    getAllFightName,
    checkRight
};
export default svc;
