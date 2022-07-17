<script>
  import Empty from "./components/Empty.svelte";
  import Hsl from "./components/Hsl.svelte";
  import {guiSizeEmpty,guiSize,hsl} from "./common/variables";
  import { on, emit } from "./common/events";
  import { onMount } from "svelte";
  import "./style/button.css";

  let baseHsl = hsl;
  let hasSelected = false;
  let themes = 'light';
  let _hsl = JSON.parse(JSON.stringify(hsl));
  let _fonts = [];

  const resetHandler = ()=>{
    _hsl = JSON.parse(JSON.stringify(baseHsl));
  }

  const applyHandler = ()=>{
    emit('APPLY_COLOR',_hsl)
  }

  // 监听图层选择情况
  on("SELECTION_CHANGED", (hasSelection) => {
    hasSelected = hasSelection;
    if (!hasSelected) {
      emit("CHANGE_GUI_SIZE", guiSizeEmpty);
    } else {
      emit("CHANGE_GUI_SIZE", guiSize);
    }
  });

  // 颜色选择
  on('UPDATE_COLOR', (data)=>{
    let {color,fonts} = data;
    if(fonts) _fonts= fonts;
    if(color) {
      baseHsl = color;
      _hsl = JSON.parse(JSON.stringify(baseHsl));
    }
  })

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
    <!-- 颜色信息 -->
    <div class="color-detail">
      <div
        class="color-palate"
        style="background-color: hsl({_hsl.h},{_hsl.s}%,{_hsl.l}%);"
      >
        {#each _fonts as _text}
          <span
            style="
            font-size:{_text.fontSize};
            color:{_text.color};
            font-family:'{_text.fontFamily.family}';"
          >
            {_text.content}
          </span>
        {/each}
      </div>
    </div>
    <!-- 颜色调节器 -->
    <Hsl bind:hsl={_hsl} />

    <!-- 应用 -->
    <footer>
      <button
        on:click={resetHandler}
        class="btn js-design-master js-design-second-button">重置</button
      >
      <button
        on:click={applyHandler}
        class="btn js-design-master js-design-master-button">应用至画布</button
      >
    </footer>
    <div />
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
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-top: 12px;
    min-height: 22px;
    text-align: center;
  }
  .color-palate span {
    margin: 4px;
    width: 100%;
  }

  footer {
    width: auto;
    display: flex;
    justify-content: flex-end;
  }
  .btn {
    padding: 8px 16px;
    border-radius: 4px;
  }
  .btn:first-child {
    margin-right: 12px;
  }
</style>
