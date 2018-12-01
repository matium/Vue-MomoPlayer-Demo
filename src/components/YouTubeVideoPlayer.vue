<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    @afterLeave="afterLeave"
    :css="false"
  >
    <div class="video-box" v-show="isShown && isLoadedData">
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
    'videos',
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
  /* ビデオデータがロードされているかどうか */
  public isLoadedData: boolean = false;

  /* mapState用プロパティ */
  currentVideoIndex: number;
  currentVideoId: string;


  /* /////////////////////////////////////////
  ** Watcher
  //////////////////////////////////////////// */
  /**
   * 上のytVideoIdプロパティのウォッチャー
   * 更新時に非表示→表示トランジションを実行するためにwatchする
   */
  @Watch('currentVideoIndex')
  protected onYtVideoIndexChange(newValue: number, oldValue: number): void {
    console.log('new: ' + newValue + '  old: ' + oldValue);
    if (newValue !== oldValue) {
      if (newValue > oldValue) {
        // 次のビデオを右から左に出す
        this.slideDirection = 'left';
      }
      else {
        // 次のビデオを左から右に出す
        this.slideDirection = 'right';
      }
      // 非表示アニメーション開始
      this.isShown = false;
    }
  }

  /**
   * ビデオデータが読み込まれるとビデオデータリストが更新されるので
   * ビデオが存在する場合はそこでフラグをtrueに変え、
   * 設定されているビデオIDをプレイヤーに適用する
   */
  @Watch('videos')
  protected onYtVideoIdChange(newValue: any[], oldValue: any[]): void {
    if (!this.isLoadedData) {
      this.isLoadedData = newValue.length > 0;
      this.videoId = this.currentVideoId;
    }
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
    const initTransX: string = this.slideDirection === 'left' ? '20%' : '-20%';
    el.style.transform = 'translateX(' + initTransX + ')';
  }

  /* 要素配置（表示アニメーション実行） */
  protected enter(el: HTMLElement): void {
    // 左右どちらから表示させるかを決める
    const initTransX: string = this.slideDirection === 'left' ? '20%' : '-20%';

    Velocity.animate(el, {
      opacity: [1.0, 0],
      translateX: ['0%', initTransX]
    }, {
      duration: 400,
      easing: 'easeOutQuart'
    });
  }

  /* 要素非表示（非表示アニメーション実行） */
  protected leave(el: HTMLElement, done: () => void): void {
    // 左右どちらへ隠すかを決める
    const hideTransX: string = this.slideDirection === 'left' ? '-20%' : '20%';

    Velocity.animate(el, {
      opacity: [0, 1.0],
      translateX: [hideTransX, '0%']
    }, {
      duration: 300,
      easing: 'easeOutQuart',
      complete: (target) => {
        // 完了メソッドを実行し、afterLeaveライフサイクルへ
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