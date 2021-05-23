import foot from '@/assets/foot.svg';
import React from 'react';
import './index.css';

/**
 * 首页底部
 */
function Footer() {
  return (
    <div className="foot">
      <div className="foot-wrapper">
        <div className="foot-logo">
          <img src={foot} alt="logo" className="logosvg" />
        </div>
        <div className="openapp" onClick={() => window.open('https://github.com/janyin/react-music-app')}>
          如果喜欢可以给个star--&gt;GitHub
        </div>
        <p className="copyright">模仿网站 仅供学习交流</p>
      </div>
    </div>
  );
}

export default Footer;
