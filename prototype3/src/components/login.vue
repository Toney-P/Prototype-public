<template>
   <div style="background:white; height:calc(100% - 20px); margin:0 370px;padding: 5px;">
        <div v-if="!loginValidation" class="loginPage">
            <h5 style="margin: 5px;    font-size: 20px;">User Name</h5>
            <el-input v-model="loginName" size="medium" style="width:270px;    margin-bottom: 20px;"/>
            <p><el-button type="primary" size="large" v-on:click="login" style="font-size: 20px;font-weight: 900;">Log In</el-button></p>
        </div>
      
   </div>
</template>

<script>
import store from './../store'
import { toRaw } from '@vue/reactivity'

export default {
    data() {
        return {
            loginName:'',
            websock:null
        }
    },
    created(){

    },
    mounted() {
        let that = this;
        //Invalid Hive account name: old-cat3
        this.websock = this.$store.state.socketConnection;
        let data = this.$store.state.BlockChainData;

        this.websock.on('ApproveValida',(res)=>{
            that.$notify({
                title:'Success',
                type:'success',
                message: res.message,
                position: 'top-right',
            });
            setTimeout(function(){
                data[res.index].index = res.index;
                // sessionStorage.setItem('UserSession',);
                var uData = data[res.index];
                store.dispatch('setUsersession',uData)
                store.dispatch('loadUserData');
                that.$router.push({path:'/editer'});
            },3000);
        });
        this.websock.on('errorMessagePage',(res)=>{
            that.$notify({
                    title: 'Error',
                type: 'error',
                message: res.message,
                position: 'top-right',
            });
        })
    },
    methods:{
        createGUID: function () {
            var guid = "";
            for (var i = 1; i <= 32; i++) {
                var n = Math.floor(Math.random() * 16.0).toString(16);
                guid += n;
                if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                    guid += "-";
            }
            return guid;
        },
        login:function(){
            var index = 0;
            var exist = false;
            let data = toRaw(this.$store.state.BlockChainData);
            for(let i = 0; i<data.length; i++){
                if(data[i].name == this.loginName){
                    this.loginPass = data[i].Bkeys.Password;
                    index = i;
                    exist = true;
                }
            }
            
            if(exist){
                const detail = {
                    type:"login",
                    username:this.loginName,
                    Bkeys:this.loginPass,//public key,
                    UUID:this.createGUID(),
                    index:index

                }
                this.websock.emit('PageLoginRequest', detail);
            }else{
                var message;
                
                if(this.loginName){
                    message = "Invalid UTSChain account name:" + this.loginName;

                }else{
                    message = "Empty Name!";

                }
                this.$notify({
                    title: 'Error',
                    type: 'error',
                    message: message,
                    position: 'top-right',
                })
            }

        },
        checkSessionExist:function(val){
        let data = this.$store.state.BlockChainData;
        if(data){
            for(let i =0; i<data.length;i++){
                if(data[i].name == val){
                    return false;
                }
            }
            return true;
        }
        return true;
    
        },
        createUser:function(){
            var validation = this.checkSessionExist(this.Name);
            if(validation){
                //解除隐藏
                this.signupProcess = true;
                return true;
            }else{
                //pop up window
                this.$notify({
                    type:'warning',
                    message: "The specified username is not available",
                    position: 'bottom-right',
                })
                return false
            }
        }
    }
}
</script>
<style>
.loginPage{
        display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: center;
}
.el-notification__content p{
    text-align: left;
}
</style>