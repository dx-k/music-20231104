<template>
  <Header @toFather="showWhichOne" @appE="changePage" @getMusic="sendMusics"></Header>
  <PlayMusic 
    v-if="ShowPlayMusic" 
    :getMusic="musicName"
    :melody="melody"
    :musicname="musicname"
    :text="text"
  ></PlayMusic>
  <!-- v-if 决定要不要显示这个组件 or属性决定显示成什么组件 -->
  <ReginOrLogin v-if="ShowReginOrLogin" :or="ReginOrLoginInfo" @appE="changePage"></ReginOrLogin>
</template>
<script>
import axios from 'axios';

import Header from './components/Header.vue';
import PlayMusic from './components/PlayMusic.vue';
import ReginOrLogin from './components/ReginOrLogin.vue';

export default {
  name:"App",
  data(){
    return{
      ShowPlayMusic:true,
      ShowReginOrLogin:false,
      ReginOrLoginInfo:"",
      // 是否登录了
      LoginStatus:false,
      // 音乐名
      musicName:"",
      melody:"",
      musicname:"",
      text:""
    }
  },
  components:{
    Header,
    PlayMusic,
    ReginOrLogin
  },
  methods:{
    // 传递音乐名
    sendMusics(e){
      const musicurl = `http://127.0.0.1:8865/${e}.m4a`
      // 传递音乐名之前判断是否存在该音乐
      axios.get(musicurl)
      .then(result=>{
        if(result.data.isExist){
          console.log(result);
          // 如果存在该音乐，判断其是否登录才能播放
          if(result.data.loginPlay){
            if(this.LoginStatus){
              // 更改地址
              const url = result.data.url.replace("replace",e);
              // 设置地址使得能够正常播放
              console.log(result);
              this.musicName = url;
              this.melody = result.data.musicInfo.melody;
              this.musicname = result.data.musicInfo.musicname;
              this.text = result.data.musicInfo.text;
            }else{
              alert("此音乐需要登录");
            }
          }else{
            // 更改地址
            const url = result.data.url.replace("replace",e);
            // 设置地址使得能够正常播放
            this.musicName = url;
            this.musicName = url;
            this.melody = result.data.musicInfo.melody;
            this.musicname = result.data.musicInfo.musicname;
            this.text = result.data.musicInfo.text;
          }
        }else{
          // 如果不存在该音乐
          alert("没有该音乐");
        }
      })
      .catch(e=>{
        alert(e);
      })
    },
    // 显示播放音乐还是 ReginOrLogin
    changePage(e){
      if(e === "playMusic"){
        // 显示音乐播放页面
        this.ShowPlayMusic = true;
        // 关闭登录页面
        this.ShowReginOrLogin = false;
        // 登录状态为true
        this.LoginStatus = true;
      }
    },
    // 决定显示 登录 或 注册
    showWhichOne(msg){
      // 接收子组件传递过来的数据进行判断
      if(msg.regin){
        // 如果有注册信息
        // 音乐播放页面关闭
        this.ShowPlayMusic = false;
        // 显示 登录 或 注册 组件
        this.ShowReginOrLogin = true;
        // 决定最后到底 regin 组件
        this.ReginOrLoginInfo = "regin";
      }else if(msg.login){
        // 如果有登录信息
        // 关闭音乐播放页面
        this.ShowPlayMusic = false;
        // 显示 登录 或 注册 组件
        this.ShowReginOrLogin = true;
        // 决定最后显示 login 组件
        this.ReginOrLoginInfo = "login";
      }
    }
  }
}
</script>
<style scoped>

</style>