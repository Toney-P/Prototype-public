<template>
   <div style="background:white; margin:0 370px;padding: 5px;">
       <div v-if="!signupProcess" style="margin:10px 5px;height:100%;">
           <div class="header" style="text-align:center;"><h1 style="margin: 0;">Create a new Hive account for PeakD.com</h1></div>
           <div class="body">
                <el-row style="margin-bottom:20px">
                    <el-col :span="5">
                        <img style="width: 100%;" src="../assets/username.svg"/>
                    </el-col>
                    <el-col :span="19">
                        <h4><span>1.</span> Grab your username</h4>
                        <p style="word-break: break-word;">PeakD uses Hive Blockchain accounts. The Hive Blockchain is a safe, decentralized database where all your data is stored which no company owns. Let us help you get a free Hive account quickly and easily. Each account is identified by an unique name you can use for every application that uses Hive and to send and receive transfers from your wallet.</p>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom:20px">
                    <el-col :span="19">
                        <h4><span>1.</span> Grab your username</h4>
                        <p style="word-break: break-word;">PeakD uses Hive Blockchain accounts. The Hive Blockchain is a safe, decentralized database where all your data is stored which no company owns. Let us help you get a free Hive account quickly and easily. Each account is identified by an unique name you can use for every application that uses Hive and to send and receive transfers from your wallet.</p>
                    </el-col>
                    <el-col :span="5">
                        <img style="width: 85%;" src="../assets/phone.svg"/>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom:20px">
                    <el-col :span="5">
                        <img style="width: 85%;" src="../assets/app.svg"/>
                    </el-col>
                    <el-col :span="19">
                        <h4><span>3.</span> Start using awesome dApps</h4>
                        <p style="word-break: break-word;">Not just PeakD.com... your new Hive account (and keys) can be used on dozens of decentralized applications/websites (dApps).</p>
                    </el-col>
                </el-row>
                <div class="newName" style="text-align:center;border-top: 1px solid #e0e0e0;">
                    <h4>Start now finding your account name:</h4>
                    <el-input v-model="Name" placeholder="Username" style="width:350px;"></el-input>
                    <p><el-button type="danger" :disabled="checkButton" v-on:click="createUser">Check Account Name</el-button></p>
                </div>
           </div>
       </div>
       <div v-else style="margin:10px 5px;height:100%;">
           <el-steps :active="process" align-center>
                <el-step title="Step 1" description="Choose your account" />
                <el-step title="Step 2" description="Backup your account" />
            </el-steps>
            <div v-if="process == 1">
                <!--推荐人-->
                <p style="text-align: center;">
                    <span v-on:click="referencePerson" style="cursor: pointer;">
                        Edit Referrer
                    </span>
                </p>
                <div v-if="referenceName != ''">
                    <h4 style="text-align:center;">YOUR REFERRER
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="Your referrer will share 3% of your HIVE rewards by default."
                        placement="right-start"
                        style="word-break: break-word;"
                    >
                        <el-icon><b-icon-info-circle-fill /></el-icon>
                    </el-tooltip>
                        
                        </h4>
                    <el-row style="color: white;max-width: 250px;background-color: #4d5053;margin: 0 auto;border-radius: 9px;">
                        <el-col :span="5">
                            <el-icon class="user_active_icon" style="font-size: 36px;text-align: center;padding: 21px;"><b-icon-person-fill /></el-icon>
                        </el-col>
                        <el-col :span="15" style="text-align: center;font-size: 20px;">
                            <h5>{{referenceName}}</h5>
                        </el-col>
                        <el-col :span="4">
                            <el-icon class="user_active_icon" v-on:click="referenceName=''" style="cursor: pointer;font-size: 36px;text-align: center;padding: 21px 0;"><b-icon-x /></el-icon>
                        </el-col>
                    </el-row>
                </div>
                <div style="text-align: center;">
                    <h5 style="margin: 5px;">User Name</h5>
                    <el-input v-model="Name" style="width:200px;"/>
                     <p> <el-checkbox v-model="termsCheck">I agree to the terms of service</el-checkbox></p>

                </div>
            </div>
            <div v-else-if="process == 2">
                <div style="    margin: 45px 0;">
                    <h4 style="text-align: left;width: 400px;margin: 10px auto;">ALMOST THERE!</h4>
                    <p style="margin:0px auto; width:400px">This is your proposed account information.</p>
                    <p style="margin:0px auto; width:400px">After you save this info your account will be created.</p>
                </div>
                <div style="padding:10px;box-shadow: 0px 0px 3px 0px black;width: 450px;margin: 0 auto; ">
                    <div>
                        <p style="margin:5px; font-weight:600;font-size: 14px;">Username:<span style="font-size:12px;">{{Name}}</span></p>
                        <p style="margin:5px; font-weight:600;font-size: 14px;">Password:<span style="font-size:12px;">{{privateKey.Password}}</span></p>
                    </div>
                    <div>
                        <p style="text-align:center; font-weight:900;margin: 5px;"><span>----------------------</span>PRIVATE KEYS<span>----------------------</span></p>
                        <!-- <p style="margin:5px; font-weight:600;font-size: 12px;">Owner: <span>123</span></p> -->
                        <p style="margin:5px; font-weight:600;font-size: 14px;">Active: <span style="font-size:12px;">{{privateKey.Active}}</span></p>
                        <p style="margin:5px; font-weight:600;font-size: 14px;">Posting: <span style="font-size:12px">{{privateKey.Posting}}</span></p>
                    </div>
                </div>
                <div style="width: 600px;margin: 15px auto;text-align: left;background: #ffe382;padding: 20px;">
                    <div style="margin-bottom:40px;">
                        <h3 style="margin:0;">WHY DO I HAVE TO SAVE THIS INFO?</h3>
                        <p style="margin:0;">- Because no one can recover your account if you don't have this info.</p>
                        <p style="margin:0;">- If you loose these keys you will lose your account and any currency in the account.</p>
                        <p style="margin:0;">- These keys are how you will be able to sign in and use sites.</p>
                    </div>
                    <div style="margin-bottom:40px;">
                        <h3 style="margin:0;">SIGNING IN</h3>
                        <p style="margin:0;">After this you are likely going to sign into a website using a login software</p>
                        <p style="margin:0;">- The POSTING KEY can be used for </p>
                        <p style="margin:0;">- The ACTIVE KEY will help you login using </p>
                    </div>
                </div>
                <el-row>
                    <el-col :span="1">
                             <el-checkbox style="    padding: 11px;" v-model="termsCheck">
                        </el-checkbox>
                    </el-col>
                    <el-col :span="23">
                    <p style="word-break: break-word;"> 
                        I (the soon to be owner of @{{Name}}) declare that i understand the requirement
                        of safely these private keys.Meaning I really did save these keys in a safe location that i will be able to find later.</p>
                    </el-col>
                </el-row>
            </div>
            <div style="text-align: right;">
            <el-button :disabled="!termsCheck" v-on:click="nextProcess">{{process == 3? "CREATE" :"CONTINUE"}}</el-button></div>
       </div>
   </div>
