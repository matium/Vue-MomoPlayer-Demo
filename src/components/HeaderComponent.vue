<template>
  <header>
    <div class="app-title">
      <h1><span class="subtitle-bold">Momo</span><span class="subtitle-thin">Player</span></h1>
      <p class="version">{{ appVersion }}</p>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HeaderComponent extends Vue {
  @Prop() private appVersion!: string;
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
}
</style>