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
import { mapState } from 'vuex';
import VueYouTubeEmbed from 'vue-youtube-embed';
import 'velocity-animate';

Vue.use(VueYouTubeEmbed);

/**
 * YouTubeのビデオプレイヤーのコンポーネント
 * [プラグイン]
 * VueYouTubeEmbed：YouTubeの埋め込みプレイヤーを動的に扱うプラグイン
 *
 */
@Component({
  computed: mapState([
    'currentVideoIndex',
    'currentVideoId'
  ])
})
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
  /* 表示・非表示でスライドさせる方向 */
  protected slideDirection: string = 'left';


  /* /////////////////////////////////////////
  ** Watcher
  //////////////////////////////////////////// */
  /**
   * 上のytVideoIdプロパティのウォッチャー
   * 更新時に非表示→表示トランジションを実行するためにwatchする
   */
  @Watch('currentVideoIndex')
  protected onYtVideoIdChange(newValue: string, oldValue: string): void {
    // this.videoId = newValue;
    if (newValue !== oldValue) {
      if (newValue > oldValue) {
        // 次のビデオを右から左に出す
        this.slideDirection = 'left';
      }
      else {
        // 次のビデオを左から右に出す
        this.slideDirection = 'right';
      }
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
    this.videoId = this.currentVideoId;
  }


  /* /////////////////////////////////////////
  ** 表示・非表示メソッド群（アニメーション）
  //////////////////////////////////////////// */
  /* 要素配置前 */
  protected beforeEnter(el: HTMLElement): void {
    console.log('Before Enter');
    // 透明度を0に
    el.style.opacity = '0';
    // 初期X位置を設定
    let initTransX: string = this.slideDirection === 'left' ? '20%' : '-20%';
    el.style.transform = 'translateX(' + initTransX + ')';
  }
  /* 要素配置（表示アニメーション実行） */
  protected enter(el: HTMLElement): void {
    console.log('Enter Animation');
    let initTransX: string = this.slideDirection === 'left' ? '20%' : '-20%';
    Velocity(el, {
      opacity: [1.0, 0],
      translateX: ['0%', initTransX]
    }, {
      duration: 400,
      easing: 'easeOutQuart'
    });
  }
  /* 要素非表示（非表示アニメーション実行） */
  protected leave(el: HTMLElement, done: () => void): void {
    console.log('Leave Animation');
    let hideTransX: string = this.slideDirection === 'left' ? '-20%' : '20%';
    Velocity(el, {
      opacity: [0, 1.0],
      translateX: [hideTransX, '0%']
    }, {
      duration: 300,
      easing: 'easeOutQuart',
      complete: (target) => {
        console.log(target);
        done();
      }
    });
  }
  /* 要素非表示時はビデオIDをセットして再表示 */
  protected afterLeave(el: HTMLElement): void {
    console.log('After Leave');
    this.videoId = this.currentVideoId;
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
.video-box {
  position: relative;
  width: 800px;
  margin: 0 auto 0 auto;

  @include smp {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
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

    @include smp {
      border-top: 1px solid $videoBorderColor;
      border-bottom: 1px solid $videoBorderColor;
      border-left: none;
      border-right: none;
    }
  }
}
</style>