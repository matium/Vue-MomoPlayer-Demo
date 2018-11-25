<template>
  <div class="contents">
    <!-- ビデオコンテンツエリア -->
    <div class="video-container">
      <you-tube-video-player ref="videoPlayer" v-bind:yt-video-id="current_video_id"></you-tube-video-player>
    </div>
    <!-- ビデオ選択のナビゲーション -->
    <div class="video-nav"></div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import YouTubeVideoPlayer from './YouTubeVideoPlayer.vue';

/**
 * ビデオコンテンツのコンポーネント
 * ビデオプレイヤーとビデオ選択ナビゲーションを配置し、コントロールする
 * [使用コンポーネント]
 * YtVideoPlayer：YouTubeのビデオプレイヤーのラッパークラス
 *
 */
@Component({
  components: {
    YouTubeVideoPlayer
  }
})
export default class Contents extends Vue {
  // 初期のビデオID
  public init_video_id: string = 'fuCzjM1gAuM';
  // 現在のYTビデオのID
  public current_video_id: string = this.init_video_id;

  // コンポーネントのルート要素
  protected videoContainer: HTMLDivElement;
  protected videoNav: HTMLDivElement;

  // ビデオサイズ
  public videoW: number = 0;
  public videoH: number = 0;
  // ビデオの最大幅
  protected maxVideoW: number = 0;


  /* インスタンス作成時メソッド */
  public created ():void {
    window.addEventListener('resize', this.resizeVideo);
  }


  /* DOMマウント時メソッド */
  public mounted ():void {
    this.videoContainer = <HTMLDivElement>this.$el.children[0];
    this.videoNav = <HTMLDivElement>this.$el.children[1];
    this.setVideoSize();
  }

  /* リサイズメソッド */
  protected resizeVideo ():void {
    // ビデオサイズの変更
    this.setVideoSize();
  }

  /**
   * ビデオのサイズを設定するメソッド
   */
  protected setVideoSize():void {
    // 最大幅を更新する
    this.maxVideoW = Math.round(window.innerWidth * 0.8);
    // 現在のコンテナの高さからビデオの高さと幅を算出する
    let vh: number = this.videoContainer.clientHeight;
    let vw: number = Math.round(vh * 1.77778);
    // 結果、算出したビデオ幅が最大幅よりも大きかった場合は、最大幅からビデオの高さを再算出する
    if (vw <= this.maxVideoW) {
      this.videoH = vh;
      this.videoW = vw;
    }
    else {
      this.videoW = this.maxVideoW;
      this.videoH = Math.round(this.videoW * 0.5625);
    }
    // ビデオコンポーネントのサイズを更新
    let videoPlayer: YouTubeVideoPlayer = <YouTubeVideoPlayer>this.$refs.videoPlayer;
    videoPlayer.updateSize(this.videoW, this.videoH);


    // console.log('[Video Size] w:' + this.videoW + '  h:' + this.videoH);
  }
}
</script>


<style lang="scss">
.contents {
  @include display-flex;
  @include flex-direction(column);
  position: relative;
  width: 100%;

  .video-container {
    position: relative;
    height: 87%;
    @include flex(1 0 87%);
  }

  .video-nav {
    position: relative;
    height: 13%;
    min-height: 77px;
  }
}
</style>