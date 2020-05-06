import React from "react";
import Song from "components/song/index";
import styles from "./rank.module.css";
import { connect } from "react-redux";

const Rank = (props) => {
  const { rank } = props;

  return (
    <div>
      <div className={styles.hot_top}>
        <div className={styles.hot_flex}>
          <div className={styles.hot_icon}></div>
          <div className={styles.hot_time}>更新日期：{getTime()}</div>
        </div>
      </div>
      <section className={styles.ranklist}>
        {rank.map((value) => (
          <Song data={value} key={value.id} />
        ))}
      </section>
    </div>
  );
};

const getTime = () => {
  let d = new Date();
  let month = d.getMonth();
  let day = d.getDate();
  return `${month + 1}月${day}日`;
};

export default connect((state) => ({
  rank: state.rank,
}))(Rank);
