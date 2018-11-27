<template>
  <ul class="nav-item-list">
    <li class="nav-item" v-for="video in videos" v-bind:key="video.index">
      <dot-button
        v-bind:target-video-index="video.index"
        v-bind:current-video-index="currentVideoIndex"
        v-on:click="onDotButtonClick"
      ></dot-button>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import DotButton from './DotButton';

@Component({
  components: {DotButton},
  computed: mapState([
    'videos',
    'currentVideoIndex'
  ])
})
export default class DotsNav extends Vue {
  /**
   * DotButtonクリック時のイベントハンドラ
   * Stateの表示ビデオ番号を更新する
   * @param videoIndex ボタンに設定されたビデオの番号
   */
  protected onDotButtonClick(videoIndex: number): void {
    if (this.currentVideoIndex !== videoIndex) {
      this.$store.commit('updateCurrentVideo', videoIndex);
    }
  }

}
</script>

<style lang="scss" scoped>
.nav-item-list {
  @include display-flex;
  @include justify-content(center);
  padding-top: 2.5em;

  .nav-item {
    display: block;
    width: 8px;
    height: 8px;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>