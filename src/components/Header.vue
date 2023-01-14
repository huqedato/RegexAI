<script setup>

defineProps({
  first: String,
  last: String
});
</script>

<template>
  <h1><span>{{ first }}</span><span>{{ last }}</span></h1>

  <div class="card"></div>
</template>

<style lang="less" scoped>
/*first child of h1*/
h1>span:first-child {
  color: white;
}

/*second child of h1*/
h1>span:nth-child(2) {
  color: #2ed995;
}
</style>
