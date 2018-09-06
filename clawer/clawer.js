console.log('hello phantomjs');

var page = require('webpage').create();
var fs = require('fs');

const filePath = '/usr/cycodes/bili/fan.log'; // log文件保存位置

// 模拟登录--
//。。。emmmm。。。

/**
 * function：爬取粉丝mid以及昵称，保存在本地log文件中
 * note：
 * 必须以这个人的身份登录，否则只能爬取前五页（并且造成死循环）
 */
page.open('https://space.bilibili.com/5050583/#/fans/fans', function (status) {
    console.log('status:' + status);
    if (status === 'success') {
        
        // 2s后再开始爬取--
        window.setTimeout(function () {

            var allList = []; // output
            var flag = 0;
            var flagAll = 0; // 显示进度
            
            window.setInterval(function () {
                flagAll += flag;
                console.log(flagAll);
                
                if (flag === 2) { // 最后一页时退出
                    fs.write(filePath, '', 'w');
                    // 写入文件--
                    var i = 0;
                    for (i = 0; i < allList.length; ++i) {
                        var id = allList[i].value.split('/')[3];
                        var content = id + ',' + allList[i].label + ';\n';
                        fs.write(filePath, content, 'a');
                    }

                    // 打印记录日志--
                    console.log('更新完毕。时间：'+new Date().toString());
                    console.log('数量：'+ allList.length);
                    console.log('=======')
        
                    // 退出--
                    phantom.exit();
                }
                if(flagAll > 1000) { // 死循环退出保证
                    phantom.exit();
                }

                // 爬取--
                var rst = page.evaluate(function () {
                    var follows = document.getElementsByClassName('follow-content')[0],
                        list = follows.getElementsByClassName('relation-list')[0],
                        names = list.getElementsByClassName('title'),
                        result = [],
                        j = 0;

                    for (j = 0; j < names.length; ++j) {
                        result.push({
                            value: names[j].href,
                            label: names[j].innerText
                        });
                    }

                    return result;

                });
                // page.render('page'+flagAll+'.png'); // 检查错误用
                
                // 记录--
                allList = allList.concat(rst);

                // 翻页--
                flag = page.evaluate(function () {
                    var btn = document.getElementsByClassName('be-pager-next')[0];
                    var clickEvent = document.createEvent("HTMLEvents");
                    clickEvent.initEvent("click", false, true);
                    btn.dispatchEvent(clickEvent);

                    return btn.classList.length;

                });

            }, 2000); // 每页爬取时间间隔

        }, 2000);
    }
});