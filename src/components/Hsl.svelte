<script>
    export let hsl = {h:0,s:0,l:0};
    let hasMouseDown = false;
</script>

<div class="hsl">
  <!-- H -->
  <div class="color-regulator">
    <span>H: </span>
    <div class="color-gradient">
      {#each new Array(360) as _, index}
        <div>
          <span
            class="pointer"
            style="visibility: {index === hsl.h ? 'visible' : 'hidden'};"
          >
            <div class="pointer-content">
              <span class="num">{hsl.h}</span>
              <i class="pointer-down" />
            </div>
          </span>
          <span
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
        </div>
      {/each}
    </div>
  </div>
  <div class="color-regulator">
    <span>S: </span>
    <div class="color-gradient">
      {#each new Array(100) as _, index}
        <div>
          <span
            class="pointer"
            style="visibility: {index === hsl.s ? 'visible' : 'hidden'};"
          >
            <div class="pointer-content">
              <span class="num">{hsl.s}</span>
              <i class="pointer-down" />
            </div>
          </span>
          <span
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
        </div>
      {/each}
    </div>
  </div>
  <div class="color-regulator">
    <span>L: </span>
    <div class="color-gradient">
      {#each new Array(100) as _, index}
        <div>
          <span
            class="pointer"
            style="visibility: {index === hsl.l ? 'visible' : 'hidden'};"
          >
            <div class="pointer-content">
              <span class="num">{hsl.l}</span>
              <i class="pointer-down" />
            </div>
          </span>
          <span
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
        </div>
      {/each}
    </div>
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

  .color-regulator > span {
    color: rgba(32, 32, 32, 0.8);
    font-size: 16px;
  }

  .color-gradient {
    display: flex;
    flex: 1;
    margin-left: 8px;
    height: 22px;
    position: relative;
  }
  .color-gradient > div {
    display: flex;
    flex: 1;
    position: relative;
  }
  .color-gradient span.color {
    flex: 1;
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
