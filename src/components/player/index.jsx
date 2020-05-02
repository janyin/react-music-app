import React, { Component } from "react";
import styles from "./player.module.css";
import { Progress } from "antd-mobile";

export default class Player extends Component {
  handleTimeUpdate = (e) => {
    const { setPlayerTime } = this.props;
    const { currentTime, duration } = e.target;
    setPlayerTime({
      currentTime,
      duration,
    });
  };

  changeStatus = () => {
    const { setPlayerStatus, playerStatus } = this.props;
    if (playerStatus) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    setPlayerStatus(!playerStatus);
  };

  render() {
    const {
      song,
      singer,
      imgUrl,
      musicUrl,
      percent,
      playerStatus,
    } = this.props;

    return (
      <div className={styles.btm_player}>
        <span
          className={`${styles.play_icon} ${!playerStatus && styles.stop_btn}`}
          onClick={this.changeStatus}
        ></span>
        <div className={styles.musicInfo}>
          <img src={imgUrl} alt="pic" />
          <p>
            <span>{song}</span> -<span>{singer}</span>
          </p>
          <div className={styles.process}>
            <Progress percent={percent} position="normal" />
          </div>
        </div>
        <audio
          src={musicUrl}
          loop
          autoPlay
          onTimeUpdate={this.handleTimeUpdate}
          ref={(ref) => (this.audio = ref)}
        >
          你的浏览器暂时不支持H5播放
        </audio>
      </div>
    );
  }
}
