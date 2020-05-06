import React from "react";
import styles from "./remdlist.module.css";
import PropTypes from "prop-types";
import { LazyLoadImage } from 'react-lazy-load-image-component';

/**
 * 推荐歌单
 */
const RemdList = (props) => {
  const { id, imgUrl, play, name, gotoPlayList } = props;

  return (
    <span onClick={() => gotoPlayList(id)} className={styles.li}>
      <div className={styles.listimg}>
        <LazyLoadImage src={imgUrl} alt="pic" />
        <span>{play}</span>
      </div>
      <p className={styles.text}>{name}</p>
    </span>
  );
};

RemdList.propTypes = {
  id: PropTypes.number.isRequired,
  play: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
};

export default RemdList;
