import React, { Component } from "react";
import "./play.css";
import Comment from "components/comment";
import { setCurMusic, setPlayerStatus } from "store/action";
import { Toast } from "antd-mobile";
import { connect } from "react-redux";

class Player extends Component {
  constructor(props) {
    super(props);
    this.audio = React.createRef();
  }

  async componentDidMount() {
    try {
      const {
        setCurMusic,
        setPlayerStatus,
        location: { query: data },
        curMusic,
      } = this.props;
      if (data.id !== curMusic.id) {
        Toast.loading("正在加载数据...", 100);
        // eslint-disable-next-line
        let res = await setCurMusic(data);
        Toast.hide();
      }
      setPlayerStatus(true);
    } catch (error) {
      Toast.hide();
      Toast.offline("网络错误");
      console.log(error);
    }
  }

  componentWillUnmount() {
    const { setPlayerStatus } = this.props;
    setPlayerStatus(false);
  }

  changeStatus = () => {
    const { setPlayerStatus, playerStatus } = this.props;
    if (playerStatus) {
      this.audio.current.pause();
    } else {
      this.audio.current.play();
    }
    setPlayerStatus(!playerStatus);
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const {
      curMusic: { song, singer, imgUrl, musicUrl, comment },
      playerStatus,
    } = this.props;

    return (
      <div>
        <audio src={musicUrl} loop autoPlay ref={this.audio}>
          你的浏览器暂时不支持H5播放
        </audio>
        <div
          className="song_bg"
          style={{ backgroundImage: `url(${imgUrl})` }}
        ></div>
        <div className="wrapper">
          <div className="player_getBack" onClick={this.goBack}>
            <h3>返回</h3>
          </div>
          <div className="icon_rotate" onClick={this.changeStatus}>
            <div className="needle"></div>
            <div className="icon_center">
              <div className="song_img">
                <div
                  className={`default_img rotateDiv ${
                    !playerStatus && "noRotate"
                  }`}
                >
                  <img src={imgUrl} alt="pic" />
                </div>
              </div>
            </div>
            {!playerStatus && <span className="play_btn" />}
          </div>
          <div className="song_info">
            <p className="song_title">
              {song} — {singer}
            </p>
          </div>
          <div className="comment_wrap">
            <p>热门评论</p>
            {comment &&
              comment.map((val) => <Comment key={val.content} data={val} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    curMusic: state.curMusic,
    playerStatus: state.playerStatus,
  }),
  {
    setCurMusic,
    setPlayerStatus,
  }
)(Player);
