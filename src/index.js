
import tabs from './scripts/tabs.js';
import http from './scripts/http.js';
import './styles/global.css';

console.log('使用多页签服务6667777：'+tabs());
// 这是一行注释
console.log('http:'+http());

function component() {
  var button = document.createElement('button');
  button.innerHTML = 'demo';

  button.onclick = function(e){
    console.log('demo');
    [11, 22, 33, 44, 55].map( v => console.log(v));
  }

  return button;
}

document.body.appendChild(component());

// 发送请求
$.post("/cloudfi/login/authentication", {"userName":"admin","pwd":"3d2172418ce305c7d16d4b05597c6a59"}, function(res){
  console.log(res);
});

