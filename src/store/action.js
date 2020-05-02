import * as API from "api/config";
import * as PARSE from "utils/apiparse";
import lyricParser from "utils/ircparse";

export const getHomeData = () => {
  return async (dispatch) => {
    try {
      let newSongResponse = await API.getNewSong();
      let remdResponse = await API.getRemd();

      dispatch({
        type: "SETHOMEDATA",
        result: {
          newSong: PARSE.newSong(newSongResponse),
          remd: PARSE.remd(remdResponse),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getRankData = () => {
  return async (dispatch) => {
    try {
      let response = await API.getRank();

      dispatch({
        type: "SETRANKDATA",
        result: PARSE.rank(response),
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getHotWord = () => {
  return async (dispatch) => {
    try {
      let response = await API.getWord();

      dispatch({
        type: "SETHOTWORD",
        result: response.data.result.hots,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPlaylist = (id) => {
  return async (dispatch) => {
    try {
      let response = await API.getPlaylist(id);
      let result = PARSE.playList(response);

      dispatch({
        type: "SETPLAYLIST",
        result,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSearchSong = (word) => {
  return async (dispatch) => {
    try {
      let response = await API.getSearchSong(word);
      let result = PARSE.search(response);

      dispatch({
        type: "GETSEARCHSONG",
        result,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearSearchSong = () => {
  return {
    type: "CLEARSEARCH",
  };
};

export const setCurWord = (word) => {
  return {
    type: "SETCURWORD",
    curWord: word.trim(),
  };
};

export const setCurMusic = (music) => {
  return async (dispatch) => {
    const { id, artists, title } = music;
    let check = await API.checkMusic(id);
    if (check.data.success) {
      let musicUrlData = await API.getMusicUrl(id);
      let musicDetailData = await API.getMusicDetail(id);
      let musicLycicData = await API.getLrc(id);
      const { lyric } = lyricParser(musicLycicData.data);

      let result = {
        id,
        musicUrl: musicUrlData.data.data[0].url,
        imgUrl: musicDetailData.data.songs[0].al.picUrl,
        singer: artists,
        song: title,
        lyric: lyric,
      };

      if (!result.musicUrl) {
        dispatch({
          type: "DISABLEMUSIC",
        });
      }

      dispatch({
        type: "SETMUSICINFO",
        result,
      });
    } else {
      dispatch({
        type: "DISABLEMUSIC",
      });
    }
  };
};

export const setPlayerTime = (time) => {
  const { currentTime, duration } = time;
  const percent = Number(((currentTime / duration) * 100).toFixed(2));
  return {
    type: "SETPLAYERTIME",
    time,
    percent,
  };
};

export const setPlayerStatus = (status) => {
  return {
    type: "SETPLAYERSTATUS",
    status,
  };
};
