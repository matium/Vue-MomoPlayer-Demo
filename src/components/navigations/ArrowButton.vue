<template>
  <a class="arrow-button" href="javascript:void(0);" @click="emitButtonClick" v-bind:class="{ disabled: !enabled }">
    <slot>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 26 26" xml:space="preserve">
        <path d="M13,3c5.523,0,10,4.477,10,10c0,5.523-4.477,10-10,10C7.477,23,3,18.523,3,13C3,7.477,7.477,3,13,3 M13,0 C5.832,0,0,5.832,0,13c0,7.168,5.832,13,13,13c7.168,0,13-5.832,13-13C26,5.832,20.168,0,13,0L13,0z"/>
        <polygon class="st0" points="12,13 16.5,8 13,8 8,13 13,18 16.5,18 "/>
      </svg>
    </slot>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ArrowButton extends Vue {
  /**
   * ボタンが使用できるかどうか
   */
  @Prop() private enabled!: boolean;

  protected emitButtonClick(): void {
    this.$emit('click');
  }
}
</script>

<style lang="scss" scoped>
.arrow-button {
  display: block;
  width: 26px;
  height: 26px;

  svg {
    display: block;
    width: 100%;
    height: 100%;
    fill: #fff;
  }

  &.disabled {
    cursor: default;
    svg {
      opacity: 0.25;
    }
  }

  @include desktop {
    @include transition(all 0.2s ceaser($easeOutQuart));
    &:hover {
      @include scale(1.2);
      svg {
        fill: $brandRed;
      }

      &.disabled {
        @include scale(1.0);
        svg {
          fill: #fff;
        }
      }
    }
  }
}
</style>