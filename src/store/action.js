import * as API from '@/api/config';
import * as PARSE from '@/utils/parse';

/**
 * Home页面的数据请求
 * @author janyin
 */
export const getHomeData = () => async (dispatch) => {
  const newSongResponse = await API.getNewSong();
  const remdResponse = await API.getRemd();
  dispatch({
    type: 'SET_HOMEDATA',
    result: {
      newSong: PARSE.newSong(newSongResponse),
      remd: PARSE.remd(remdResponse),
    },
  });
};

/**
 * Rank页面的数据请求
 */
export const getRankData = () => async (dispatch) => {
  const response = await API.getRank();
  dispatch({
    type: 'SET_RANKDATA',
    result: PARSE.rank(response),
  });
};

/**
 * 搜索热词的数据请求
 */
export const getHotWord = () => async (dispatch) => {
  const response = await API.getWord();
  dispatch({
    type: 'SET_HOTWORD',
    result: response.result.hots,
  });
};

/**
 * 获取播放歌单详情数据
 * @param {number} id
 */
export const getPlaylist = (id) => async (dispatch) => {
  const response = await API.getPlaylist(id);
  dispatch({
    type: 'SET_PLAYLIST',
    result: PARSE.playList(response),
  });
};

/**
 * 获取搜索结果
 */
export const getSearchSong = () => async (dispatch, getState) => {
  const word = getState().curWord;
  const response = await API.getSearchSong(word);
  dispatch({
    type: 'GET_SEARCHSONG',
    result: PARSE.search(response),
  });
};

/**
 * 清空搜索结果
 */
export const clearSearchSong = () => ({
  type: 'CLEAR_SEARCH',
});

/**
 * 设置当前搜索框的值
 * @param {String} word 搜索词
 */
export const setCurWord = (word) => ({
  type: 'SET_CURWORD',
  curWord: word.trim(),
});

/**
 * 获取歌曲播放数据
 * @param {Object} music 歌曲信息
 */
export const setCurMusic = (music) => async (dispatch) => {
  const { id, artists, title } = music;
  const { success } = await API.checkMusic(id);
  if (success) {
    const resData = await Promise.all([
      API.getMusicUrl(id),
      API.getComment(id),
      API.getMusicDetail(id),
    ]);

    const musicUrl = resData[0].data[0].url;
    const imgUrl = resData[2].songs[0].al.picUrl;

    if (!musicUrl) {
      return 'DISABLEMUSIC';
    }
    dispatch({
      type: 'SET_MUSICINFO',
      result: {
        id,
        musicUrl,
        imgUrl,
        artists,
        title,
        comment: PARSE.comment(resData[1].hotComments),
      },
    });
  } else {
    return 'DISABLEMUSIC';
  }
  return 'success';
};

/**
 * 设置播放状态
 * @param {Boolean} status 播放状态
 */
export const setPlayerStatus = (status) => ({
  type: 'SET_PLAYERSTATUS',
  status,
});
