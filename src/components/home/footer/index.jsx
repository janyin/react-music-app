import React from "react";
import foot from "assets/foot.svg";
import "./footer.css";

const Footer = () => {
  return (
    <div className="foot">
      <div className="foot-wrapper">
        <div className="foot-logo">
          <img src={foot} alt="logo" className="logosvg" />
        </div>
        <div className="openapp" onClick={gotoGithub}>
          如果喜欢可以给个star->GitHub
        </div>
        <p className="copyright">模仿网站 仅供学习交流</p>
      </div>
    </div>
  );
};

const gotoGithub = () => {
  window.open("https://github.com/janyin/react-music-app", "_blank");
};

export default Footer;
