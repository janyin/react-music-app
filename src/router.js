import React, { Component, lazy, Suspense } from "react";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import { Toast, ActivityIndicator } from "antd-mobile";
import Layout from "page/layout/index";
import { connect } from "react-redux";
import { getHomeData, getRankData, getHotWord } from "store/action";

const Player = lazy(() => import("page/player/index"));
const PlayList = lazy(() => import("page/playlist/index"));

class RouteConfig extends Component {
  async componentDidMount() {
    Toast.loading("正在加载数据...", 100);
    try {
      const { getHomeData, getRankData, getHotWord } = this.props;
      // eslint-disable-next-line
      let res = await Promise.all([getHomeData(), getRankData(), getHotWord()]);
      Toast.hide();
    } catch (error) {
      Toast.hide();
      Toast.offline("网络错误");
      console.log(error);
    }
  }

  render() {
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
}

export default connect(null, {
  getHomeData,
  getRankData,
  getHotWord,
})(RouteConfig);
