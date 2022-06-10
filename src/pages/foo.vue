<script setup lang="ts">
import { TheImageProxy } from '../composables/image'

let size = $(useStorage('size', 100))

function enlarge() {
  size += 20
}
function reset() {
  size = 100
}
</script>

<template>
  <div flex="~ col" items-center>
    <div flex="~ gap-2">
      <button btn @click="enlarge()">
        Enlarge
      </button>
      <button btn @click="reset()">
        Reset
      </button>
    </div>
    <div m10 flex="~ col sm:row gap-4" items-center>
      <TheImageProxy :style="{ width: size + 'px', height: size + 'px' }" rounded="1/2" />
      <p flex-1>就开始锻炼付军军军军就开始锻炼付军军军军就开始锻炼付军军军军就开始锻炼付军军军军就开始锻炼付军军军军就开始锻炼付军军军军就开始锻炼付军军军军就开始锻炼付军军军军就开始锻炼付军军军军就开始锻炼付军军军军</p>
    </div>
  </div>
</template>