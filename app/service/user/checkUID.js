import cheerio from 'cheerio'
import http from 'http'

const checkUID = function(data, callback) {
    let url = 'https://space.bilibili.com/'+ data.uid;
    let name = '';

    http.get(url, res => {
        let html = '';
        res.on('data', data => {
            html += data;
        });
        res.on('end', () => {
            let $ = cheerio.load(html);
            name = $('title')[0].children[0].data.split('的')[0] || '';

            if(name === '出错啦! - bilibili.com') {
                callback({
                    code: 0,
                    data: null,
                    msg: 'uid未能查询到b站用户'
                });
            }else {
                callback({
                    code: 1,
                    data: name,
                    msg: 'ok.'
                });

            }
        });
    });
};

export default checkUID;
