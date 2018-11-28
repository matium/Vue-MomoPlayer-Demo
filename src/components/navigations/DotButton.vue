<template>
  <a class="dot-button" href="javascript:void(0);" @click="emitButtonClick" v-bind:class="{ current: targetVideoIndex === currentVideoIndex }"></a>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component
export default class DotButton extends Vue {
  /**
   * ボタンにセットされているビデオID
   */
  @Prop() private targetVideoIndex!: string;
  /**
   * 現在表示させているビデオのID
   */
  @Prop() private currentVideoIndex!: string;

  /**
   * ボタンのクリック時イベント
   */
  protected emitButtonClick(): void {
    this.$emit('click', this.targetVideoIndex);
  }
}
</script>

<style lang="scss" scoped>
.dot-button {
  display: block;
  width: 100%;
  height: 100%;
  background-color: $negativeButtonColor;
  @include borderRadius(50%);

  &.current {
    cursor: default;
    background-color: $brandRed;

    @include desktop {
      &:hover {
        background-color: $brandRed;
        @include scale(1.0);
      }
    }
  }

  @include desktop {
    @include transition(all 0.2s ceaser($easeOutQuart));
    &:hover {
      background-color: #fff;
      @include scale(1.6);
    }
  }
}
</style>