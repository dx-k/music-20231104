<template>
    <div class="main">
        <div class="core">
            <WarningDiv v-show="showWarningDiv"></WarningDiv>
            <!-- 唱片图片 -->
            <div class="record" v-if="showRecord"></div>
            <div class="record animation" v-else></div>
            <!-- 音乐控件 -->
            <audio controls :src="getMusic" @play="change" @pause="change"></audio>
            <!-- 音乐信息 -->
            <div class="musicInfo">
                <p>{{ melody }}</p>
                <p>{{ musicname }}</p>
                <p>{{ text }}</p>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name:"PlayMusic",
    data(){
        return{
            showWarningDiv:false,
            showRecord:true
        }
    },
    props:["getMusic","melody","musicname","text"],
    methods:{
        change(){
            // const record = document.getElementsByClassName("record")[0];
            // console.log(record.style.animation);
            // record.style.animation = "rotate 3s linear infinite";
            // console.log(record.style.animation);
            this.showRecord = !this.showRecord;
        },
        setCoreStyle(){
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
        }
    },
    mounted(){
        // 在挂载时修改 core 的大小
        this.setCoreStyle();
        // 监控窗口大小发生改变时实时修改 core 的大小
        window.addEventListener("resize",()=>{
            this.setCoreStyle();
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
    background-color: white;
    border-radius: 30px;
    position: relative;
}
.record{
    width: 200px;
    height: 200px;
    position: absolute;
    top: calc(10%);
    left: calc(50% - 100px);
    border-radius: 50%;
    background-image: url(../../public/111.jpg);
    background-size: 110%;
    background-position: center center;
    
}
.animation{
    animation: rotate 3s linear infinite;
}
.musicInfo{
    width: 100%;
    position: absolute;
    bottom: 140px;
    left: 0px;
    text-align: center;
}
audio{
    width: 100%;
    position: absolute;
    bottom: 0px;
}
@keyframes rotate {
    0% {
        transform: rotate(0);
    }

    25% {
        transform: rotate(90deg);
    }

    50% {
        transform: rotate(180deg);
    }

    75% {
        transform: rotate(270deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>