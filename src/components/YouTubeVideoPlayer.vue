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
@Component({
  props: {
    /* YouTubeのビデオIDをセットするプロパティ */
    ytVideoId: {
      default: ''
    }
  }
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


  /* /////////////////////////////////////////
  ** Watcher
  //////////////////////////////////////////// */
  /**
   * 上のytVideoIdプロパティのウォッチャー
   * 更新時に非表示→表示トランジションを実行するためにwatchする
   */
  @Watch('ytVideoId')
  onYtVideoIdChange (newValue: string, oldValue: string):void {
    //this.videoId = newValue;
    if (newValue !== oldValue) {
      this.isShown = false;
    }
  }


  /* /////////////////////////////////////////
  ** LifeCycles
  //////////////////////////////////////////// */
  /* DOMマウント前に実行されるメソッド */
  public beforeMount () {
    this.videoId = this.$props.ytVideoId;
  }

  /* DOMマウント時メソッド */
  public mounted () {
    /*
    let $container = document.getElementsByClassName('video-container')[0];
    let boxHeight = $container.clientHeight;
    let boxWidth = Math.round(boxHeight * 1.7778);
    $container.style.width = boxWidth + 'px';
    */
  }


  /* /////////////////////////////////////////
  ** 表示・非表示メソッド群（アニメーション）
  //////////////////////////////////////////// */
  /* 要素配置前 */
  protected beforeEnter (el: HTMLElement) {
    console.log('Before Enter');
    el.style.opacity = '0';
  }
  /* 要素配置（表示アニメーション実行） */
  protected enter (el: HTMLElement) {
    console.log('Enter Animation');
    Velocity.animate(el, {
      opacity: [1.0, 0]
    }, {
      duration: 1000,
      easing: 'linear'
    });
  }
  /* 要素非表示（非表示アニメーション実行） */
  protected leave (el: HTMLElement, done: Function) {
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
  protected afterLeave (el: HTMLElement) {
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
  public updateSize (width: number, height: number) {
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