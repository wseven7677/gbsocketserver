const checkRight = function (data, callback) {

    let nickName = '';

    // check right--
    nickName = data + 'www';

    // --
    callback({
        nickName,
        msg: 'ok'
    });
};

export default checkRight;