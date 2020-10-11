import { get } from './server';

/**
 * 搜索热词
 */
export const getWord = () => get('/search/hot');

/**
 * 搜索歌曲
 */
export const getSearchSong = (word) => get(`/search?keywords=${word}`);

/**
 * 歌曲排行榜
 */
export const getRank = () => get('/playlist/detail?id=3778678');

/**
 * 推荐歌曲列表
 */
export const getRemd = () => get('/personalized');

/**
 * 最新歌曲列表
 */
export const getNewSong = () => get('/personalized/newsong');

/**
 * 音乐播放url
 */
export const getMusicUrl = (id) => get(`/song/url?id=${id}`);

/**
 * 推荐歌单
 */
export const getPlaylist = (id) => get(`/playlist/detail?id=${id}`);

/**
 * 音乐详情
 */
export const getMusicDetail = (id) => get(`/song/detail?ids=${id}`);

/**
 * 检测歌曲是否可播放？（版权/会员限制）
 */
export const checkMusic = (id) => get(`/check/music?id=${id}`);

/**
 * 获取歌曲歌词
 */
export const getLrc = (id) => get(`/lyric?id=${id}`);

/**
 * 获取歌曲热门评论
 */
export const getComment = (id) => get(`/comment/hot?id=${id}&type=0`);
