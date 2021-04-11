import React from 'react';
import { SearchBar, Toast } from 'antd-mobile';
import Song from '@/components/song/';
import { connect } from 'react-redux';
import { getSearchSong, clearSearchSong, setCurWord } from '@/store/action';
import Trending from './trending';

/**
 * 搜索页面
 * @author janyin
 */
function Search({
  getSearchSong,
  setCurWord,
  curWord,
  clearSearchSong,
  hotWord,
  searchResult,
}) {
  /**
   * 搜索歌曲处理
   * @param {String} val 搜索词
   */
  async function searchWord(val) {
    Toast.loading('正在加载数据...', 100);
    if (!curWord) {
      setCurWord(val);
    }
    await getSearchSong();
    Toast.hide();
  }

  /**
   * 搜索框值改变处理
   * @param {String} val 搜索框的值
   */
  function handleChange(val) {
    if (!val.trim()) {
      clearSearchSong();
    } else {
      setCurWord(val);
    }
  }
  return (
    <div>
      <div>
        <SearchBar
          placeholder="搜索歌曲、歌手、专辑"
          value={curWord}
          onSubmit={searchWord}
          onChange={handleChange}
          onCancel={clearSearchSong}
        />
      </div>
      {!searchResult.length && (
        <Trending hotWord={hotWord} searchWord={searchWord} />
      )}
      {searchResult.map((value) => (
        <Song data={value} key={value.id} />
      ))}
    </div>
  );
}

export default connect(
  (state) => ({
    hotWord: state.hotWord,
    searchResult: state.searchResult,
    curWord: state.curWord,
  }),
  { getSearchSong, clearSearchSong, setCurWord },
)(Search);
