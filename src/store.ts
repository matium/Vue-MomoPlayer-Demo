import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // ビデオのデータを格納する配列
    videos: [],
    // 現在のビデオ番号
    currentVideoIndex: 0,
    // 現在表示されているビデオのYouTubeのビデオID
    currentVideoId: '',
    // 次のビデオが存在するかどうか
    // つまり表示されているのが最後のビデオかどうか
    isNextVideo: true,
    // 前のビデオが存在するかどうか
    // つまり表示されているのが最初のビデオかどうか
    isPrevVideo: false,
    // YouTube API KEY
    ytApiKey: 'AIzaSyBWLYMMmxhIcc_gIUbC7AOmojTLIuYQJIk',
    // YouTube PlayListId
    ytPlaylistId: 'PLuFk1iO9RvJVEeO6a3bOmTUwx1jaCdRlh',
    // YouTube Playlist Data
    ytPlaylistData: null,
    // APIからデータ取得する際に発生したエラーオブジェクト
    isYtLoadError: null
  },
  mutations: {
    /**
     * 現在のビデオを更新する
     */
    updateCurrentVideo(state, videoIndex: number) {
      // ビデオ番号とYouTubeのビデオIDを更新
      state.currentVideoIndex = videoIndex;
      state.currentVideoId = state.videos[videoIndex].videoId;
      // フラグをアップデート
      const lastIndex = state.videos.length - 1;
      state.isNextVideo = !(state.currentVideoIndex >= lastIndex);
      state.isPrevVideo = (state.currentVideoIndex > 0);
    },
    
    setLoadedPlaylistData(state, payload) {
      console.log('Loaded Playlist Data');
      // 取得したデータを一時保存
      state.ytPlaylistData = payload.data;
      // データから必要な情報だけを使って加工する
      const items: any[] = state.ytPlaylistData.items;
      const itemAmount: number = items.length;
      const videos: any[] = [];
      // すべてのビデオからYouTubeのビデオIDだけを使う
      for (let i: number = 0; i < itemAmount; i++) {
        const videoData = {
          index: i,
          videoId: items[i].snippet.resourceId.videoId
        };
        videos.push(videoData);
      }
      // ステートのビデオデータリストを更新
      state.videos = videos;
      // 表示ビデオを更新
      this.commit('updateCurrentVideo', 0);
    },
    
    errorLoadedPlaylist(state, payload) {
      state.isYtLoadError = payload;
    }
  },
  actions: {
    /**
     * 次のビデオへ
     */
    updateNext({ commit, state }) {
      if (state.isNextVideo) {
        const vIndex: number = state.currentVideoIndex + 1;
        commit('updateCurrentVideo', vIndex);
        console.log('Update Next Video');
      }
    },
    
    /**
     * 前のビデオへ
     */
    updatePrev({ commit, state }) {
      if (state.isPrevVideo) {
        const vIndex: number = state.currentVideoIndex - 1;
        commit('updateCurrentVideo', vIndex);
        console.log('Update Previous Video');
      }
    },
    
    /**
     * YouTube APIからプレイリストのデータをロードする
     */
    loadPlaylistData({ commit, state }) {
      // APIをコールするクエリURLを作成
      const queryUrl: string = 'https://www.googleapis.com/youtube/v3/playlistItems?'
        + 'part=snippet'
        + '&maxResults=20'
        + '&playlistId=' + state.ytPlaylistId
        + '&key=' + state.ytApiKey;
      
      // axiosを使ってAjaxでYouTubeのプレイリストを取得する
      axios.get(queryUrl)
        // 成功時
        .then((response) => {
          commit('setLoadedPlaylistData', response);
        })
        // 失敗時
        .catch((error) => {
          commit('errorLoadedPlaylist', error);
        });
    }
  }
});
