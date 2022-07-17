<script>
    export let total = 0;
    export let hslNum = 0;
</script>

<div class="color-gradient">
  {#each new Array(total) as _, index}
    <div>
      <span
        class="pointer"
        style="visibility: {index === parseInt(hslNum) ? 'visible' : 'hidden'};"
      >
        <div class="pointer-content">
          <span class="num">{parseInt(hslNum)}</span>
          <i class="pointer-down" />
        </div>
      </span>
      <slot name="color" {index} />
    </div>
  {/each}
</div>

<style>
  .color-gradient {
    display: flex;
    flex: 1;
    margin-left: 8px;
    height: 22px;
    position: relative;
    cursor: pointer;
  }
  .color-gradient > div {
    display: flex;
    flex: 1;
    position: relative;
  }
  .color-gradient span.pointer {
    position: absolute;
    top: -14px;
    text-align: center;
  }
  .pointer-content {
    position: relative;
  }
  .pointer-content::before {
    position: absolute;
    content: "";
    top: 10px;
    left: -4px;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #cccccc;
  }
  .color-gradient span.pointer .num {
    background-color: #ffffff;
    border: 1px solid #cccccc;
    width: 24px;
    padding: 2px 4px;
    position: absolute;
    text-align: center;
    top: -9px;
    left: -17px;
    color: rgba(32, 32, 32, 0.8);
    font-size: 12px;
    border-radius: 4px;
  }
</style>
