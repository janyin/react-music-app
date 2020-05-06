import React, { Component } from "react";
import { SearchBar, Toast } from "antd-mobile";
import Trending from "./trending/index";
import Song from "components/song/index";
import { connect } from "react-redux";
import { getSearchSong, clearSearchSong, setCurWord } from "store/action";

class Search extends Component {
  searchWord = async (val) => {
    const { getSearchSong, setCurWord, curWord } = this.props;

    try {
      Toast.loading("正在加载数据...", 100);
      if (!curWord) {
        setCurWord(val);
      }
      // eslint-disable-next-line
      const res = await getSearchSong();
      Toast.hide();
    } catch (error) {
      Toast.hide();
      Toast.offline("网络错误");
      console.log(error);
    }
  };

  handleChange = (val) => {
    const { clearSearchSong, setCurWord } = this.props;

    if (!val.trim()) {
      clearSearchSong();
    } else {
      setCurWord(val);
    }
  };

  render() {
    const { hotWord, searchResult, curWord, clearSearchSong } = this.props;

    return (
      <div>
        <div>
          <SearchBar
            placeholder="搜索歌曲、歌手、专辑"
            value={curWord}
            onSubmit={(val) => this.searchWord(val)}
            onChange={(val) => this.handleChange(val)}
            onCancel={clearSearchSong}
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
