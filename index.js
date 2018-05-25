/*const foo = {template:'<div>Foo</div>'}
const bar = {template:'<div>Bar</div>'}
const router = new VueRouter({
  routes:[
    {path:'/foo',component:foo},
    {path:'/bar',component:bar}
  ]
})
const vm = new Vue({
  router
}).$mount('#app')
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')*/
/*const User = {
  template: '<div class="user"><h2>User {{ $route.params.id }}</h2><router-view></router-view></div>'
}

const UserHome = { template: '<div>Home</div>' }
const UserProfile = { template: '<div>Profile</div>' }
const UserPosts = { template: '<div>Posts</div>' }

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        // UserHome will be rendered inside User's <router-view>
        // when /user/:id is matched
        { path: '', component: UserHome },
        
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        { path: 'profile', component: UserProfile },

        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        { path: 'posts', component: UserPosts }
      ]
    }
  ]
})

const app = new Vue({ router }).$mount('#app')*/
// const Foo = { template: '<div>foo</div>' }
// const Bar = { template: '<div>bar</div>' }
// const Baz = { template: '<div>baz</div>' }

// const router = new VueRouter({
//  mode: 'history',
//    routes: [
//     { path: '/a',
//       component:Foo,
//       beforeEnter: (to, from, next) => {
//          console.log('小弟B：哎呀妈呀！大兄弟，这是要去哪呀？', to)
//          console.log('小弟A：大兄弟，哪儿旮沓的呀！', from)
//          next() // 大哥：过去吧！
//          // 调用next通过路由
//    }
//  }
//   ]
// })

// new Vue({
//  router,
//   el: '#app'
// })
/*Vue.component('todo-item', {
  template: `
    <li>
      {{ title }}
      <button v-on:click="$emit('remove')">X</button>
    </li>
  `,
  props: ['title']
})
new Vue({
  el: '#todo-list-example',
  data: {
    newTodoText: '',
    todos: [
      'Do the dishes',
      'Take out the trash',
      'Mow the lawn'
    ]
  },
  methods: {
    addNewTodo: function () {
      this.todos.push(this.newTodoText)
      this.newTodoText = ''
    }
  }
})*/
"use strict";
var dappContactAddress = "n1x9E8R9BzgqqtXsyPcbBEv9HzRLqU9i7Z6";
var nebulas = require("nebulas"), Account = Account, neb = new nebulas.Neb();
neb.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"))

var NebPay = require("nebpay");     //https://github.com/nebulasio/nebPay
var nebPay = new NebPay();
var serialNumber;

var params = getParams();
var subject = decodeURI(params[0]);
if (subject.length == 0) {
  window.location = './car.html';
}
var page = params[1];
var limit = params[2];
var walletExist = isWalletExist();

var myDate = new Date();
Vue.component('list-item',{
  props:['parent','username','time'],
  template:`
    <div class="list-column">
      <div class="list-column-head">
        <img src="timg.jpg">
        <div class="info">
          <h4 class="info-user"><a class="#">{{username}}</a></h4>
          <span class="comment-date">{{time}}</span>
        </div>
      </div>
      <div class="list-column-body">
        <p>{{parent}}</p>
      </div>
    </div>
    `
})
var vm = new Vue({
  el:'#todo-list-example',
  data:{
    walletExist:walletExist,
    walletAlert:false,
    subject:subject,
    current:page,
    limit:limit,
    allpage:1,
    pages:[
    ],
    comment:0,
    message:'我',
    text:'',
    num:0,
    items:[
    ],
    listName:[
    ],
    listTime:[
    ],
  },
  methods:{
    addNewComment: function () {
      if (this.walletExist == false) {
        alert('请先安装webExtensionWallet钱包');
        return;
      }
      if (this.text.length == 0) {
        alert('请输入评论后再提交！');
        return;
      }
      saveComment(this.subject, this.text);
      this.items.push(this.text);
      this.listName.push(this.message);
      var now = myDate.toLocaleString();//myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate();
      this.listTime.push(now);
      this.comment=this.items.length;
      this.text='';
    },
    activeBtn: function () {
        var num = 0;
        var oUser = document.getElementById('user');
        var timer=setInterval(function(){   
            if(oUser.offsetHeight>=58){
              clearInterval(timer);
            }else{
              num+=8;
              oUser.style.height=num+'px';
            }
        },30);
    },
    goto: function (index) {
        if (index == this.current) return;
        var gotoUrl = "./list.html" + "?subject=" + subject + "&page=" + index;
        if (this.limit > 0 && this.limit != 10) {
          gotoUrl += "&limit=" + this.limit;
        }
        window.location = gotoUrl;   
    }
  }
})

