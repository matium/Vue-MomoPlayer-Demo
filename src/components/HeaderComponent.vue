<template>
  <header>
    <div class="app-title">
      <h1><span class="subtitle-bold">Momo</span><span class="subtitle-thin">Player</span></h1>
      <p class="version">{{ appVersion }}</p>
    </div>
    <a class="github-link-button" :href="sourceCodeLinkUrl" target="_blank">
      <div class="label">
        <span class="img-github"><img src="../assets/images/github-icon.svg" alt="github-link-icon"></span>
        <span class="label-text">Source Code</span>
      </div>
      <div class="link-arrow">
        <svg class="link-arrow-img" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 29.99 47.981">
          <polygon class="st0" points="5.189,0 0,5.019 19.613,23.99 0,42.962 5.189,47.981 29.99,23.99 "/>
        </svg>
      </div>
    </a>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HeaderComponent extends Vue {
  @Prop() private appVersion!: string;

  protected sourceCodeLinkUrl: string = 'https://github.com/matium/Vue-MomoPlayer-Demo/';
}
</script>

<style lang="scss" scoped>
header {
  @include display-flex;
  @include flex-direction(column);
  @include justify-content(center);
  width: 100%;

  .app-title {
    padding-top: 0.5em;
    color: $titleColor;
    @include enFont('bold');
  }

  h1 {
    text-align: center;
    margin: 0 auto 0 auto;
    font-size: 26pt;

    .subtitle-bold {
      margin-right: 0.085em;
    }

    .subtitle-thin {
      @include enFont('light');
    }

    @include smp {
      font-size: 23pt;
    }
  }

  .version {
    text-align: center;
    margin: 0 auto 0 auto;
    font-size: 11pt;

    @include smp {
      font-size: 11.5pt;
    }
  }

  .github-link-button {
    display: block;
    position: absolute;
    top: 1em;
    right: 0.75em;
    background-color: $negativeButtonColor;
    color: #fff;
    width: auto;
    height: 36px;
    @include borderRadius(18px);
    overflow: hidden;
    text-decoration: none;
    @include transition(all 0.15s ceaser($ease-out));

    .label {
      position: relative;
      @include display-flex;
      @include justify-content(center);
      @include align-items(center);
      z-index: 0;
      padding: 0 0.9em 0 0.8em;
      height: 100%;
      @include transition(all 0.15s ceaser($ease-out));

      .img-github {
        display: block;
        width: 20px;
        height: 20px;
        margin-right: 0.6em;

        img {
          display: block;
          width: 100%;
        }
      }

      .label-text {
        display: block;
        @include enFont('regular');
        font-size: 11pt;
      }
    }

    .link-arrow {
      position: absolute;
      top: 12px;
      right: 1.8em;
      z-index: 1;
      width: 8px;
      height: 12px;
      @include opacity(0);
      @include transition(all 0.15s ceaser($ease-out));

      .link-arrow-img {
        display: block;
        width: 100%;
        height: 100%;
        fill: #fff;
      }
    }

    @include smp {
      width: 39px;
      height: 39px;

      .label {
        width: 100%;
        padding: 0;

        .img-github {
          position: absolute;
          top: 10px;
          left: 10px;
          width: 19px;
          height: 19px;
        }

        .label-text {
          display: none;
        }
      }

      .link-arrow {
        display: none;
      }
    }

    @include desktop {
      &:hover {
        // @include scale(1.05);
        background-color: $brandRed;

        .label {
          padding-right: 2.2em;
        }

        .link-arrow {
          @include opacity(1);
          right: 0.9em;
        }
      }
    }
  }
}
</style>