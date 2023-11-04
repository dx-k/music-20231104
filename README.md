# 一、运行设置

## 1.web页面

```
cd music-project
npm i
npm run dev
```

## 2.node服务

```
cd nodeServer
cd nodejs
nodemon server.js
```

## 3.music服务

```
cd nodeServer
cd nodejs
nodemon musicServer.js
```

# 二、总结

**优点**

小型项目作为一个初学者可以加深业务代码的理解

增加检验，写代码之前需要构思，解析各个业务之间的关系

对node.js有更深刻的了解，将来重构时还可以封装自己的路由模块

书写自己的模块例如：查询模块，创建用户信息模块，获取用户信息模块，响应音乐信息模块

对promise有更多的了解

**缺点**

WarningDiv组件没有更好的使用，在初始化时位置也没有设置好，以及在app组件中没有使用

没有使用动画效果，在变换不同的页面时太过生硬

项目开发周期短，没有考虑更多的可能性



# 三、音乐

当时设计时就没想好怎么设置有些音乐需要登录才能听，导致在后面开始摆烂了，设置了音乐名长度大于4就需要登录播放

我仅仅在music文件夹下放置了两首歌



