<script>
  import Empty from "./components/Empty.svelte";
  import Hsl from "./components/Hsl.svelte";
  import {guiSizeEmpty,guiSize,hsl} from "./common/variables";
  import { on, emit } from "./common/events";
  import { updateGuiSize, toast } from "./common/global";
  import { onMount } from "svelte";

  let msg = "Hello World!"
  let hasSelected = false;
  let themes = 'light';
  let _hsl = hsl;

  // 监听图层选择情况
  on("SELECTION_CHANGED", (hasSelection) => {
    hasSelected = hasSelection;
    if (!hasSelected) {
      emit("CHANGE_GUI_SIZE", guiSizeEmpty);
    } else {
      updateGuiSize(guiSize);
    }
  });

  onMount(()=>{
    let node_dark = document.getElementsByClassName('jsdesign-dark');
    if(node_dark.length !== 0) { themes = 'dark'}
  })

  // 监听明暗模式[切换]
  window.addEventListener("message", e => {
    if (e.source === window.parent.parent) {
        if (e.data && e.data.themes) {
            const classesToRemove = []
            // 先移除原本的class
            document.documentElement.classList.forEach(value => {
                if (value.startsWith("jsdesign-")) {
                    classesToRemove.push(value)
                }
            })
            for (const className of classesToRemove) {
                document.documentElement.classList.remove(className)
            }
            themes = e.data.themes;
            // 再添加class
            document.documentElement.classList.add("jsdesign-" + e.data.themes)
        }
    }
  });
</script>

{#if hasSelected}
  <main id="main">
    <!-- 头部信息 -->
    <h1>HSL调节器</h1>
    <!-- 颜色信息 -->
    <div class="color-detail">
      <div
        class="color-palate"
        style="background-color: hsl({_hsl.h},{_hsl.s}%,{_hsl.l}%);"
      >
        <span>文字颜色</span>
        <span>文字颜色</span>
        <span>文字颜色</span>
        <span>文字颜色</span>
        <span>文字颜色</span>
        <span>文字颜色</span>
        <span>文字颜色</span>
      </div>
    </div>
    <!-- 颜色调节器 -->
    <Hsl bind:hsl={_hsl} />
  </main>
{:else}
  <!-- 没有选择任何组件时 -->
  <main id="main">
    <Empty text="请先选择一个图层" {themes} />
  </main>
{/if}

<style>
  main {
    overflow: hidden;
    padding: 0 16px 16px 16px;
  }
  h1 {
    font-size: 12px;
    font-weight: 500;
    color: rgba(32, 32, 32, 1);
  }

  .color-detail {
    display: flex;
    justify-content: space-around;
  }

  .color-detail > div {
    border-radius: 2px;
  }

  .color-palate {
    flex: 1;
    padding: 4px 8px;
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .color-palate span {
    margin: 4px;
  }
</style>
