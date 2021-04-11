import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styles from './index.module.css';

/**
 * 推荐歌单
 */
function RemdList(props) {
  const { id, imgUrl, play, name, gotoPlayList } = props;

  return (
    <span onClick={() => gotoPlayList(id)} className={styles.remdli}>
      <div className={styles.listimg}>
        <LazyLoadImage src={imgUrl} alt="pic" />
        <span>{play}</span>
      </div>
      <p className={styles.text}>{name}</p>
    </span>
  );
}

RemdList.propTypes = {
  id: PropTypes.number.isRequired,
  play: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
};

export default RemdList;
