const checkRight = function (data, callback) {
    // 入口参数验证，以防被不对应的程序调用--
    if(typeof data.id !== 'string') {
        callback({
            data: '',
            msg: 'failed: 参数格式错误'
        });
        return;
    }

    let nickName = '';

    // check right--
    nickName = data.id + 'www';

    // --
    callback({
        data: nickName,
        msg: '您通过了试金石的验证！'
    });
};

export default checkRight;