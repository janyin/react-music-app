import React, { Component } from "react";
import PropsTypes from "prop-types";
import styles from "./song.module.css";
import { setCurMusic, setPlayerStatus } from "store/action";
import { Toast } from "antd-mobile";
import { connect } from "react-redux";

class Song extends Component {
  static propsTypes = {
    title: PropsTypes.string.isRequired,
    alias: PropsTypes.string.isRequired,
    artists: PropsTypes.string.isRequired,
    album: PropsTypes.string.isRequired,
    rank: PropsTypes.string,
  };

  gotoPlayer = async () => {
    try {
      const { data, setCurMusic, setPlayerStatus } = this.props;
      Toast.loading("正在加载数据...", 100);
      // eslint-disable-next-line
      let res = await setCurMusic(data);
      setPlayerStatus(true);
      Toast.hide();
    } catch (error) {
      Toast.hide();
      Toast.offline("网络错误");
      console.log(error);
    }
  };

  render() {
    const {
      title,
      alias,
      artists,
      album,
      rank = false,
      color = false,
    } = this.props.data;

    return (
      <div className={styles.song} onClick={this.gotoPlayer}>
        {rank && (
          <div className={`${styles.song_num} ${color && styles.highlight}`}>
            {rank}
          </div>
        )}
        <div className={styles.song_wrapper}>
          <div className={styles.song_info}>
            <div className={styles.song_title}>
              {title}
              {alias && <span>({alias})</span>}
            </div>
            <div className={styles.song_detail}>
              <i className={styles.sq}></i>
              {artists} - {album}
            </div>
          </div>
          <div className={styles.song_play}>
            <span className={styles.play_icon}></span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({}), { setCurMusic, setPlayerStatus })(Song);
