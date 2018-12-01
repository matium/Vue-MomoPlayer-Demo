<template>
  <div id="app">
    <header-component v-bind:app-version="appVersion"></header-component>
    <contents></contents>
    <footer-component>© Keita Watanabe | Matium</footer-component>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import Contents from './components/Contents.vue';
import DeviceType from './utils/DeviceType';
import * as viewportUnitsBuggyfill from 'viewport-units-buggyfill';

@Component({
  components: {
    HeaderComponent,
    FooterComponent,
    Contents
  }
})
export default class App extends Vue {
  // 現在のアプリケーションのバージョン
  public appVersion: string = 'ver.1.0';

  /* インスタンス作成時メソッド */
  public created(): void {
    DeviceType.update();
    if (DeviceType.isSMP) {
      viewportUnitsBuggyfill.init();
    }
  }
}

</script>


<style lang="scss">
@import "default";

body {
  background-color: #000;
  color: #6b6f79;
}

#app {
  @include display-flex;
  @include flex-direction(column);
  @include justify-content(space-between);
  width: 100%;
  height: 100vh;
  background-image: url('assets/images/bg-ribbon.png');
  background-repeat: no-repeat;
  background-size: 110px 110px;
  background-position: left top;

  /**
   * 各コンポーネントの縦方向のレイアウト設定
   */
  /* ヘッダー */
  header {
    height: 15%;
    // @include flex(0 1);
  }

  /* コンテンツエリア */
  .contents {
    @include flex(1 0);
  }

  /* フッター */
  footer {
    height: 2.35em;
    @include flex(0 0 2.5em);
  }

  @include smp {
    background-image: url('assets/images/bg-ribbon_sp.png');
    background-size: 73px 72px;
    background-position: right bottom;

    header {
      height: 32%;
    }
  }
}
</style>
