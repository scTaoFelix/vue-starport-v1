<script setup lang="ts">
const a = $ref(false)
onMounted(() => {
  console.log('img monted')
})
</script>

<template>
  <div overflow-hidden transition-all @click="a = !a">
    <img v-if="a" object-cover block w-full h-full src="https://images.unsplash.com/photo-1618125214135-83ced9805c7b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=512&ixid=MnwxfDB8MXxyYW5kb218MHw5NDczNDU2Nnx8fHx8fHwxNjQ4OTMyNDcw&ixlib=rb-1.2.1&q=80&w=512" alt="">
    <img v-else object-cover block w-full h-full src="https://images.unsplash.com/photo-1620315808304-66597517f188?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=512&ixid=MnwxfDB8MXxyYW5kb218MHw5NDczNDU2Nnx8fHx8fHwxNjQ4OTMyNTE4&ixlib=rb-1.2.1&q=80&w=512" alt="">
  </div>
</template>
