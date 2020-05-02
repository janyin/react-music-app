import React, { Component } from "react";
import styles from "../search.module.css";
import PropTypes from "prop-types";

export default class Trending extends Component {
  static propTypes = {
    hotWord: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div className={styles.hot_list}>
        <h3>热门搜索</h3>
        <div className={styles.list}>
          {this.props.hotWord.map((value) => (
            <span
              className={styles.hot_word}
              key={value.first}
              onClick={() => this.props.searchWord(value.first)}
            >
              <span>{value.first}</span>
            </span>
          ))}
        </div>
      </div>
    );
  }
}
