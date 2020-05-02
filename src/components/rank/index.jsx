import React, { Component } from "react";
import Song from "components/song/index";
import styles from "./rank.module.css";
import { connect } from "react-redux";

class Rank extends Component {
  getTime = () => {
    let d = new Date();
    let month = d.getMonth();
    let day = d.getDate();
    return `${month + 1}月${day}日`;
  };

  render() {
    const { rank } = this.props;

    return (
      <div>
        <div className={styles.hot_top}>
          <div className={styles.hot_flex}>
            <div className={styles.hot_icon}></div>
            <div className={styles.hot_time}>更新日期：{this.getTime()}</div>
          </div>
        </div>
        <section style={{ paddingBottom: "68px" }}>
          {rank.map((value) => (
            <Song data={value} key={value.id} />
          ))}
        </section>
      </div>
    );
  }
}

export default connect((state) => ({
  rank: state.rank,
}))(Rank);
