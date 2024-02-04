<template>
  <div class="balance">
    <h4>Your Balance</h4>
    <h1 id="balance">Rs. {{ total }}</h1>
  </div>
</template>

<script>
export default {
  name: "balance",
  props: ["total"]
};
</script>

<style>
</style>