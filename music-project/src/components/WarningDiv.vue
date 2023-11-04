<template>
    <div class="wd" ref="wd" v-html="value"></div>
</template>
<script>
export default {
    name:"WarningDiv",
    props:["value"],
    methods:{
        set(){
            const w = window.innerWidth;
            const d = document.getElementsByClassName("wd")[0];
            d.style.position = "absolute";
            d.style.left = w/2-68+"px";
            d.style.top = "120px";
        }
    },
    mounted(){
        this.set();
        window.addEventListener('resize',()=>{
            this.set();
        })
    }
}
</script>
<style scoped>
div{
    display: inline-block;
    z-index: 999;
    opacity: 0;
    text-align: center;
    color: rgba(49, 194, 124);
    padding: 10px 20px;
    background-color: white;
    box-shadow:  white 0px 0px 24px 2px; 
}
</style>