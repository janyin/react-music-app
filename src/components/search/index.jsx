import React, { Component } from "react";
import { SearchBar, Toast } from "antd-mobile";
import Trending from "./trending/index";
import Song from "components/song/index";
import { connect } from "react-redux";
import { getSearchSong, clearSearchSong, setCurWord } from "store/action";

class Search extends Component {
  searchWord = async (val) => {
    const { getSearchSong, setCurWord } = this.props;

    try {
      Toast.loading("正在加载数据...", 100);
      if (!this.props.curWord) {
        setCurWord(val);
      }
      // eslint-disable-next-line
      let res = await getSearchSong(val.trim());
      Toast.hide();
    } catch (error) {
      Toast.hide();
      Toast.offline("网络错误");
      console.log(error);
    }
  };

  clearSearch = () => {
    const { setCurWord, clearSearchSong } = this.props;
    setCurWord("");
    clearSearchSong();
  };

  handleChange = (val) => {
    if (!val.trim()) {
      this.clearSearch();
    } else {
      this.props.setCurWord(val);
    }
  };

  render() {
    const { hotWord, searchResult, curWord } = this.props;

    return (
      <div>
        <div>
          <SearchBar
            placeholder="搜索歌曲、歌手、专辑"
            value={curWord}
            onSubmit={(val) => this.searchWord(val)}
            onChange={(val) => this.handleChange(val)}
            onCancel={this.clearSearch}
          />
        </div>
        {!searchResult.length && (
          <Trending hotWord={hotWord} searchWord={this.searchWord} />
        )}
        {searchResult.map((value) => (
          <Song data={value} key={value.id} />
        ))}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    hotWord: state.hotWord,
    searchResult: state.searchResult,
    curWord: state.curWord,
  }),
  { getSearchSong, clearSearchSong, setCurWord }
)(Search);
