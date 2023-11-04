<template>
    <div class="main">
        <WarningDiv class="warndiv" :value="WarningDivInfo"></WarningDiv>
        <div class="core">
            <!-- <h1>{{ ShowWhich }}</h1> -->
            <div class="form">
                <label>用户名：</label>
                <input @input="_uname" @blur="uname" v-model="UserName" type="text" placeholder="请输入用户名"><br>
                <label>密&nbsp;&nbsp;&nbsp;码：</label>
                <input @input="_pw" @change="password()" v-model="PassWord" type="password" placeholder="请输入密码"><br>
                <label>邮&nbsp;&nbsp;&nbsp;箱：</label>
                <input @input="_e" @change="email()" v-model="Email" type="text" placeholder="请输入邮箱">
            </div>
            <button @click="send()">{{ ShowWhich }}</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name:"Regin",
    data(){
        return{
            ShowWhich:"",
            UserName:"",
            UserNameIsOk:false,
            PassWord:"",
            PassWordIsOk:false,
            Email:"",
            EmailIsOk:false,
            WarningDivInfo:"",
            BaseUrl:"http://127.0.0.1:8865",
        }
    },
    props:["or"],
    methods:{
        uname(e){
            const r = /^[\u4e00-\u9fa5\w\d]{3,10}$/;
            if(r.test(this.UserName) === false){
                // 用户名不合法，显示警告框
                this.showWarningDiv("用户名不合法");
                this.showBoxShadow(e); 
                this.UserNameIsOk = false;
                return;
            }else{
                // 合法后发送请求查看是否存在用户
                axios.post(this.BaseUrl,{username:this.UserName,business:"query"})
                .then(result=>{
                    if(result.data.message === true){
                        // 如果存在该用户则判断当前是登录还是注册
                        if(this.or === "login"){
                            // 如果是登录则结束
                            return;
                        }
                        if(this.or === 'regin'){
                            // 如果是注册直接警告
                            this.showWarningDiv("该用户已存在");
                            this.showBoxShadow(e);
                            this.UserNameIsOk = false;
                        }
                    }
                })
            }
        },
        // 用户是否存在 --- true 表示存在 false 表示不存在
        _uname(e){
            // 开始查询之前判断是否合法
            const r = /^[\u4e00-\u9fa5\w\d]{3,10}$/;
            if(r.test(this.UserName) === false){
                // 用户名不合法，文本框显示红色阴影
                this.showBoxShadow(e); 
                this.UserNameIsOk = false;
            }else{
                // 用户名合法，去除文本框阴影
                this.closeBoxShadow(e);
                this.UserNameIsOk = true;
            }
        },
        // 输入密码不合法显示弹窗
        password(){
            const r = /^[a-zA-Z0-9]{5,10}$/;
            if(r.test(this.PassWord) === false){
                // 密码不合法，显示警告框
                this.showWarningDiv("密码不合法");
                this.PassWordIsOk = false;
            }
        },
        // 输入密码不合法显示阴影
        _pw(e){
            const r = /^[a-zA-Z0-9]{5,10}$/;
            if(r.test(this.PassWord) === false){
                // 密码不合法，显示警告框
                this.showBoxShadow(e);
                this.PassWordIsOk = false;
            }else{
                this.closeBoxShadow(e);
                this.PassWordIsOk = true;
            }
        },
        email(){
            const r = /^[a-zA-Z0-9]{5,20}@qq\.com$/;
            if(r.test(this.Email) === false){
                // 邮箱账号不合法，显示警告框
                this.showWarningDiv("邮箱账号不合法");
                this.EmailIsOk = false;
                return;
            }
        },
        _e(e){
            const r = /^[a-zA-Z0-9]{5,20}@qq\.com$/;
            if(r.test(this.Email) === false){
                // 邮箱账号不合法，显示警告框
                this.showBoxShadow(e);
                this.EmailIsOk = false;
            }else{
                this.closeBoxShadow(e);
                this.EmailIsOk = true;
            }
        },
        // 登录/注册按钮事件
        send(){
            // 先判断是登录还是注册
            if(this.or === "login"){
                // 做登录的事情
                // 如果允许登录，则发送请求，并携带登录用户信息
                if(this.UserNameIsOk && this.PassWordIsOk && this.EmailIsOk){
                    axios.post(this.BaseUrl,{
                        username:this.UserName,
                        password:this.PassWord,
                        email:this.Email,
                        // 携带登录信息
                        business:"login"
                    })
                    .then(result=>{
                        if(result.data.message === true){
                            // 如果响应数据为 true 那么登录成功，返回播放音乐页面
                            this.showWarningDiv("用户登录成功<br>正在跳转到音乐播放页面");
                            this.UserName = "";
                            this.PassWord = "";
                            this.Email = "";
                            setTimeout(()=>{
                                // 转入音乐播放页面
                                this.$emit("appE","playMusic");
                            },1500)
                        }else{
                            // 如果用户不存在则直接警告
                            this.showWarningDiv("该用户不存在");
                        }
                    })
                }else{
                    if(!this.UserNameIsOk){
                        this.showWarningDiv("用户名不合法");
                    }else if(!this.PassWordIsOk){
                        this.showWarningDiv("密码不合法");
                    }else if(!this.EmailIsOk){
                        this.showWarningDiv("邮箱不合法");
                    }
                }
            }else if(this.or === "regin"){
                // 如果允许注册，则发送请求，并携带需要创建用户信息
                if(this.UserNameIsOk && this.PassWordIsOk && this.EmailIsOk){
                    axios.post(this.BaseUrl,{
                        username:this.UserName,
                        password:this.PassWord,
                        email:this.Email,
                        // 用于区分业务关系
                        business:"regin"
                    })
                    .then(result=>{
                        // 判断是否创建成功
                        if(result.data.createIsOk === true){
                            // 提示创建成功，并清空所有输入框内容
                            this.showWarningDiv("用户创建成功<br>正在跳转到音乐播放页面");
                            this.UserName = "";
                            this.PassWord = "";
                            this.Email = "";
                            setTimeout(()=>{
                                // 转入音乐播放页面
                                this.$emit("appE","playMusic");
                            },1500)
                        }else{
                            this.showWarningDiv("用户注册失败");
                        }
                    })
                }else{
                    if(!this.UserNameIsOk){
                        this.showWarningDiv("用户名不合法");
                    }else if(!this.PassWordIsOk){
                        this.showWarningDiv("密码不合法");
                    }else if(!this.EmailIsOk){
                        this.showWarningDiv("邮箱不合法");
                    }
                }
            }
        },
        // 显示警告弹窗
        showWarningDiv(info){
            this.WarningDivInfo = info;
            const Wdiv = document.getElementsByClassName("warndiv")[0];
            Wdiv.style.opacity = 1; 
            let timer = setInterval(()=>{
                Wdiv.style.opacity -= 0.05; 
                if(Wdiv.style.opacity <= 0){
                    clearInterval(timer);
                }
            },120);
        },
        // 输入不合法显示阴影
        showBoxShadow(e){
            e.srcElement.style.boxShadow = "red 0px 0px 10px 2px";
        },
        // 输入合法取消阴影
        closeBoxShadow(e){
            e.srcElement.style.boxShadow = "none";
        },
        // 初始化设置
        set(){
            const main = document.getElementsByClassName("main")[0];
            const core = document.getElementsByClassName("core")[0];
            const w = getComputedStyle(main).width.slice(0,-2);
            const h = getComputedStyle(main).height.slice(0,-2);
            // 定义 core 大小
            core.style.width = w / 1.5 + "px";
            core.style.height = h / 1.2 + "px";
            // 定义 core 位置
            core.style.position = "relative";
            core.style.top = h / 2 - core.style.height.slice(0,-2) / 2 +"px";
            core.style.left = w / 2 - core.style.width.slice(0,-2) / 2 +"px";
            // 修改 core 背景
            if(this.or === "regin"){
                core.style.background = 'url(../../public/regin.webp)';
                core.style.backgroundRepeat= "no-repeat";
                core.style.backgroundSize= "100% 100%";
                core.style.backgroundPosition= "100% 100%";
            }else if(this.or === 'login'){
                core.style.background = 'url(../../public/login.jpg)';
                core.style.backgroundRepeat= "no-repeat";
                core.style.backgroundSize= "100% 100%";
                core.style.backgroundPosition= "100% 100%";
            }
            
            // 子组件接收到信息，判断显示什么内容
            if(this.or === "regin"){
                // 如果是注册信息，就显示注册组件
                this.ShowWhich = "注册";
            }else if(this.or === "login"){
                // 如果是登录信息，显示登录组件
                this.ShowWhich = "登录";
            }
        },
    },
    mounted(){
        this.set();
        window.addEventListener("resize",()=>{
            this.set();
        })
        
    }
}
</script>
<style scoped>
.main{
    width: 100vw;
    height: calc(100vh - 50px);
    background-color: rgba(239,239,239);
}

.core{
    border-radius: 30px;
    position: relative;
    background-color: white;
    
    color: white;
}
h1{
    height: 50px;
    line-height: 50px;
    padding-top: 10px;
    text-align: center;
}
.form{
    width: 50%;
    height: 50%;
    position: absolute;
    top: 25%;
    left: calc(100% / 4);
    text-align: center;
    overflow: hidden;
    /* background-color: white; */
}
label{
    font-size: 20px;
}
label,input{
    height: 30px;
    margin-top: 30px;
}
input{
    width: 50%;
    padding-left: 15px;
    border-radius: 30px;
    border: 1px solid gray;
    outline: none;
}
button{
    width: 50%;
    height: 10%;
    font-size: 30px;
    border: none;
    outline: none;
    color:white;
    background-color: rgba(49, 194, 124);
    border-radius: 30px;
    position: absolute;
    bottom: 15%;
    left:25%;
}
</style>