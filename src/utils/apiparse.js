export const newSong = (response) => {
  let result = response.data.result.map(function (currentValue) {
    let artistsName = "";
    if (currentValue.song.artists.length >= 2) {
      artistsName =
        currentValue.song.artists[0].name +
        "/" +
        currentValue.song.artists[1].name;
    } else {
      artistsName = currentValue.song.artists[0].name;
    }
    let obj = {
      id: currentValue.id,
      title: currentValue.name,
      artists: artistsName,
      album: currentValue.song.album.name,
    };
    return obj;
  });
  return result;
};

export const rank = (response) => {
  let song = response.data.playlist.tracks.slice(0, 20);
  let rankListData = song.map(function (currentValue, index) {
    let artistsName = "";
    if (currentValue.ar.length >= 2) {
      //最多两个歌手名称
      artistsName = currentValue.ar[0].name + "/" + currentValue.ar[1].name;
    } else {
      artistsName = currentValue.ar[0].name;
    }
    let obj = {
      id: currentValue.id,
      title: currentValue.name,
      alias: currentValue.alia[0],
      artists: artistsName,
      album: currentValue.al.name,
      rank: index + 1,
    };
    if (index <= 2) {
      //前三歌曲加粗
      obj.color = true;
    }
    if (index <= 8) {
      //前9歌曲序号加0
      obj.rank = "0" + obj.rank;
    }
    return obj;
  });
  return rankListData;
};

export const remd = (response) => {
  let result = response.data.result.slice(0, 6).map((currentValue) => {
    let obj = {
      id: currentValue.id,
      name: currentValue.name,
      imgUrl: currentValue.picUrl,
    };
    let temp = parseInt(currentValue.playCount) + "";
    if (temp.length >= 6) {
      obj.play = temp[0] + temp[1] + "万";
    } else {
      obj.play = temp;
    }
    return obj;
  });
  return result;
};

export const playList = (response) => {
  let song = response.data.playlist.tracks.slice(0, 25);

  let playListSong = song.map(function (currentValue, index) {
    let artistsName = "";
    if (currentValue.ar.length >= 2) {
      artistsName = currentValue.ar[0].name + "/" + currentValue.ar[1].name;
    } else {
      artistsName = currentValue.ar[0].name;
    }
    return {
      id: currentValue.id,
      title: currentValue.name,
      alias: currentValue.alia[0],
      artists: artistsName,
      album: currentValue.al.name,
      rank: index + 1,
    };
  });
  return {
    id: response.data.playlist.id,
    tags: response.data.playlist.tags,
    desc: response.data.playlist.description,
    music: playListSong,
    name: response.data.playlist.name,
    imgUrl: response.data.playlist.coverImgUrl,
  };
};

export const search = (response) => {
  let song = response.data.result.songs;
  let searchResultList = song.map(function (currentValue) {
    let artistsName = "";
    if (currentValue.artists.length >= 2) {
      artistsName =
        currentValue.artists[0].name + "/" + currentValue.artists[1].name;
    } else {
      artistsName = currentValue.artists[0].name;
    }
    let obj = {
      id: currentValue.id,
      title: currentValue.name,
      alias: currentValue.alias[0],
      artists: artistsName,
      album: currentValue.album.name,
    };
    return obj;
  });
  return searchResultList;
};

export const comment = (data) => {
  return data.map((item) => ({
    content: item.content,
    likedCount: item.likedCount,
    username: item.user.nickname,
    avatarUrl: item.user.avatarUrl,
    time: parseCommentDate(item.time),
  }));
};

function parseCommentDate(time) {
  let date = new Date(Number(time));
  let year = date.getFullYear() === 2020 ? "" : `${date.getFullYear()}年`;
  return `${year}${date.getMonth() + 1}月${date.getDate()}日`;
}
