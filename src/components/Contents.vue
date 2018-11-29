<template>
  <div class="contents">
    <!-- ビデオコンテンツエリア -->
    <div class="video-container">
      <you-tube-video-player ref="videoPlayer"></you-tube-video-player>
    </div>
    <!-- ビデオ選択のナビゲーション -->
    <nav class="video-nav">
      <dots-nav ref="dotsNav"></dots-nav>
    </nav>
    <nav class="prev-next-nav-container">
      <prev-next-nav ref="prevNextNav"></prev-next-nav>
    </nav>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import YouTubeVideoPlayer from './YouTubeVideoPlayer.vue';
import DotsNav from './navigations/DotsNav.vue';
import PrevNextNav from './navigations/PrevNextNav.vue';
import DeviceType from '../utils/DeviceType';

/**
 * ビデオコンテンツのコンポーネント
 * ビデオプレイヤーとビデオ選択ナビゲーションを配置し、コントロールする
 * [使用コンポーネント]
 * YtVideoPlayer：YouTubeのビデオプレイヤーのラッパークラス
 *
 */
@Component({
  components: {
    DotsNav,
    PrevNextNav,
    YouTubeVideoPlayer
  }
})
export default class Contents extends Vue {
  // ビデオサイズ
  public videoW: number = 0;
  public videoH: number = 0;


  // コンポーネントのルート要素
  protected videoContainer: HTMLDivElement;
  protected videoNav: HTMLDivElement;
  // ビデオの最大幅
  protected maxVideoW: number = 0;


  /* インスタンス作成時メソッド */
  public created(): void {
    window.addEventListener('resize', this.resizeVideo);
    this.$store.dispatch('loadPlaylistData');
  }


  /* DOMマウント時メソッド */
  public mounted(): void {
    this.videoContainer = this.$el.children[0] as HTMLDivElement;
    this.videoNav = this.$el.children[1] as HTMLDivElement;
    this.setVideoSize();
  }


  /* リサイズメソッド */
  protected resizeVideo(): void {
    // ビデオサイズの変更
    this.setVideoSize();
  }

  /**
   * ビデオのサイズを設定するメソッド
   */
  protected setVideoSize(): void {
    if (DeviceType.isSMP) { return; }
    // 最大幅を更新する
    this.maxVideoW = Math.round(window.innerWidth * 0.8);
    // 現在のコンテナの高さからビデオの高さと幅を算出する
    const vh: number = this.videoContainer.clientHeight;
    const vw: number = Math.round(vh * 1.77778);
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
    const videoPlayer: YouTubeVideoPlayer = this.$refs.videoPlayer as YouTubeVideoPlayer;
    videoPlayer.updateSize(this.videoW, this.videoH);
    // 前後ナビの配置を更新
    const prevNextNav: PrevNextNav = this.$refs.prevNextNav as PrevNextNav;
    prevNextNav.updatePosition(this.videoW, this.videoH);

    console.log('[Video Size] w:' + this.videoW + '  h:' + this.videoH);
  }
}
</script>


<style lang="scss">
.contents {
  @include display-flex;
  @include flex-direction(column);
  position: relative;
  width: 100%;
  overflow: hidden;

  .video-container {
    position: relative;
    z-index: 0;
    height: 87%;
    @include flex(1 0 87%);
  }

  .video-nav {
    position: relative;
    z-index: 2;
    width: 80%;
    height: 13%;
    min-height: 77px;
    margin: 0 auto 0 auto;
  }

  .prev-next-nav-container {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
  }

  @include smp {
    .video-container {
      height: auto;
      padding-top: 56.25%;
      @include flex(0 0);
    }

    .video-nav {
      margin-top: 3em;
      height: 25px;
      padding: 0 15px;
      min-height: auto;
    }

    .prev-next-nav-container {
      position: relative;
      width: 100%;
      margin-top: -34px;
    }
  }
}
</style>