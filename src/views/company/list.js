
import DS from '../../scripts/DS.js';

import $ from '$';

console.log('使用VUEX服务111：'+DS());

console.log('company-list.js');
console.log('获取公司数据列表请求');

$('#dd').datebox({
  required:true
});

function createData(){
  var arr = [];

  var i=0;
  while(i< 10){
    var obj = {
      code: 'code'+i,
      name: 'name'+i,
      price: 'price'+i,
    }
    arr.push(obj);
    i++;
  }

  return arr;
}

$('#dg').datagrid({
  columns:[[
  {field:'code',title:'Code',width:100},
  {field:'name',title:'Name',width:100},
  {field:'price',title:'Price',width:100,align:'right'}
  ]],
  data: createData()
});

$('#combogridInst').combogrid({
  panelWidth:450,
  value:'006',
  idField:'code',
  textField:'name',
  columns:[[
  {field:'code',title:'Code',width:60},
  {field:'name',title:'Name',width:100},
  {field:'addr',title:'Address',width:120},
  {field:'col4',title:'Col41',width:100}
  ]],
  data: createData()
});

$('#rr').resizable({
  maxWidth:800,
  maxHeight:600
});