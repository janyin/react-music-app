import React, { Component } from "react";
import styles from "./playlist.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Song from "@/components/song/index";
import { connect } from "react-redux";

/**
 * 歌单详情页面
 */
class PlayList extends Component {
    render() {
        const {
            playList: { imgUrl, name, tags, desc, music },
            history: { goBack },
        } = this.props;

        return (
            <div className={styles.playlistwrap}>
                <section className={styles.list_head}>
                    <div
                        className={styles.list_head_bg}
                        style={{ backgroundImage: `url(${imgUrl})` }}
                    ></div>
                    <div className={styles.getBack} onClick={goBack}>
                        <h3>返回</h3>
                    </div>
                    <div className={styles.list_head_content}>
                        <div className={styles.lhc_img}>
                            <LazyLoadImage src={imgUrl} alt="pic" />
                            <span className={styles.s_icon}>歌单</span>
                        </div>
                        <div className={styles.lhc_info}>
                            <h2 className={styles.lhc_title}>{name}</h2>
                        </div>
                    </div>
                </section>
                <section className={styles.list_info}>
                    <div className={styles.info_tags}>
                        标签:{tags && tags.map((value) => 
                        (<em className={styles.tag} key={value}>
                            {value}
                        </em>))}
                    </div>
                    {desc && (
                        <div className={styles.info_intro}>
                            <span>简介：{desc.substring(0, 100)} </span>
                        </div>
                    )}
                </section>
                <div className={styles.list_song}>
                    <h3>歌曲列表</h3>
                    {music && music.map((value) => <Song data={value} key={value.id} />)}
                </div>
            </div>
        );
    }
}

export default connect((state) => ({
    playList: state.playList,
}))(PlayList);
