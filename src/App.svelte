<script>
  import Empty from "./components/Empty.svelte";
  import {guiSizeEmpty,guiSize} from "./common/variables";
  import { on, emit } from "./common/events";
  import { updateGuiSize, toast } from "./common/global";
  import { onMount } from "svelte";
  let msg = "Hello World!"
  let hasSelected = false;
  let themes = 'light';


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
  <main id="main">{msg}</main>
{:else}
  <!-- 没有选择任何组件时 -->
  <main id="main">
    <Empty text="请先选择一个图层" {themes} />
  </main>
{/if}

<style>
</style>
