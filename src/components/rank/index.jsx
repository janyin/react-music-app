import React from 'react';
import Song from '@/components/song/';
import { connect } from 'react-redux';
import styles from './index.module.css';

/**
 * 排行榜页面
 * @author janyin
 */

/**
 * 获取当前时间
 */
function getTime() {
  const d = new Date();
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

function Rank({ rank }) {
  return (
    <div>
      <div className={styles.hot_top}>
        <div className={styles.hot_flex}>
          <div className={styles.hot_icon} />
          <div className={styles.hot_time}>
            更新日期：
            {getTime()}
          </div>
        </div>
      </div>
      <section className={styles.ranklist}>
        {rank.map((value) => (
          <Song data={value} key={value.id} />
        ))}
      </section>
    </div>
  );
}

export default connect((state) => ({
  rank: state.rank,
}))(Rank);
