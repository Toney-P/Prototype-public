<template>
  <Header/>
  <!--body-->
  <div class="router_body">
    <router-view/>
  </div>
</template>
<script>
// @ is an alias to /src
import Header from '@/components/naviBar/header.vue'
import store from './store'
import SocketIO from 'socket.io-client'


export default {
  name: 'HomeView',
  components: {
    Header
  },data () {
    return {
      websock:null,
    }
  },
  created(){

  },
  mounted(){
          //创建web socket
      var socket = SocketIO('http://172.19.208.178:3000');
      store.dispatch('saveConnection',socket);
      this.websock = this.$store.state.socketConnection;
      var that = this;
      //create dataset
      store.dispatch('loadBlockChainData');
      store.dispatch('loadUserData');
      store.dispatch('loadLogs');
                                                  // sessionStorage.setItem('BlockChainData',tempBlockChainData)
                                                  //sessionStorage.removeItem('auth');
                                                  //sessionStorage.getItem('auth')
      //app login validation
      this.websock.on('ApploginValida',function(appDe){
          var pass = false;
          var foundData = {};
          var responseMessage = "";
          let data = that.$store.state.BlockChainData;
          if(data.length>0){
            for(let i=0; i<data.length; i++){
              if(data[i].name == appDe.username ){
                if(data[i].Pkeys.Password == appDe.password){
                    pass = true;
                    foundData = data[i];
                    break;
                }else{
                  responseMessage = "The Password is not correct!"
                }
              }else{
                responseMessage = "The UserName is not exist!"
              }
            }
          }else{
            responseMessage = "We don't have any user in the Platform!"

          }

          if(!pass){
            that.websock.emit('ApploginValidaResponse',{statu:400,content:{},message:responseMessage});

          }else{
            responseMessage = "LogIn sucessfully!"
            var response = {
              statu:"200",
              content:foundData,
              message:responseMessage
            }
            that.websock.emit('ApploginValidaResponse',response);

          }
      });
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

body{
  background: rgb(224, 224, 224);
  position: relative;
}
body,html{
  height: 100%;
  margin: 0;
}
.router_body{
  position: relative;
  top:70px;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 0;
height: 100%;  
// height: calc(100% - 90px);
}
</style>
