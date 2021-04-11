import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

/**
 * 搜索热词
 * @author janyin
 */
function Trending({ hotWord, searchWord }) {
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
}

Trending.propTypes = {
  hotWord: PropTypes.array.isRequired,
};

export default Trending;