function isWalletExist() {
    //if the extension is installed, var "webExtensionWallet" will be injected in to web page
    if (typeof (webExtensionWallet) === "undefined") {
        return false;
    } else {
        return true;
    }
}

var InfoItem = function() {
    this.comment = '0';
    this.message = '';
    this.text = '';
    this.num = 0;
    this.items = new Array();
    this.listName = new Array();
};

getInfo(subject, page, limit);

function saveComment(subject, comment) {
  var to = dappContactAddress;
  var value = "0";
  var callFunction = "save";
  var callArgs = "[\"" + subject + "\",\"" + comment + "\"]";
  console.log(callArgs);

  serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
      callback: NebPay.config.mainnetUrl,
      listener: function (resp) {
          console.log("thecallback is " + JSON.stringify(resp));
          // 延迟5秒执行
          intervalQuery = setInterval(function () {
              queryResultInfo();
          }, 5000);
      }
  });
}

// 定时器
var intervalQuery;
// 根据交易流水号查询执行结果数据
function queryResultInfo() {
    nebPay.queryPayInfo(serialNumber)
        .then(function (resp) {
            var respObject = JSON.parse(resp)
            console.log(respObject);
            if(respObject.code === 0){
                alert(`提交评论成功!`);
                clearInterval(intervalQuery);
            }
        })
        .catch(function (err) {
           console.log(err);
        })
}

function getInfo(subject, page=1, limit=10) {
  var from = dappContactAddress
  var value = "0";
  var nonce = "0"
  var gas_price = "1000000"
  var gas_limit = "2000000"
  var callFunction = "get";
  var callArgs = "[\"" + subject + "\",\"" + page + "\",\"" + limit + "\"]";
  var contract = {
      "function": callFunction,
      "args": callArgs
  }

  var info = neb.api.call(from, dappContactAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
    var result = resp.result;
    if (result == 'null') {
        return new InfoItem();
    }
    var dataArray = JSON.parse(JSON.parse(result));
    if (dataArray.error == '1' || dataArray.data.commentItems.length === 0 ) {
        return new InfoItem();
    }
    var listName = new Array();
    var listTime = new Array();
    var items = new Array();
    dataArray.data.commentItems.forEach(function(item){
      listName.push(item.author);
      var newDate = new Date();
      newDate.setTime(item.time);
      listTime.push(newDate.toLocaleString());
      items.push(item.content);
    });

    vm.listName = listName;
    vm.listTime = listTime;
    vm.items = items;
    vm.subject = dataArray.data.title;
    vm.comment = dataArray.data.comments.length;
    vm.allpage = Math.ceil(vm.comment/limit);
    if (vm.allpage > 1) {
        var pages = new Array();
        for (var i = 1; i <= vm.allpage; i++) {
          pages.push(i);
        }
        vm.pages = pages;
    }
    return ;
  });
}

function getParams() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  var subject = '';
  var page = 1;
  var limit = 10;

  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      var tmp_arr = strs[i].split("=");
      if (tmp_arr[0].toLowerCase() == 'subject') {
        subject = tmp_arr[1];
      }
      if (tmp_arr[0].toLowerCase() == 'page') {
        page = tmp_arr[1];
      }
      if (tmp_arr[0].toLowerCase() == 'limit') {
        limit = tmp_arr[1];
      }
    }
  }
  return new Array(subject, page, limit);
}
