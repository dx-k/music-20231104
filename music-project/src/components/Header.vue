<template>
    <div class="header">
        <div class="cen">
            <input @keydown.enter="searchMusic" v-model="MusicName" type="text" placeholder="搜索音乐">
            <div class="cde">
                <div class="d" @click="reginOrLogin($event)" ref="login">登录</div>
                <div class="d" @click="reginOrLogin($event)" ref="regin">注册</div>
            </div>
        </div>
    </div> 
</template>
<script>
import axios from 'axios';
export default {
    name:"Header",
    data(){
        return{
            MusicName:"",
            // 下面页面的状态
            AnotherPageStatus:"playmusic"
        }
    },
    props:["status"],
    methods:{
        // 搜索音乐
        searchMusic(){
            // 检测当前页面下方是什么状态
            switch(this.AnotherPageStatus){
                case "playmusic":
                    // 将音乐名传递给playmusic组件
                    this.$emit("getMusic",this.MusicName);
                    break;
                default:
                    alert("请到音乐页面搜索");
                    this.AnotherPageStatus = "playMusic";
                    this.$emit("appE","playMusic");
                    break;
            }
        },
        // 设置响应式的头部页面，由mounted监控
        setCenStyle(){
            const header = document.getElementsByClassName("header")[0];
            const cen = document.getElementsByClassName("cen")[0];
            const input = document.querySelector("input");
            const w = getComputedStyle(header).width.slice(0,-2);
            cen.style.width = w / 1.5 + "px";
            input.style.width = w / 3 + "px";
        },
        reginOrLogin(e){
            if(e.target.innerText === "注册"){
                this.AnotherPageStatus = "regin";
                this.$emit("toFather",{regin:true});
            }else if(e.target.innerText === "登录"){
                this.AnotherPageStatus = "login";
                this.$emit("toFather",{login:true});
            }
        }
    },
    mounted(){
        this.setCenStyle();
        window.addEventListener('resize',()=>{
            this.setCenStyle();
        })
    }
}
</script>
<style scoped>
.header{
    width: 100vw;
    height: 50px;
    display: flex;
    justify-content: center;
    background-color: white;
}
.cen{
    display: flex;
    justify-content: space-between;
}
input[type=text]{
    width: 475px;
    height: 50px;
    border: 1px solid gray;
    border-radius: 50px;
    outline: none;
    font-size: 30px;
    padding-left: 25px;
}
.d{
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: white;
    background-color: rgba(49, 194, 124);
    cursor: pointer;
}
.cde{
    width: 150px;
    display: flex;
    justify-content: space-between;
}
</style>