</template>

<script>
import store from './../store'

export default {
    data() {
        return {
            Name:'',
            checkButton:true,
            signupProcess:false,//false
            process:1,//1
            referenceName:'',
            termsCheck:false,
            privateKey:{},
            publicKey:{},

        }
    },
    beforeMount(){
       
    },
    created(){
      
    },
    mounted() {
        this.privateKey = {
                "Password":"12UsvkSCdaDdfDFaAS2D2wqSDshduAS8qweTvd13s4FdfsERsRD",
                "Active":"5HueCGU8rMjxEXxiPuD5BDku4MkFqeZyd4dZ1jvhTVqvbTLvyTJ",
                "Posting":"7SaduCGU8rAaSsDcHiPHSDFJ3jshdJ83HNjusdfIFIAEiaseuuU"
        }
        this.publicKey = {
            "Password":"2sjeuxaDdfDFaAS2D2wqSDshduAS8qweTvd13s4FdfsERsRD",
            "Active":"3ASDF12ifdasxEXxiPuD5BDku4MkFqeZyd4dZ1jvhTVqvbTLvyTJ",
            "Posting":"1ksvSDKJncU8rAaSsDcHiPHSDFJ3jshdJ83HNjusdfIFIAEiaseuuU"
        }
            
    },
    watch:{
        Name:function(){
            if(this.Name != ""){
                this.checkButton=false;

            }else{
                this.checkButton=true;

            }
        }
    },
  methods:{
    referencePerson:function(){
        var that = this;
        this.$prompt('Reference Name', 'Enter your Referrer', {
            confirmButtonText: 'SAVE',
            cancelButtonText: 'CLOSE',
            inputErrorMessage: '',
            inputValue: that.referenceName,
            inputValidator: (value)=>{
                if(value){
                    if(value.trim().length < 3){
                        return 'Username should contain at least 3 characters';
                    }
                }
            },
            beforeClose: (action, instance, done)=>{
                if(action == 'confirm'){
                    let value = instance.inputValue
                    new Promise((resolve,reject)=>{
                            const validation = that.checkSessionExist(value);
                            if(!validation){
                                that.referenceName = value;
                                resolve(value);

                            }else{
                                reject('Username doesn\'t exist');

                            }
                        }).then((res)=>{
                            // that.$notify.success({
                            //     desc: '成功',
                            //     message: '',
                            //     duration: 1000
                            // })
                            done()
                        }).catch(err => { 
                            that.$notify({
                                type: 'error',
                                message: err,
                                duration: 2000
                            })
                        })
                    }else{
                        done()
                    }
                }
            })
      },
    nextProcess:function(){
        if(this.process < 2){
            if(this.process == 1){
                if(!this.createUser()){
                    return false
                }
            }
            this.termsCheck = false;
            this.process += 1; 

        }else{
            var randomToken = Math.floor(Math.random() * 100) + 1;
            //创建用户集 //用户集
            var userData = { 
                "authorID":this.createGUID(),
                "name":this.Name,
                "Pkeys":this.privateKey,
                "Bkeys":this.publicKey,
                "referrer":this.referenceName,
                "blogs":[],
                "comments":[],//{blog id and user id}
                "history":[],
                "token":[
                    {name:"UTSBYTS",value:randomToken}, //用于投币奖励
                    {name:"UTS Treasure",value:randomToken},//影响力 UTS Treasure ^ 2 = 平台影响力
                    {name:"UTS Gold", value:randomToken}, // 兑换aud
                ],
                "QV":100, //40票缩减 $2 * 80%（qv）
                // 0.02 / 40 * 100 = 0.05（each 1 100%vote all at once ）
                // 0.0005 / 1 * 100 = 0.05
                // 0.0005 / 0.01 * 100 = 5
                "recovery":20,
                "voteCount":0,
                "votingPower":100
            }

            //保存
            store.dispatch('insertNewUser',userData);
            this.$router.push({path:'/login'});

        }
    },
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

</style>