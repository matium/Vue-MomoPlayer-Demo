<template>
  <ul class="nav-item-list">
    <li class="nav-item-prev" ref="prevItem">
      <arrow-button v-on:click="onPrevClick" v-bind:enabled="isPrevVideo">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 26 26" xml:space="preserve">
          <path d="M13,3c5.523,0,10,4.477,10,10c0,5.523-4.477,10-10,10C7.477,23,3,18.523,3,13C3,7.477,7.477,3,13,3 M13,0 C5.832,0,0,5.832,0,13c0,7.168,5.832,13,13,13c7.168,0,13-5.832,13-13C26,5.832,20.168,0,13,0L13,0z"/>
          <polygon class="st0" points="12,13 16.5,8 13,8 8,13 13,18 16.5,18 "/>
        </svg>
      </arrow-button>
    </li>
    <li class="nav-item-next" ref="nextItem">
      <arrow-button v-on:click="onNextClick" v-bind:enabled="isNextVideo">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 26 26" xml:space="preserve">
          <path d="M13,3c5.523,0,10,4.477,10,10c0,5.523-4.477,10-10,10C7.477,23,3,18.523,3,13C3,7.477,7.477,3,13,3 M13,0	C5.832,0,0,5.832,0,13c0,7.168,5.832,13,13,13c7.168,0,13-5.832,13-13C26,5.832,20.168,0,13,0L13,0z"/>
          <polygon class="st0" points="14,13 9.5,8 13,8 18,13 13,18 9.5,18 "/>
        </svg>
      </arrow-button>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import ArrowButton from './ArrowButton';

@Component({
  components: {ArrowButton},
  computed: mapState([
    'isNextVideo',
    'isPrevVideo'
  ])
})
export default class PrevNextNav extends Vue {

  protected spaceWidth: number;
  protected itemHeight: number;

  /**
   * 配置の更新をするメソッド
   * @param contentsSpaceWidth  想定されるビデオコンテンツの幅
   * @param contentsSpaceHeight 想定されるビデオコンテンツの高さ
   */
  public updatePosition(contentsSpaceWidth: number, contentsSpaceHeight: number): void {
    this.spaceWidth = contentsSpaceWidth;
    this.itemHeight = contentsSpaceHeight;
    const itemWidth: number = Math.round((this.$el.clientWidth - this.spaceWidth) / 2);
    const prevItem: HTMLLIElement = this.$el.children[0] as HTMLLIElement;
    const nextItem: HTMLLIElement = this.$el.children[1] as HTMLLIElement;
    prevItem.style.width = nextItem.style.width = itemWidth + 'px';
    prevItem.style.height = nextItem.style.height = this.itemHeight + 'px';
  }

  /**
   * 前のビデオへボタンをクリック
   */
  protected onPrevClick():void {
    this.$store.dispatch('updatePrev');
  }

  /**
   * 次のビデオへボタンをクリック
   */
  protected onNextClick():void {
    this.$store.dispatch('updateNext');
  }
}
</script>

<style lang="scss" scoped>
.nav-item-list {
  position: absolute;
  width: 100%;

  li {
    @include display-flex;
    @include justify-content(center);
    @include align-items(center);
    width: 10%;
    height: 100%;
    position: absolute;
    top: 0;

    &.nav-item-prev {
      left: 0;
    }

    &.nav-item-next {
      right: 0;
    }
  }
}
</style>