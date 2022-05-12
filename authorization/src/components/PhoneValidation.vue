<template>
    <div style="background:white; height:100%; " v-loading="loading"
    element-loading-text="Loading..."
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(122, 122, 122, 0.8)"
>
  <el-drawer v-model="accessDialog" direction="btt" size='40%'>
    <template #title>
      <h4>AUTHENTICATE</h4>
    </template>
    <template #default>
      <div>
          <p style="font-weight:900;font-size: 15px;">UUID: <span>{{promission.UUID}}</span></p>
          <p style="margin: 0;">Authenticate using account @{{promission.username}} on webApp</p>
      </div>
    </template>
    <template #footer>
      <div style="text-align: center;">
        <el-button class="approveBtn" round size="large" type="primary" @click="ApproveRequest">Approve</el-button>
      </div>
    </template>
  </el-drawer>
        <!--login-->
        <div v-if="!loginValidation" class="loginPage">
            <h5 style="margin: 5px;    font-size: 20px;">User Name</h5>
            <el-input size="medium" v-model="loginName" style="width:270px;    margin-bottom: 20px;"/>
            <h5 style="margin: 5px;    font-size: 20px;">Password</h5>
            <el-input size="medium" v-model="loginPass" style="width:270px;    margin-bottom: 20px;"/>
            <p><el-button size="large" type="primary" v-on:click="login" style="font-size: 20px;font-weight: 900;">Log In</el-button></p>
        </div>
        <!--personal-->
        <div v-else class="showPage">
            <div class="header_back">
                <el-icon v-on:click="logout" class="user_active_icon" style="float: right;padding: 16px;margin: 1px;font-size: 20px;font-weight: 900;color: white;cursor: pointer;"><b-icon-box-arrow-in-right /></el-icon>
            </div>
            <div>
                <el-row style="color: white;max-width: 90%;background-color: rgb(118 148 177);margin: 25px auto;border-radius: 40px;">
                    <el-col :span="5">
                        <el-icon class="user_active_icon" style="font-size: 36px;text-align: center;padding: 16px;border: 4px solid;border-radius: 100px;margin: 1px;"><b-icon-person-fill /></el-icon>
                    </el-col>
                    <el-col :span="19" style="text-align: left;font-size: 20px;padding: 0 20px;">
                        <h5>@{{personData.name}}</h5>
                    </el-col>
                </el-row>
                <el-tabs stretch="true" style="width:100%; text-align:center;" v-model="tabActive" class="demo-tabs" @tab-click="handleClick">
                    <el-tab-pane label="Token" name="Token">
                        <h3 style="text-align:center;">$<span>{{personData.token[0].value + personData.token[1].value + personData.token[2].value}}</span></h3>
                        <div style="border-radius:10px; border: 3px solid rgb(67 67 67);background: white;width: 300px;margin: 0 auto;    margin-bottom: 35px;min-height: 45px;">
                            <el-icon class="el_icon" style="    color: #126cff; float: left;padding: 12px;font-size: 20px;"><b-icon-spotify /></el-icon>
                            <span style="padding: 15px 0px;display: inline-block;float: left;color: gray;font-size: 13px;">UTSBYTS</span>
                            <span style="padding: 12px 5px;display: inline-block;float: right;color: #126dff;font-weight: 900;"><span style="font-weight: 900;padding: 0 10px;color: black;">$ {{personData.token[0].value}}</span>UTSBYTS</span>
                        </div>
                        <div style="border-radius:10px; border: 3px solid rgb(237 151 41);background: white;width: 300px;margin: 0 auto;    margin-bottom: 35px;min-height: 45px;">
                            <el-icon class="el_icon" style="color:rgb(165 107 36); float: left;padding: 12px;font-size: 20px;"><b-icon-spotify /></el-icon>
                            <span style="padding: 15px 0px;display: inline-block;float: left;color: gray;font-size: 13px;">UTS Treasure</span>
                            <span style="padding: 12px 5px;display: inline-block;float: right;color: rgb(165 107 36);font-weight: 900;"><span style="font-weight: 900;padding: 0 10px;color: black;">$ {{personData.token[1].value}}</span>Treasure</span>
                        </div>
                        <div style="border-radius:10px; border: 3px solid rgb(99 185 53);background: white;width: 300px;margin: 0 auto;    margin-bottom: 35px;min-height: 45px;">
                            <el-icon class="el_icon" style="color:rgb(36 165 99); float: left;padding: 12px;font-size: 20px;"><b-icon-spotify /></el-icon>
                            <span style="padding: 15px 0px;display: inline-block;float: left;color: gray;font-size: 13px;">UTS Gold</span>
                            <span style="padding: 12px 5px;display: inline-block;float: right;color: rgb(36 165 99);font-weight: 900;"><span style="font-weight: 900;padding: 0 10px;color: black;">$ {{personData.token[2].value}}</span>Gold</span>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="History" name="History">
                        <div style="background: #eaeaea;margin: 10px 35px;padding: 10px;border: 1px solid #b4b4b4;border-radius: 10px;" v-for="(item,index) in history" :key="index">
                            <p style="margin: 0;font-size: 15px;font-weight: 900;">{{item.messionId}}</p>
                            <span style="font-size: 13px;font-weight: 600;">{{item.messionDate}}</span>
                            <p style="margin:0;"><span style="font-size: 12px;font-weight: 600; color:gray;">Description: {{item.mession_message}}</span></p>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        
    </div>
