<template>
  <div id="app" >
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import Tab from 'components/tab/tab'

export default {
  components:{
    Tab
  }
}
</script>

<style>
  body{
    background: #E9FFFF;
    overflow: scroll;
  }
</style>
