import React from 'react';
import { Toast } from 'antd-mobile';
import Song from '@/components/song/';
import { connect } from 'react-redux';
import { getPlaylist } from '@/store/action';
import { useHistory } from 'react-router-dom';
import RemdList from './remdlist';
import Footer from './footer';
import styles from './index.module.css';

/**
 * 首页
 * @author janyin
 */
function Home({ playList, getPlaylist, remd, newSong }) {
  const history = useHistory();
  /**
   * 跳转到歌单详情页面
   * @param {Number} id 歌单ID
   */
  async function gotoPlayList(id) {
    if (!playList.id || id !== playList.id) {
      Toast.loading('正在加载数据...', 100);
      await getPlaylist(id);
      Toast.hide();
    }
    history.push('/playlist');
  }

  return (
    <div className={styles.content}>
      <h2 className={styles.remd}>推荐歌单</h2>
      <div className={styles.list}>
        {remd.slice(0, 3).map((value) => (
          <RemdList gotoPlayList={gotoPlayList} {...value} key={value.id} />
        ))}
      </div>
      <div className={styles.list}>
        {remd.slice(3, 6).map((value) => (
          <RemdList gotoPlayList={gotoPlayList} {...value} key={value.id} />
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

export default connect(
  (state) => ({
    newSong: state.newSong,
    remd: state.remd,
    playList: state.playList,
  }),
  { getPlaylist },
)(Home);
