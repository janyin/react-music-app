import React, { Component } from "react";
import Comment from "./comment/index";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { setCurMusic, setPlayerStatus } from "@/store/action";
import { Toast } from "antd-mobile";
import { connect } from "react-redux";
import "./index.css";

/**
 * 播放页面
 * @author janyin
 */
class Player extends Component {
    /**
     * 获取音乐的播放数据
     */
    async componentDidMount() {
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
            if (res === "DISABLEMUSIC") {
                this.disableMusic();
            } else {
                setPlayerStatus(true);
            }
        } else {
            setPlayerStatus(true);
        }

    }

    /**
     * 歌曲版权受限制时
     */
    disableMusic = () => {
        Toast.fail("该音乐无法播放", 3, () => {
            this.goBack();
        });
    };

    /**
     * 改变播放状态，点暂停的时候
     */
    changeStatus = () => {
        const { setPlayerStatus, playerStatus } = this.props;
        if (playerStatus) {
            this.player.pause();
        } else {
            this.player.play();
        }
        setPlayerStatus(!playerStatus);
    };

     /**
     * 回到上一页面
     */
    goBack = () => {
        const { history, setPlayerStatus } = this.props;
        setPlayerStatus(false);
        history.goBack();
    };

    render() {
        const {
            curMusic: { title, artists, imgUrl, musicUrl, comment },
            playerStatus,
        } = this.props;

        return (
            <div>
                <audio src={musicUrl} loop autoPlay ref={(ref) => (this.player = ref)}>
                    你的浏览器暂时不支持H5播放
                </audio>
                <div className="song_bg" style={{ backgroundImage: `url(${imgUrl})` }}></div>
                <div className="wrapper">
                    <div className="player_getBack" onClick={this.goBack}>
                        <h3>返回</h3>
                    </div>
                    <div className="icon_rotate" onClick={this.changeStatus}>
                        <div className="needle"></div>
                        <div className="icon_center">
                            <div className="song_img">
                                <div className={`default_img rotateDiv ${!playerStatus && "noRotate"}`}>
                                    <LazyLoadImage src={imgUrl} alt="pic" />
                                </div>
                            </div>
                        </div>
                        {!playerStatus && <span className="play_btn" />}
                    </div>
                    <div className="song_info">
                        <p className="song_title">
                            {title} — {artists}
                        </p>
                    </div>
                    <div className="comment_wrap">
                        <p>热门评论</p>
                        {comment && comment.map((val) => <Comment key={val.content} data={val} />)}
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
