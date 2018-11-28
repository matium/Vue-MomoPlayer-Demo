import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videos: [
      {
        index: 0,
        videoId: 'CNdX3QXBivM'
      },
      {
        index: 1,
        videoId: '_WJ072_N12Y'
      },
      {
        index: 2,
        videoId: 'fuCzjM1gAuM'
      },
      {
        index: 3,
        videoId: 'ESGu10M49Zo'
      },
      {
        index: 4,
        videoId: 'CbJx788qTao'
      }
    ],
    currentVideoIndex: 0,
    currentVideoId: 'CNdX3QXBivM',
    isNextVideo: true,
    isPrevVideo: false
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
    }
  }
});
