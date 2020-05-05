import React from "react";
import styles from "../search.module.css";
import PropTypes from "prop-types";

const Trending = (props) => {
  const { hotWord, searchWord } = props;
  return (
    <div className={styles.hot_list}>
      <h3>热门搜索</h3>
      <div className={styles.list}>
        {hotWord.map((value) => (
          <span
            className={styles.hot_word}
            key={value.first}
            onClick={() => searchWord(value.first)}
          >
            <span>{value.first}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

Trending.propTypes = {
  hotWord: PropTypes.array.isRequired,
};

export default Trending;
