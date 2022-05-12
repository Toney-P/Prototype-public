<template>
  <!-- <Header/> -->
  <!--body-->
  <div class="router_body">
    <router-view/>
  </div>
</template>
<script>
// @ is an alias to /src
import Header from '@/components/naviBar/header.vue'

export default {
  name: 'HomeView',
  components: {
    Header
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  height: 100%;
}

body{
  background: rgb(224, 224, 224);
  // position: relative;
}
body,html{
  height: 100%;
  margin: 0;
}
.router_body{
  //     position: absolute;
  // top:70px;
  // left: 0;
  // right: 0;
  // bottom: 0;
  // padding: 10px 0;
  height:100%;
}
</style>
