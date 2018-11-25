<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    @afterLeave="afterLeave"
    :css="false"
  >
    <div class="video-box" v-show="isShown">
      <!-- YouTubeの埋め込みビデオラッパー -->
      <youtube class="yt-video" :video-id="videoId" :player-vars="videoOptions"></youtube>
    </div>
  </transition>
</template>


<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import VueYouTubeEmbed from 'vue-youtube-embed';
import 'velocity-animate';

Vue.use(VueYouTubeEmbed);

/**
 * YouTubeのビデオプレイヤーのコンポーネント
 * [プラグイン]
 * VueYouTubeEmbed：YouTubeの埋め込みプレイヤーを動的に扱うプラグイン
 *
 */
@Component
export default class YouTubeVideoPlayer extends Vue {
  /* YouTubeのビデオID */
  public videoId: string = '';

  // 埋め込みプレイヤーのサイズ
  public width: number = 0;
  public height: number = 0;
  // 埋め込みプレイヤーの再生オプション
  public videoOptions: any = {
    rel: 0,
    showinfo: 0
  };

  /* 表示フラグ */
  public isShown: boolean = true;

  // 設定前の現在のビデオID
  protected currentVideoId: string = '';


  /* /////////////////////////////////////////
  ** Props
  //////////////////////////////////////////// */
  @Prop() private ytVideoId!: string;

  /* /////////////////////////////////////////
  ** Watcher
  //////////////////////////////////////////// */
  /**
   * 上のytVideoIdプロパティのウォッチャー
   * 更新時に非表示→表示トランジションを実行するためにwatchする
   */
  @Watch('ytVideoId')
  protected onYtVideoIdChange(newValue: string, oldValue: string): void {
    // this.videoId = newValue;
    if (newValue !== oldValue) {
      this.isShown = false;
    }
  }


  /* /////////////////////////////////////////
  ** LifeCycles
  //////////////////////////////////////////// */
  /* DOMマウント前に実行されるメソッド */
  protected beforeMount(): void {
    // 初回起動時はytVideoIdプロパティをvideoIdにセットする
    // つまり、プレイヤーのvideo-idバインディングに渡す
    this.videoId = this.ytVideoId;
  }


  /* /////////////////////////////////////////
  ** 表示・非表示メソッド群（アニメーション）
  //////////////////////////////////////////// */
  /* 要素配置前 */
  protected beforeEnter(el: HTMLElement): void {
    console.log('Before Enter');
    el.style.opacity = '0';
  }
  /* 要素配置（表示アニメーション実行） */
  protected enter(el: HTMLElement): void {
    console.log('Enter Animation');
    Velocity.animate(el, {
      opacity: [1.0, 0]
    }, {
      duration: 1000,
      easing: 'linear'
    });
  }
  /* 要素非表示（非表示アニメーション実行） */
  protected leave(el: HTMLElement, done: () => void): void {
    console.log('Leave Animation');
    Velocity.animate(el, {
      opacity: [0, 1.0]
    }, {
      duration: 1000,
      easing: 'linear',
      complete: (target) => {
        console.log(target);
        done();
      }
    });
  }
  /* 要素非表示時はビデオIDをセットして再表示 */
  protected afterLeave(el: HTMLElement): void {
    console.log('After Leave');
    this.videoId = this.$props.ytVideoId;
    this.isShown = true;
  }


  /* /////////////////////////////////////////
  ** Methods
  //////////////////////////////////////////// */
  /**
   * ビデオプレイヤーのサイズをアップデートする
   * @param width プレイヤーの幅
   * @param height プレイヤーの高さ
   */
  public updateSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    // ルート要素の.video-boxのサイズ設定
    this.$el.style.width = this.width + 'px';
  }
}
</script>


<style lang="scss">
.video-transition-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.video-box {
  position: relative;
  width: 800px;
  margin: 0 auto 0 auto;
}

.yt-video {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 56.25%;
  /*
  width: 100%;
  height: 100%;
  */

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid $videoBorderColor;
  }
}
</style>