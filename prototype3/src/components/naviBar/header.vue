<template>
  <!--header-->
    <nav class="navi_cover_common navi_cover_position">
        <div class="logo">
            <img alt="Vue logo" src="../../assets/logo.png">
            <span>Social Media</span>
        </div>
        <div class="navi_right">
            <ul class="left">
                <li v-if="UserSession">
                    <a v-on:click="dropDown('feed')">Feed</a>
                    <ul class="dropMenu" v-on:clik.stop v-show="dropDownMenu.feed">
                        <li><router-link to="/feed">Following Feed</router-link></li>
                        <li>Community Feed</li>
                        <li>Favorites Feed</li>
                    </ul>
                </li>
                <li v-if="UserSession">
                    <a v-on:click="dropDown('explore')">Explore</a>
                    <ul class="dropMenu" v-show="dropDownMenu.explore">
                        <li>All Topic</li>
                        <li>Most View Topic</li>
                    </ul>
                </li>
                <li v-if="UserSession">                    
                    <a v-on:click="dropDown('community')">Community</a>
                    <ul class="dropMenu" v-show="dropDownMenu.community">
                        <li>All Community</li>
                    </ul>
                </li>
                <li v-if="UserSession">                    
                    <a class="searchTag"><el-autocomplete
                        v-model="searchVal"
                        :fetch-suggestions="querySearch"
                        clearable
                        class="inline_input"
                        placeholder="Search"
                        @select="handleSelect"
                    >
                        <template #suffix>
                            <el-icon class="el-input__icon" @click="handleIconClick">
                                <search />
                            </el-icon>
                        </template>
                    </el-autocomplete></a>
                </li>
            </ul>
            <ul class="right">
                <li v-if="!UserSession"><router-link to="./login">LogIn</router-link></li>
                <li v-else v-on:click.stop="logout" to=""><a href="#">LogOut</a></li>
                <li><router-link to="./signup">SignUp</router-link></li>
                <li v-if="UserSession">
                   <el-icon class="header_icon"><router-link to="./editer"><edit-pen /></router-link></el-icon>
                </li>
                <li v-if="UserSession">
                    <el-icon class="header_icon"><chat-line-round /></el-icon>                
                </li>
                <li v-if="UserSession">
                    <el-icon class="header_icon bell"><bell /><span class="notification">1</span></el-icon>
                </li>
                <li class="user" v-if="UserSession">
                    <el-icon class="header_icon user_icon"><user /></el-icon>
                    <span class="user_name">@{{userDetail.name}}</span>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import SocketIO from 'socket.io-client'
import store from './../../store'
import { toRaw } from '@vue/reactivity'

export default {
  name: 'header',
  data () {
    return {
      dropDownMenu:{
          feed:false,
          explore:false,
          community:false
      },
      searchVal:'',
      userDetail:null,
      userHeader:false,

    }
  },
  computed:{
      UserSession:function(){
          var data = this.$store.state.UserSession;
        if(data && data != "null"){
            return true;
        }
        return false

      },
      userDetail:function(){
            return toRaw(this.$store.state.UserSession);
      }

  },
  methods:{
      dropDown:function(name){
        if(this.dropDownMenu[name]){
            this.dropDownMenu[name] = false;

        }else{
            this.dropDownMenu[name] = true;

        }
      },
      logout:function(){
        sessionStorage.setItem('UserSession',null);
          that.$router.push({name:'home'});
      }


  },
  created(){

  },
  mounted(){

        this.userDetail = this.$store.state.UserSession;
  },
  watch:{
      userDetail:function(nval){
          if(!nval){
            this.userHeader = true;

          }else{
            this.userHeader = false;

          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navi_cover_common{
    background: white;
    height: 70px;
    padding: 0 !important;
    box-shadow: 0px 0px 6px -2px black;
}
.navi_cover_position{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
        z-index: 5;
}
.logo{
    // position: absolute;
    // left: 0;
    // bottom: 0;
    float: left;
    height:inherit;
    padding: 0 10px;
    background: black;
}
.logo img{
        height: 50px;
    padding: 10px 10px;
}
.logo span{
    position: relative;
    top: -25px;
    font-size: 28px;
    color: white;
}
.body_page{
    height: inherit;
    float: left;
}
.navi_right{
    display: flex;
    flex-direction: row;
}
// .left{
//     width: 60%;
// }
// .right{
//     width: 40%;
// }
.left,.right{
    display: flex;
    flex-direction: row;
    list-style: none;
    margin: 0;
}
.left{
    flex-grow: 1;
}
.left>li>a,.right>li>a{
    font-size: 18px;
    display: inline-block;
    padding: 23px 10px;

}
.dropMenu{
    position: absolute;
    top: 100%;
    padding: 0;
    list-style: none;
    background: white;
    box-shadow: 0px 0px 3px -1px #8b8b8b;
    max-height: min(700px,100vh - 68px);
    width: 250px;
}
.dropMenu li{
    padding: 10px;
    text-align: left;
}
.header_icon{
    padding: 10px;
    margin: 15px 5px;
    font-size: 20px;
}
.user{
        display: flex;
    flex-direction: row;
    cursor: pointer;
}
.user_icon{
    border: 3px solid #6a6a6a;
    border-radius: 100px;
    margin: 12px !important;
}
.user_name{
    display: inline-block;
        padding: 25px 10px 25px 5px;
        
}
.bell{
    position: relative;
}
.notification{
    position: absolute;
    right: 1px;
    top: -1px;
    background: #f14c4c;
    color: white;
    font-size: 13px;
    border-radius: 10px;
    padding: 0px 7px;
    font-weight: 900;

}
.searchTag{
    padding: 19px !important;
}

</style>
