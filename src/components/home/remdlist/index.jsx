import React from "react";
import styles from "./remdlist.module.css";
import PropTypes from "prop-types";

const RemdList = (props) => {
  const { id, imgUrl, play, name, gotoPlayList } = props;

  return (
    <span onClick={() => gotoPlayList(id)} className={styles.remd_li}>
      <div className={styles.list_img}>
        <img src={imgUrl} alt="pic" />
        <span>{play}</span>
      </div>
      <p className={styles.remd_text}>{name}</p>
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
