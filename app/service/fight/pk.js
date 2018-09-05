
/**
 * 结尾补充空选手
 */
function fillIn(list) {
    let nameList = list.slice(0);

    // 必须是2的幂次方--
    while (nameList.length & (nameList.length - 1) !== 0) { // bug
        nameList.push({
            value: -1,
            label: '空'
        });
    }

    return nameList;
}

/**
 * 重排过程中 在给定范围内随机选取一个数字
 */
function pickOne(len) {
    return Math.floor(Math.random() * len);
}

/**
 * 判定两人之间的胜负
 */
function judge(a, b) {
    // 当有 空选手 时--
    if (a.value === -1 && b.value !== -1) {
        return b;
    }
    if (b.value === -1 && a.value !== -1) {
        return a;
    }

    // 正常判断--
    if (Math.random() > 0.5) {
        return a;
    } else {
        return b;
    }
}

function fight(fightList) {
    let rst = [];

    // 按顺序两人之间决出一人放入rst数组中：
    for (let i = 0; i < fightList.length; i = i + 2) {
        rst.push(judge(fightList[i], fightList[i + 1]));
    }

    return rst;
}

const pk = function (data, callback) {

    let logList = []; // 各轮结果

    // 获得数量正确的选手列表--
    let contestants = fillIn(data);

    // 打乱随机重排获得名单--
    let nameList = [];
    while (contestants.length > 0) {
        let onePicked = contestants.splice(pickOne(contestants.length), 1); // bug
        nameList.push(onePicked);
    }
    
    // 分组pk--
    do {

        let oneTurn = [];
        oneTurn = fight(nameList);
        logList.push(oneTurn);

    } while (oneTurn.length > 1)

    callback(logList);

};

export default pk;