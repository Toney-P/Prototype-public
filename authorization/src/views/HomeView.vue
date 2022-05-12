<template>
  <!-- 信息区主体 -->
  <div class="home">


  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
<style scoped lang="scss">
.navi_cover_common{
    background: black;
}
.navi_cover_position{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
}
</style>
