"use strict";
// data structure of ajax request
window.requestdata = {
    grant_type: "client_credential",
    appid: "",
    secret: ""
};
window.XC1_APPID = "some-appid";
window.XC1_SECRET = "get-secret-from-wechat-mp-admin";

window.XC2_APPID = "some-appid";
window.XC2_SECRET = "get-secret-from-wechat-mp-admin";

// initialize for XC1
window.requestdata.appid = XC1_APPID;
window.requestdata.secret = XC1_SECRET;
getToken(window.requestdata, 'xc1');

// initialize for XC2
window.requestdata.appid = XC2_APPID;
window.requestdata.secret = XC2_SECRET;
getToken(window.requestdata, 'xc2');


function getToken(requestdata, reqId) { // getToken will call getCount
    "use strict";
    // requestdata is the global requestdata
    // reqId is popup.html's element ID
    var token;
    $.ajax({
        url: "https://api.weixin.qq.com/cgi-bin/token",
        type: 'GET',
        data: requestdata,
        success: function (response) {
            token = response.access_token;
            $('#' + reqId + '-progressbar').css('width', '50%');
            getCount(token, reqId); // Process to get count
        }
    });
}

function getCount(key, reqId) {
    "use strict";
    var TotalNumber;
    $.ajax({
        // https://api.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN&next_openid=NEXT_OPENID
        url: "https://api.weixin.qq.com/cgi-bin/user/get",
        type: 'GET',
        data: {
            access_token: key
        },
        success: function (response) {
            TotalNumber = response.total;
            window.document.getElementById(reqId).innerText = TotalNumber;
        }
    });
}

function randombar(reqId) {
    "use strict";
    if (Number.parseInt(Math.random() * 2)) {
        var bar = $('#' + reqId + '-progressbar').css('width');
        $('#' + reqId + '-progressbar').css('width', Number.parseInt(bar) + 12 + 'px'); // TODO: progressbar would be filled up
    }
}

window.setInterval(function () {
    "use strict";
    randombar('xc1')
}, 300);
window.setInterval(function () {
    "use strict";
    randombar('xc2')
}, 300);

// Sum up
var SumLoop = window.setInterval(function () {
    "use strict";
    var n1 = Number.parseInt($('#xc1').text());
    var n2 = Number.parseInt($('#xc2').text());

    if (n1 && n2) {
        var sum = n1 + n2;
        var SumHtml = '<br/><span>人数总计：';
        var SumHtmlTail = '</span>';
        $('#xc-count').append(SumHtml + sum + SumHtmlTail);
        window.clearInterval(SumLoop)
    }
}, 100);

