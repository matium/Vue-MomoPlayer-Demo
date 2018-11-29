import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videos: [
      {
        index: 0,
        videoId: 'fuCzjM1gAuM'
      }
    ],
    currentVideoIndex: 0,
    currentVideoId: 'fuCzjM1gAuM',
    isNextVideo: true,
    isPrevVideo: false,
    // YouTube API KEY
    ytApiKey: 'AIzaSyBWLYMMmxhIcc_gIUbC7AOmojTLIuYQJIk',
    // YouTube PlayListId
    ytPlaylistId: 'PLuFk1iO9RvJVEeO6a3bOmTUwx1jaCdRlh',
    // YouTube Playlist Data
    ytPlaylistData: null,
    isYtLoadError: null
  },
  mutations: {
    // 現在のビデオを更新する
    updateCurrentVideo(state, videoIndex: number) {
      state.currentVideoIndex = videoIndex;
      state.currentVideoId = state.videos[videoIndex].videoId;
      // フラグをアップデート
      const lastIndex = state.videos.length - 1;
      state.isNextVideo = !(state.currentVideoIndex >= lastIndex);
      state.isPrevVideo = (state.currentVideoIndex > 0);
    }
  },
  actions: {
    // 次のビデオへ
    updateNext({ commit, state }) {
      if (state.isNextVideo) {
        const vIndex: number = state.currentVideoIndex + 1;
        commit('updateCurrentVideo', vIndex);
        console.log('Update Next Video');
      }
    },
    // 前のビデオへ
    updatePrev({ commit, state }) {
      if (state.isPrevVideo) {
        const vIndex: number = state.currentVideoIndex - 1;
        commit('updateCurrentVideo', vIndex);
        console.log('Update Previous Video');
      }
    },
    // YouTube APIからプレイリストのデータをロードする
    loadPlaylistData({ commit, state }) {
      const queryUrl: string = 'https://www.googleapis.com/youtube/v3/playlistItems?'
        + 'part=snippet'
        + '&maxResults=20'
        + '&playlistId=' + state.ytPlaylistId
        + '&key=' + state.ytApiKey;
      axios.get(queryUrl)
        .then((response) => {
          state.ytPlaylistData = response.data;
          const items: any[] = state.ytPlaylistData.items;
          const itemAmount: number = items.length;
          const videos: any[] = [];
          for (let i: number = 0; i < itemAmount; i++) {
            const videoData = {
              index: i,
              videoId: items[i].snippet.resourceId.videoId
            };
            videos.push(videoData);
          }
          // console.log(videos);
          state.videos = videos;
        })
        .catch((error) => {
          state.isYtLoadError = error;
        });
    }
  }
});
