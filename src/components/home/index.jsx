import React, { Component } from "react";
import { Toast } from "antd-mobile";
import Song from "components/song/index";
import RemdList from "./remdlist/index";
import Footer from "./footer/index";
import styles from "./home.module.css";
import { connect } from "react-redux";
import { getPlaylist } from "store/action";

class Home extends Component {
  gotoPlayList = async (id) => {
    const { playList, getPlaylist, history } = this.props;
    if (!playList.id || id !== playList.id) {
      try {
        Toast.loading("正在加载数据...", 100);
        // eslint-disable-next-line
        let res = await getPlaylist(id);
        Toast.hide();
      } catch (error) {
        Toast.hide();
        Toast.offline("网络错误");
        console.log(error);
      }
    }
    history.push("/playlist");
  };

  render() {
    const { remd, newSong } = this.props;

    return (
      <div className={styles.content}>
        <h2 className={styles.remd}>推荐歌单</h2>
        <div className={styles.list}>
          {remd.slice(0, 3).map((value) => (
            <RemdList
              gotoPlayList={this.gotoPlayList}
              {...value}
              key={value.id}
            />
          ))}
        </div>
        <div className={styles.list}>
          {remd.slice(3, 6).map((value) => (
            <RemdList
              gotoPlayList={this.gotoPlayList}
              {...value}
              key={value.id}
            />
          ))}
        </div>
        <h2 className={styles.remd}>最新音乐</h2>
        <section>
          {newSong.map((value) => (
            <Song data={value} key={value.id} />
          ))}
        </section>
        <Footer />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    newSong: state.newSong,
    remd: state.remd,
    playList: state.playList,
  }),
  { getPlaylist }
)(Home);
