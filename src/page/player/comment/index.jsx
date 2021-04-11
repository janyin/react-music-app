import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import like from '@/assets/like.svg';

/**
 * 歌曲热门评论组件
 */
function Comment({ data: { username, time, avatarUrl, likedCount, content } }) {
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

Comment.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Comment;
