const defaultState = {
  newSong: [], // 最新音乐
  remd: [], // 推荐歌单
  rank: [], // 排行榜歌曲
  hotWord: [], // 搜索热词
  searchResult: [], // 搜索结果
  playList: {}, // 推荐歌单详情
  curWord: '', // 当前搜索输入值
  curMusic: {}, // 当前播放音乐信息
  playerStatus: false, // 播放状态
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_HOMEDATA': {
      return {
        ...state,
        ...action.result,
      };
    }
    case 'SET_RANKDATA': {
      return {
        ...state,
        rank: action.result,
      };
    }
    case 'SET_HOTWORD': {
      return {
        ...state,
        hotWord: action.result,
      };
    }
    case 'SET_PLAYLIST': {
      return {
        ...state,
        playList: action.result,
      };
    }
    case 'GET_SEARCHSONG': {
      return {
        ...state,
        searchResult: action.result,
      };
    }
    case 'SET_CURWORD': {
      return {
        ...state,
        curWord: action.curWord,
      };
    }
    case 'CLEAR_SEARCH': {
      return {
        ...state,
        searchResult: [],
        curWord: '',
      };
    }
    case 'SET_MUSICINFO': {
      return {
        ...state,
        curMusic: action.result,
      };
    }
    case 'SET_PLAYERSTATUS': {
      return {
        ...state,
        playerStatus: action.status,
      };
    }
    default: {
      return state;
    }
  }
}
