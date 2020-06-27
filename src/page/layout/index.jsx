import React from 'react';
import Home from '@/components/home/';
import Rank from '@/components/rank/';
import Search from '@/components/search/';
import { Tabs } from 'antd-mobile';
import logo from '@/assets/logo.svg';
import './index.css';

/**
 * 布局设置
 * @author janyin
 */
function Layout() {
  const tabs = [
    { title: <span className="linkto">推荐音乐</span> },
    { title: <span className="linkto">热歌榜</span> },
    { title: <span className="linkto">搜索</span> },
  ];

  return (
    <div>
      <div className="top-fix">
        <img src={logo} alt="logo" className="topsvg" />
        <div className="topfr">
          <span>React</span>
        </div>
      </div>
      <Tabs tabs={tabs} initialPage={0}>
        <Home />
        <Rank />
        <Search />
      </Tabs>
    </div>
  );
}

export default Layout;
