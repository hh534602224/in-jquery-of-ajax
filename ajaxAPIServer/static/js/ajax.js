// 封装调用
function ajax(options){
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
