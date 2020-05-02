import React, { Component } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { Toast } from "antd-mobile";
import Layout from "page/layout/index";
import PlayList from "page/playlist/index";
import Player from "components/player/index";
import { connect } from "react-redux";
import {
  getHomeData,
  getRankData,
  getHotWord,
  setPlayerStatus,
  setPlayerTime,
} from "store/action";

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
    const {
      curMusic,
      playerStatus,
      setPlayerStatus,
      setPlayerTime,
      percent,
    } = this.props;

    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Layout} />
          <Route path="/playlist" component={PlayList} />
          <Redirect to="/" />
        </Switch>
        {curMusic.id && (
          <Player
            {...curMusic}
            percent={percent}
            playerStatus={playerStatus}
            setPlayerStatus={setPlayerStatus}
            setPlayerTime={setPlayerTime}
          />
        )}
      </HashRouter>
    );
  }
}

export default connect(
  (state) => ({
    curMusic: state.curMusic,
    playerTime: state.playerTime,
    playerStatus: state.playerStatus,
    percent: state.percent,
  }),
  {
    getHomeData,
    getRankData,
    getHotWord,
    setPlayerStatus,
    setPlayerTime,
  }
)(RouteConfig);