</template>

<script>
import vueSocketIo from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import { toRaw } from '@vue/reactivity'

export default {

  data() {
    return {
        websock:null,
        testVal:'',
        tabActive:'Token',
        loginValidation:false,
        loginName:'',
        loginPass:'',
        personData:{},
        loading:false,            
        accessDialog:false,
        promission:{},
        history:[]
    }
  },
    beforeMount(){

    },
    created(){
        var socket = SocketIO('http://172.19.208.178:3000');
        this.websock = socket;
    },
    mounted() {
        var that = this;
        let session = JSON.parse(window.localStorage.getItem("appLoginSession"));
        if(session && session.name){
            that.loginValidation = true;
            that.loading = false;
            that.personData = session;
            that.history = toRaw(session.history); 

        }
        //----------------websoket part
        this.websock.on('author',function(msg){
            console.log(msg)
            that.testVal = msg;
        })

        //app login response
        this.websock.on('ApploginResponse',(res)=>{
            if(res.statu == 200){
                console.log(res.content)
                //计算token\
                var amount = that.amountCount(res.content.token);
                res.content.amountToken = amount;  
                that.loading = true;
                setTimeout(function(){
                    that.loginValidation = true;
                    that.loading = false;
                    that.personData = res.content;
                    //mession empty
                    that.personData.history = [];
                    //save login session
                    window.localStorage.setItem('appLoginSession',JSON.stringify(that.personData));

                },3000)
            }else{
                that.$message({
                    message: res.message,
                    type: 'warning',
                })
            }
        });
        //page login response
        this.websock.on('PageLoginValida',(res)=>{
        
            if(res){
                if(res.username == that.personData.name){
                    that.$message({
                        message: 'Registing account to the Dapps.',
                        type: 'warning'
                    })
                    setTimeout(function(){
                        that.promission = res;
                        that.accessDialog = true;
                    },3000)
                }else{
                    that.websock.emit('sendErrorMessage',{statu:200,content:{},message:"You have to LogIn your wallet first!"});
                }
            }else{
                that.websock.emit('sendErrorMessage',{statu:200,content:{},message:"You have to LogIn your wallet first!"});
            }
        })
        //publish blogs
        this.websock.on('publishVali',function(res){
            that.$message({
                message: 'Registing account to the Dapps.',
                type: 'warning'
            })
            setTimeout(function(){
                that.promission = res;
                that.accessDialog = true;
            },3000)
        });

  },
  methods:{
    amountCount:function(data){
        var amount = 0;
        // if(data.length>0){
        //     for(let i=0; i<data.length; i++){
        //         // amount += data.token[i].value;
        //     }
        // }
        return amount;
    },
    login:function(){
        var that = this;
        const loginDetail = {
            username:this.loginName,
            password:this.loginPass
        }
        this.websock.emit('Applogin',loginDetail);
    },
    logout:function(){
        var that = this;
        this.loading = true;
        setTimeout(function(){
            that.loading = false;
            window.localStorage.setItem('appLoginSession',JSON.stringify({}));
            that.loginValidation = false;
            that.personData = {};
            that.history = [];

        },3000)
    },
    ApproveRequest:function(){
        var that = this;
        var mession_message;
        if(this.promission.type == "login"){
            that.promission.statu = 200;
            this.websock.emit('ApproveResponse',that.promission);
            mession_message = "Dapps Login";
        }
        if(this.promission.type == "publish"){
            that.promission.statu = 200;
            this.websock.emit('PublishResponse',that.promission); 
            mession_message = "The blog publish";

        }
        //存入
        var messionId = this.promission.UUID;
        var messionDate = new Date().toUTCString();
        var obj_data = {
            messionId:messionId,
            messionDate:messionDate,
            mession_message:mession_message
        }
        this.history.push(obj_data);
        this.personData.history = this.history
                            window.localStorage.setItem('appLoginSession',JSON.stringify(that.personData));

        this.accessDialog=false;

    },
    authorization:function(){
        //publish
        //comment
        //web page login
    }


  }, 
  beforeUnmount() {
    console.log("beforeUnmounted!");
  }, 
  unmounted() {
    console.log("unmounted!");
  },

  

}
</script>
<style>
.header_back{
    background-image: url('../assets/phoneApp.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    width: 100%;
    height: 55px;
}
.approveBtn{
    width: 285px;
    font-size: 18px;
    font-weight: 600;
    background: #1ea5e5;
}
.el-drawer__header{
    margin:0;
}
.loginPage{
        display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: center;
}


</style>
