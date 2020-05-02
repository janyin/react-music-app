import React, { Component } from "react";
import styles from "./remdlist.module.css";
import PropsType from "prop-types";

export default class RemdList extends Component {
  static propsType = {
    id: PropsType.number,
    play: PropsType.string,
    name: PropsType.string,
    imgUrl: PropsType.string,
  };

  render() {
    const { id, imgUrl, play, name, gotoPlayList } = this.props;

    return (
      <span onClick={() => gotoPlayList(id)} className={styles.remd_li}>
        <div className={styles.list_img}>
          <img src={imgUrl} alt="pic" />
          <span>{play}</span>
        </div>
        <p className={styles.remd_text}>{name}</p>
      </span>
    );
  }
}
