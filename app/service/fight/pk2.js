/**
 * 结尾补充空选手
 */
function fillIn(list) {
    let nameList = list.slice(0);

    // 必须是2的幂次方--
    while ((nameList.length & (nameList.length - 1)) !== 0) {
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

    // 判断--
    let all = a.score + b.score;
    let awin = Math.round(a.score / all);
    // 防止过强
    awin = awin > 0.7 ? 0.7 : awin;
    awin = awin < 0.3 ? 0.3 : awin;

    let rm = Math.random();
    if (rm < awin) {
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

const pk2 = function (data, mode) {

    let inputList = data;

    // 建立初始名单--
    if (mode === 'init') {
        // 获得数量正确的选手列表--
        let contestants = fillIn(data);

        // 打乱随机重排获得名单--
        inputList = [];
        while (contestants.length > 0) {
            let onePicked = contestants.splice(pickOne(contestants.length), 1)[0];
            inputList.push(onePicked);
        }

        return inputList;
    }

    // 当终局时--
    if(inputList.length === 1) {
        return inputList;
    }

    // 普通的一轮pk--
    return fight(inputList);

};

export default pk2;