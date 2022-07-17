<script>
    import ColorGradient from "./ColorGradient.svelte";
    export let hsl = {h:0,s:0,l:0};
    let hasMouseDown = false;
</script>

<div class="hsl">
  <!-- H -->
  <div class="color-regulator" on:mouseleave={() => (hasMouseDown = false)}>
    <span>H: </span>
    <ColorGradient total={361} bind:hslNum={hsl.h} let:index>
      <span
        slot="color"
        class="color"
        style="background-color: hsl({index},100%,50%);"
        on:mousedown={() => {
          hasMouseDown = true;
          hsl.h = index;
        }}
        on:mouseup={() => (hasMouseDown = false)}
        on:mousemove={() => {
          if (hasMouseDown) hsl.h = index;
        }}
      />
    </ColorGradient>
  </div>
  <div class="color-regulator" on:mouseleave={() => (hasMouseDown = false)}>
    <span>S: </span>
    <ColorGradient total={101} bind:hslNum={hsl.s} let:index>
      <span
        slot="color"
        class="color"
        style="background-color: hsl({hsl.h},{index}%,50%);"
        on:mousedown={() => {
          hasMouseDown = true;
          hsl.s = index;
        }}
        on:mouseup={() => (hasMouseDown = false)}
        on:mousemove={() => {
          if (hasMouseDown) hsl.s = index;
        }}
      />
    </ColorGradient>
  </div>
  <div class="color-regulator" on:mouseleave={() => (hasMouseDown = false)}>
    <span>L: </span>
    <ColorGradient total={101} bind:hslNum={hsl.l} let:index>
      <span
        slot="color"
        class="color"
        style="background-color: hsl({hsl.h},100%,{index}%);"
        on:mousedown={() => {
          hasMouseDown = true;
          hsl.l = index;
        }}
        on:mouseup={() => (hasMouseDown = false)}
        on:mousemove={() => {
          if (hasMouseDown) hsl.l = index;
        }}
      />
    </ColorGradient>
  </div>
</div>

<style>
  .hsl {
    margin-top: 20px;
  }
  .color-regulator {
    display: flex;
    height: 50px;
    align-items: center;
  }

  .color-regulator span.color {
    flex: 1;
  }

  .color-regulator > span {
    color: rgba(32, 32, 32, 0.8);
    font-size: 16px;
  }

  :global(.jsdesign-dark) .color-regulator > span {
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
  }
</style>
