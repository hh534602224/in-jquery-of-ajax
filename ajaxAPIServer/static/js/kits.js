// 自己的库

; (function () {

    // 构造函数Kits（K开头大写）
    function Gkits() { };
    // 调用实例对象
    let kits = new Gkits()
    // kits的功能写在构造构造函数的原型


    // 1.获取随机的整数
    Gkits.prototype.randomint = function (a, b) {
        let int = Math.floor(Math.random() * (b - a + 1) + a)
        return int;
    }
    /* 2.调用获取本地数据库  keyname 是你要调用的数据库得到库名（存数据用的键）返回一个数组给你*/
    Gkits.prototype.loaddate = function (keyname) {
        let str = localStorage.getItem(keyname);
        arr = JSON.parse(str)
        if (!arr) {
            arr = [];
        }
        return arr;
    }
    /* 3.把一个数组或者对象装进本地数据库   keyname 是你要存储数据的（库名）键  arr是你将要存进去数据的数组 */
    Gkits.prototype.savedata = function (keyname, arr) {
        let json = JSON.stringify(arr);
        localStorage.setItem(keyname, json);
    }
// 4.实时时间
Gkits.prototype.shijian = function () {
    let time = 0;
    let a = new Date;
    let nian = a.getFullYear();
    let yue = a.getMonth();
    let ri = a.getDate();
    let shi = a.getHours();
    let fen = a.getMinutes();
    let miao = a.getSeconds();
    yue = yue < 10 ? '0' + yue : yue;
    ri = ri < 10 ? '0' + ri : ri;
    shi = shi < 10 ? '0' + shi : shi;
    fen = fen < 10 ? '0' + fen : fen;
    miao = miao < 10 ? '0' + miao : miao;
    time = nian + '-' + yue + '-' + ri + '-' + shi + ':' + fen + ':' + miao;
    return time;
}

// 5.利用随机正整数生成随机id,即生成独一无二的ID属性，最大几率的避免重复id
Gkits.prototype.timeid = function () {
    // 我们通过时间戳 + 大范围的随机数来生成id
    let nowtime = Date.now();//得到是从1970年到现在为止的总的毫秒数
    // 为了防止在1毫秒之内生成的id有多个，再次加上一个大范围的随机数
    let r = kits.randomint(100000, 999999);
    // 把两个得到的结果，拼接起来
    return nowtime + '' + r;
}

Gkits.prototype.geturldata=function(){
 // 获取url地址栏的附带属性（？后面的）
let data=location.search.substring(1);
// console.log(data)
data=data.split('&');
// console.log(data)
let sum={};
data.forEach(e => {
  let hh= e.split('=');
  let key=hh[0]
  let ss=hh[1]
  sum[key]=ss;
   // console.log(sum)
});
return sum;
}

// 6.ajax的数据交互封装
Gkits.prototype.ajax=function(options){
    // 设置当不传参时的默认值
    options=options||{};
    options.type=options.type||'get';
    options.url=options.url||'';
    options.data=options.data||''
    options.callback=options.callback||function(res){
        console.log('你忘了传回调函数了，大神请随意');
        console.log(res);
    }
    // 调用AJAX
    let xhr= new XMLHttpRequest();
    // get 传输方法修改url
    if(options.type=='get'){
        options.url+='?'+options.data
    }
    // 设置发送的请求数据
    xhr.open(options.type,options.url);
    // 当post传输方法时
    if (options.type=='post'){
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        xhr.send(options.data);
        // 否则
    }else{
        xhr.send();
    }
    xhr.onreadystatechange=function(){
        if (xhr.status===200&&xhr.readyState===4){
           options.callback(JSON.parse(xhr.responseText))
        //    options.callback(xhr.responseText)
        }
    }
  }
  


  
// 用法
// 测试
// ajax(
//   {
//       type:'get',
//       url:'http://127.0.0.1:8080/isUserNameExist',
//       data:'userName=lfghfgn',
//       callback:function(hh){
//           document.write(hh.msg)
//           console.log(hh)
//       }
//   }
// )





    // 输出结果的话用实例对象的kits来调用
    // console.log(Gkits)
    // console.log(kits.randomint(1, 5));

    /* 有时做类似于树状结构的数据页面编写需要把数据线初步处理
    不然不方便动态生成结构,下面使用递归的方法进行封装进行数据的处理
    当然，如果服务器端给的数据已经是树状结构最好了，但是也要预备给的数据
    就是那么操蛋 
    */
    /* 
    给的数据举例：
    let navData = [
        { id: 1, text: '一级菜单A', parentId: null },
        { id: 2, text: '一级菜单B', parentId: null },
        { id: 3, text: '一级菜单C', parentId: null },
        { id: 4, text: '二级菜单AA', parentId: 1 },
        { id: 5, text: '二级菜单AB', parentId: 1 },
        { id: 6, text: '二级菜单AC', parentId: 1 },
        { id: 7, text: '二级菜单BA', parentId: 2 },
        { id: 8, text: '二级菜单BB', parentId: 2 },
        { id: 9, text: '二级菜单BC', parentId: 2 },
        { id: 10, text: '二级菜单CA', parentId: 3 },
        { id: 11, text: '二级菜单CB', parentId: 3 },
        { id: 12, text: '二级菜单CC', parentId: 3 },
        { id: 13, text: '三级菜单AAA', parentId: 4 },
        { id: 14, text: '三级菜单BAA', parentId: 7 },
        { id: 15, text: '三级菜单CAA', parentId: 10 }
      ]; */
    //   调用方法
    // kits.treedate(navData,null)
    Gkits.prototype.treedate = function (arr, fjid) {
        //   定义一个空数组存贮修改后的数据
        let temp = [];
        // 遍历给的服务器的数据
        arr.forEach(e => {
            // 利用parentId条件筛选树状的第一级数据
            if (e.parentId == fjid) {
                // 满足条件的第一级元素就放进去
                temp.push(e)
                /* 放进一级元素后递归再次探索下一级，判断条件换成
                子级判断条件,每个一级元素应该有关于他的子级元素 id */
                e.child = fn(arr, e.id)
            }
        });
        // 遍历完后temp存储的就是树状结构数据
        return temp;
    }

    







})();


