import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';

/**
 * 单个歌曲展示组件
 * @author janyin
 */
function Song({ data }) {
  const { title, alias, artists, album, rank = false, color = false } = data;
  const history = useHistory();

  return (
    <div
      className={styles.song}
      onClick={() => history.push({ pathname: '/player', query: data })}
    >
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
            <i className={styles.sq} />
            {artists} -{album}
          </div>
        </div>
        <div className={styles.song_play}>
          <span className={styles.play_icon} />
        </div>
      </div>
    </div>
  );
}

export default Song;
