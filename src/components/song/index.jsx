import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./song.module.css";
import { withRouter } from "react-router-dom";

class Song extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  gotoPlayer = () => {
    const { data, history } = this.props;
    history.push({ pathname: "/player", query: data });
  };

  render() {
    const {
      title,
      alias,
      artists,
      album,
      rank = false,
      color = false,
    } = this.props.data;

    return (
      <div className={styles.song} onClick={this.gotoPlayer}>
        {rank && (
          <div className={`${styles.song_num} ${color && styles.highlight}`}>
            {rank}
          </div>
        )}
        <div className={styles.song_wrapper}>
          <div className={styles.song_info}>
            <div className={styles.song_title}>
              {title}
              {alias && <span>({alias})</span>}
            </div>
            <div className={styles.song_detail}>
              <i className={styles.sq}></i>
              {artists} - {album}
            </div>
          </div>
          <div className={styles.song_play}>
            <span className={styles.play_icon}></span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Song);
