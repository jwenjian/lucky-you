<template>
  <a href="#" @click="openUrlInBrowser">{{ this.text }}</a>
</template>

<script>
import { open } from 'tauri/api/window';

export default {
  data() {
    return {}
  },
  props: {
    url: {
      required: true
    },
    text: {
      required: true
    }
  },
  methods: {
    openUrlInBrowser() {
      open(this.url)
    }
  }
}
</script>

<style>

</style>