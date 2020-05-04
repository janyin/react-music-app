import React, { Component } from "react";
import "./comment.css";
import like from "../../assets/like.svg";

export default class Comment extends Component {
  render() {
    const { username, time, avatarUrl, likedCount, content } = this.props.data;

    return (
      <div className="comment_item">
        <div className="cmt_img">
          <img src={avatarUrl} alt="avatar" />
        </div>
        <div className="cmt_wrap">
          <div className="cmt_header">
            <div className="cmt_info">
              <span className="cmt_username">{username}</span>
              <span className="cmt_time">{time}</span>
            </div>
            <div className="cmt_like">
              <span>{likedCount}</span>
              <i>
                <img src={like} alt="点赞" />
              </i>
            </div>
          </div>
          <div className="cmt_content">
            <span>{content}</span>
          </div>
        </div>
      </div>
    );
  }
}
