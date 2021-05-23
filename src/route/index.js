import { getHomeData, getHotWord, getRankData } from '@/store/action';
import { ActivityIndicator } from 'antd-mobile';
import React, { lazy, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

const Layout = lazy(() => import('@/page/layout/index'));
const Player = lazy(() => import('@/page/player/index'));
const PlayList = lazy(() => import('@/page/playlist/index'));

/**
 * 路由配置组件
 * @author janyin
 */
function RouteConfig({ getHomeData, getRankData, getHotWord }) {
  useEffect(() => {
    function getInitData() {
      Promise.all([getHomeData(), getRankData(), getHotWord()]);
    }
    getInitData();
    // eslint-disable-next-line
  }, []);

  return (
    <HashRouter>
      <Suspense fallback={<ActivityIndicator toast text="loading" />}>
        <Switch>
          <Route exact path="/" component={Layout} />
          <Route path="/playlist" component={PlayList} />
          <Route path="/player" component={Player} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </HashRouter>
  );
}

export default connect(null, {
  getHomeData,
  getRankData,
  getHotWord,
})(RouteConfig);
