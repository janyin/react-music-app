let defaultState = {
  newSong: [], //最新音乐
  remd: [], //推荐歌单
  rank: [], //排行榜歌曲
  hotWord: [], //搜索热词
  searchResult: [], //搜索结果
  playList: {}, //推荐歌单详情
  curWord: "", //当前搜索输入值
  curMusic: {}, //当前播放音乐信息
  isAvailable: true, //音乐能否播放？
  playerTime: 0, //当前播放时间
  playerStatus: false, //播放状态
  percent: 0, //播放百分比
};

export const musicData = (state = defaultState, action) => {
  switch (action.type) {
    case "SETHOMEDATA": {
      return {
        ...state,
        ...action.result,
      };
    }
    case "SETRANKDATA": {
      return {
        ...state,
        rank: action.result,
      };
    }
    case "SETHOTWORD": {
      return {
        ...state,
        hotWord: action.result,
      };
    }
    case "SETPLAYLIST": {
      return {
        ...state,
        playList: action.result,
      };
    }
    case "GETSEARCHSONG": {
      return {
        ...state,
        searchResult: action.result,
      };
    }
    case "SETCURWORD": {
      return {
        ...state,
        curWord: action.curWord,
      };
    }
    case "CLEARSEARCH": {
      return {
        ...state,
        searchResult: [],
      };
    }
    case "DISABLEMUSIC": {
      return {
        ...state,
        isAvailable: false,
      };
    }
    case "SETMUSICINFO": {
      return {
        ...state,
        curMusic: action.result,
      };
    }
    case "SETPLAYERTIME": {
      return {
        ...state,
        playerTime: action.time,
        percent: action.percent,
      };
    }
    case "SETPLAYERSTATUS": {
      return {
        ...state,
        playerStatus: action.status,
      };
    }
    default: {
      return state;
    }
  }
};
