import { setCurMusic, setPlayerStatus } from '@/store/action';
import { Toast } from 'antd-mobile';
import React, { useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux';
import Comment from './comment';
import './index.css';

/**
 * 播放页面
 * @author janyin
 */
function Player(props) {
  const {
    curMusic: { title, artists, imgUrl, musicUrl, comment },
    playerStatus,
    setCurMusic,
    setPlayerStatus,
    history,
    location: { query: data },
  } = props;
  const player = React.createRef();

  /**
   *回到上一页面
   */
  function goBack() {
    setPlayerStatus(false);
    history.goBack();
  }

  /**
   * 歌曲版权受限制时
   */
  function disableMusic() {
    Toast.fail('该音乐无法播放', 2, () => {
      goBack();
    });
  }
  /**
   * 改变播放状态，点暂停的时候
   */
  function changeStatus() {
    if (playerStatus) {
      player.current.pause();
    } else {
      player.current.play();
    }
    setPlayerStatus(!playerStatus);
  }

  // eslint-disable-next-line
  useEffect(() => {
    async function getMusicData() {
      Toast.loading('正在加载数据...', 100);
      const res = await setCurMusic(data);
      Toast.hide();
      if (res === 'DISABLEMUSIC') {
        disableMusic();
      } else {
        setPlayerStatus(true);
      }
    }
    getMusicData();
    // eslint-disable-next-line
  }, [data]);

  return (
    <div>
      <audio src={musicUrl} loop autoPlay ref={player}>
        你的浏览器暂时不支持H5播放
      </audio>
      <div className="song_bg" style={{ backgroundImage: `url(${imgUrl})` }} />
      <div className="wrapper">
        <div className="player_getBack" onClick={goBack}>
          <h3>返回</h3>
        </div>
        <div className="icon_rotate" onClick={changeStatus}>
          <div className="needle" />
          <div className="icon_center">
            <div className="song_img">
              <div
                className={`default_img rotateDiv ${
                  !playerStatus && 'noRotate'
                }`}
              >
                <LazyLoadImage src={imgUrl} alt="pic" />
              </div>
            </div>
          </div>
          {!playerStatus && <span className="play_btn" />}
        </div>
        <div className="song_info">
          <p className="song_title">
            {title} —{artists}
          </p>
        </div>
        <div className="comment_wrap">
          <p>热门评论</p>
          {comment?.map((val) => (
            <Comment key={val.content} data={val} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    curMusic: state.curMusic,
    playerStatus: state.playerStatus,
  }),
  {
    setCurMusic,
    setPlayerStatus,
  },
)(Player);
