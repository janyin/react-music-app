import * as API from "@/api/config";
import * as PARSE from "@/utils/parse";

/**
 * 获取home页面数据
 */
export const getHomeData = () => {
    return async (dispatch) => {
        try {
            const newSongResponse = await API.getNewSong();
            const remdResponse = await API.getRemd();

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

/**
 * 获取rank页面数据
 */
export const getRankData = () => {
    return async (dispatch) => {
        try {
            const response = await API.getRank();

            dispatch({
                type: "SETRANKDATA",
                result: PARSE.rank(response),
            });
        } catch (error) {
            console.log(error);
        }
    };
};

/**
 * 获取搜索热词数据
 */
export const getHotWord = () => {
    return async (dispatch) => {
        try {
            const response = await API.getWord();

            dispatch({
                type: "SETHOTWORD",
                result: response.data.result.hots,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

/**
 * 获取播放歌单详情数据
 * @param {number} id
 */
export const getPlaylist = (id) => {
    return async (dispatch) => {
        try {
            const response = await API.getPlaylist(id);

            dispatch({
                type: "SETPLAYLIST",
                result: PARSE.playList(response),
            });
        } catch (error) {
            console.log(error);
        }
    };
};

/**
 * 获取搜索结果
 */
export const getSearchSong = () => {
    return async (dispatch, getState) => {
        try {
            const word = getState().curWord;
            const response = await API.getSearchSong(word);

            dispatch({
                type: "GETSEARCHSONG",
                result: PARSE.search(response),
            });
        } catch (error) {
            console.log(error);
        }
    };
};

/**
 * 清空搜索结果
 */
export const clearSearchSong = () => {
    return {
        type: "CLEARSEARCH",
    };
};

/**
 * 设置当前搜索框的值
 * @param {String} word 搜索词
 */
export const setCurWord = (word) => ({
    type: "SETCURWORD",
    curWord: word.trim(),
});

/**
 * 获取歌曲播放数据
 * @param {Object} music 歌曲信息
 */
export const setCurMusic = (music) => {
    return async (dispatch) => {
        const { id, artists, title } = music;
        const check = await API.checkMusic(id);
        if (check.data.success) {
            const resData = await Promise.all([
                API.getMusicUrl(id),
                API.getComment(id),
                API.getMusicDetail(id),
            ]);

            const musicUrl = resData[0].data.data[0].url;
            const imgUrl = resData[2].data.songs[0].al.picUrl;

            if (!musicUrl) {
                return "DISABLEMUSIC";
            }
            dispatch({
                type: "SETMUSICINFO",
                result: {
                    id,
                    musicUrl,
                    imgUrl,
                    artists,
                    title,
                    comment: PARSE.comment(resData[1].data.hotComments),
                },
            });
        } else {
            return "DISABLEMUSIC";
        }
        return "success";
    };
};

/**
 * 设置播放状态
 * @param {Boolean}} status 播放状态
 */
export const setPlayerStatus = (status) => {
    return {
        type: "SETPLAYERSTATUS",
        status,
    };
};
