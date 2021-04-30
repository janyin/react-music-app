# 基于 React 的网易云音乐移动端 web app
- VScode在线预览代码：https://github1s.com/janyin/react-music-app
- Vue 版本：https://github.com/janyin/vue-wangyiyun-music
- 项目技术都比较简单，适合新手拿来练手的入门级 React 开发实战项目;
- 主要功能有：推荐歌单、搜索歌曲、播放页等;
- [API 来源][2]

## 在线预览效果

- PC 端请使用 Chrome 手机模式[点我在线预览][1];
- <strong>如果喜欢可以右上角给个 ⭐Star⭐, 谢谢！</strong>

## 用到的部分技术

- 构建工具：create-react-app;
- 框架：React + React router + Redux;
- http 请求：axios;
- 部分 UI 组件：Antd Mobile;

## 运行此项目

```git
git clone https://github.com.cnpmjs.org/janyin/react-music-app

cd react-music-app

npm install or yarn

npm run start (开发编译) or yarn start

npm run build (打包发布) or yarn build
```

## 项目目录

<details>
<summary>展开查看</summary>
<pre><code>

├─api // api 请求参数相关配置
├─assets // 静态资源
├─components  
│ ├─home // 主页
│ │ ├─footer // 主页底部
│ │ └─remdlist // 主页推荐歌单部分
│ ├─rank // 排行榜页面
│ ├─search // 搜索页面
│ │ └─trending // 搜索热词组件
│ └─song // 歌曲项组件
├─page  
│ ├─layout // 布局设置页
│ ├─player // 播放页面
│ │ └─comment // 歌曲评论组件
│ └─playlist // 歌单页
├─route // 路由配置
├─store // redux 配置
└─utils // 公用 JS

</code></pre>

</details>

[1]: https://react-music-app.now.sh/#/
[2]: https://binaryify.github.io/NeteaseCloudMusicApi
