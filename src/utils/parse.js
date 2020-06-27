/**
 * axios请求的数据在这里重新解析为：组件所需的数据格式
 * @author janyin
 * @param {Object} response axios返回的数据
 */

/**
 *
 * 评论时间处理,如果是2020年则不显示年份
 * @param {Number} time 自1970年1月1日00:00:00 UTC（the Unix epoch）以来的毫秒数
 * @returns 返回评论的时间
 */
function parseCommentDate(time) {
  const date = new Date(time);
  const year = date.getFullYear() === 2020 ? '' : `${date.getFullYear()}年`;
  return `${year}${date.getMonth() + 1}月${date.getDate()}日`;
}

/**
 * 一首歌多个歌手的情况
 * @param {Array} artists 歌手数组
 * @returns 返回歌手名字字符串
 */
function getArtists(artists) {
  if (artists.length >= 2) {
    return `${artists[0].name}/${artists[1].name}`;
  }
  return artists[0].name;
}

export const newSong = (response) => response
  .result.map(({ song: { artists, album }, id, name }) => ({
    id,
    title: name,
    artists: getArtists(artists),
    album: album.name,
  }));

export const rank = (response) => response.playlist.tracks
  .slice(0, 20)
  .map(({
    ar, id, name, alia, al,
  }, index) => {
    let color = false;
    // 前三歌曲加粗
    if (index <= 2) color = true;

    // 前9歌曲序号加0
    if (index <= 8) {
      return {
        id,
        title: name,
        alias: alia[0],
        artists: getArtists(ar),
        album: al.name,
        rank: `0${index + 1}`,
        color,
      };
    }

    return {
      id,
      title: name,
      alias: alia[0],
      artists: getArtists(ar),
      album: al.name,
      rank: index + 1,
      color,
    };
  });

export const remd = (response) => response.result.slice(0, 6).map(({
  id, name, picUrl, playCount,
}) => {
  let play = playCount.toString();

  if (play.length >= 6) {
    play = `${play[0] + play[1]}万`;
  }

  return {
    id,
    name,
    imgUrl: picUrl,
    play,
  };
});

export const playList = (response) => {
  const playListSong = response.playlist.tracks
    .slice(0, 25)
    .map((value, index) => {
      let artistsName = '';
      const {
        ar, id, name, alia, al,
      } = value;

      if (ar.length >= 2) {
        artistsName = `${ar[0].name}/${ar[1].name}`;
      } else {
        artistsName = ar[0].name;
      }

      return {
        id,
        title: name,
        alias: alia[0],
        artists: artistsName,
        album: al.name,
        rank: index + 1,
      };
    });

  const {
    id, tags, description, name, coverImgUrl,
  } = response.playlist;

  return {
    id,
    tags,
    desc: description,
    music: playListSong,
    name,
    imgUrl: coverImgUrl,
  };
};

export const search = (response) => response.result.songs.map(({
  artists, id, name, alias, album,
}) => ({
  id,
  title: name,
  alias: alias[0],
  artists: getArtists(artists),
  album: album.name,
}));

export const comment = (data) => data.map(
  ({
    content, likedCount, user: { nickname, avatarUrl }, time,
  }) => ({
    content,
    likedCount,
    username: nickname,
    avatarUrl,
    time: parseCommentDate(time),
  }),
);
