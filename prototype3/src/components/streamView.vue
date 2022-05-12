<template>
  <div v-loading="loading" class="view_controller">
      <!--Top-->
      <div class="top_header">
          <div class="header_pannel">
              <h1>My Following</h1>
              <div class="action_bar">
                    <ul>
                      <li>
                            <el-button type="primary"> 
                                <el-icon class="header_icon"><Filter /></el-icon>
                                <span>Filter</span>
                            </el-button>
                      </li>
                    </ul>
                    <ul>
                        <li>
                            <el-button-group class="ml-4">
                                <el-button type="primary" v-on:click="viewChange('1')"> 
                                    <el-icon class="header_icon"><b-icon-list /></el-icon>
                                </el-button>
                                <el-button type="primary" v-on:click="viewChange('2')"> 
                                    <el-icon class="header_icon"><b-icon-grid-3x3-gap-fill /></el-icon>
                                </el-button>
                                <el-button type="primary" v-on:click="viewChange('3')"> 
                                    <el-icon class="header_icon"><b-icon-justify /></el-icon>
                                </el-button>
                            </el-button-group>
                        </li>
                    </ul>
                    <ul></ul>
              </div>
          </div>
      </div>
      <!--Bottom-->
      <div v-if="type == 1 || type == 3" class="bottom_body">
          <!--flex three part-->
          <div class="flex_left">
                <div class="favoriteTopic board">
                    <h5>Favorite Topic</h5>
                    <ul>
                        <!--绑定用户信息 没有登陆 不显示-->
                        <li v-for="(i,index) in 2" v-bind:key="index">#Topic {{i}}</li>
                    </ul>
                </div>
                <div class="popularCommunicaties board">
                    <h5>PopularCommunicaties</h5>
                    <ul>
                        <!--通用 常显示-->
                        <li v-for="(i,index) in 12" v-bind:key="index">#Communicaties {{i}}</li>
                    </ul>
                </div>
          </div>
          <div class="flex_medium">
              <!--大图样式 111111-->
              <div v-if="type == 1" class="flex_medium_big">
                  <!--数据接入-->
                <div  v-for="(item, key) in communityBlogs" v-bind:key='key' class="blog_container">
                    <div class="blog_one">
                        <div class="top_blog">
                            <!--userdetial-->
                            <div class="user_detail_container">
                                <img src="../assets/logo.png">
                                <!--name-->
                                <div class="user_detail_name">
                                    <span>{{item.authorName}}<i>{{Math.pow(item.user.token[1].value,2)}}</i></span>
                                    <span>{{item.disdate}}</span>
                                </div>
                                <div class="user_link">
                                    <span>{{item.Community ? item.Community : "@" + item.authorName}}</span>
                                </div>
                            </div>
                            <!--blog title-->
                            <div class="blog_title">
                                <h4 v-on:click="navigate(item.blogID,item.blogIndex)">{{item.title}}</h4>
                            </div>
                        </div>
                        <div class="medium_blog" v-if="item.img">
                            <!--图片-->
                            <img src="../assets/web3.png"/>
                        </div>
                        <div class="bottom_blog">
                            <div class="description description_border">
                                <a>{{item.description}}</a>
                            </div>
                            <!--第一层-->
                            <div v-if="!item.giftPannel"  class="footer">
                                <div class="footer_active">
                                    <b-icon-suit-heart-fill class="icon_controll" />
                                    <b-icon-chat-left-fill class="icon_controll" />
                                    <b-icon-share-fill class="icon_controll" />
                                    <!-- <b-icon-three-dots class="icon_controll" /> -->
                                    <!--vote area-->
                                    <div v-if="item.type == 2" style="display: inline-block;">
                                        <span><b-icon-arrow-up-square-fill class="icon_controll" /></span>
                                        <span><b-icon-arrow-down-square-fill class="icon_controll" /></span>
                                    </div>
                                    <div v-if="item.type == 1" style="display: inline-block;">
                                        <span v-on:click="showRewardPannel(key,item.giftPannel)"><b-icon-arrow-up-square-fill class="icon_controll" /></span>
                                    </div>
                                </div>
                                <div class="footer_token">
                                    <p class="token">{{item.tokenVal}}</p>
                                    <el-tooltip placement="top-end">
                                            <template #content> Pennding pay out amount $ {{item.tokenVal}}</template>

                                        <b-icon-spotify class="icon_controll"></b-icon-spotify>
                                    </el-tooltip>
                                </div>
                            </div>
                            <!--第二层-->
                            <div v-else class="footer footer_reward">
                                <div class="reward_top">
                                    <el-button v-on:click="sendVote(item.blogID,item.authorID,key)" type="primary">
                                        <b-icon-suit-heart-fill style="margin-right:5px;"/>
                                        Vote({{voteVal}}%)</el-button>
                                    <el-button v-on:click="showRewardPannel(key,item.giftPannel)">Cancel</el-button>
                                </div>
                                <div class="reward_buttom">
                                    <div style="padding: 5px;">
                                        <el-slider v-model="voteVal" :marks="marks" />
                                    </div>
                                    <p>
                                        You can also send a tip () to the author of this post.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              <!--列表样式 type_three-->
              <div v-else-if="type == 3"  class="flex_medium_big type_three">
                <div v-for="(i,key) in 3" v-bind:key='key' class="blog_container">
                    <div class="blog">
                        <div class="medium_blog_three">
                            <!--图片-->
                            <div class="blog_img">
                                <img src="../assets/web3.png"/>
                            </div>
                            <!--描述-->
                        <div class="top_blog top_blog_no_padding">
                            <!--userdetial-->
                            <div class="user_detail_container">
                                <img src="../assets/logo.png">
                                <!--name-->
                                <div class="user_detail_name_three">
                                    <span>Toney<i>56</i></span>
                                    <span>23 Mins</span>
                                </div>
                                <div class="user_link">
                                    <span>Vue.js 中文社区</span>
                                </div>
                            </div>
                            <!--blog title-->
                            <div class="blog_title"> 
                                <h4>自己画的饼🫓自己吃2</h4>
                            </div>
                            <div class="description no-padding">
                            <a>Web 3.0, also known as the third-generation internet, is the next evolution of the World Wide Web. It provides a data-driven Semantic Web employing a machine-based understanding of data with the objective of developing a more intelligent and connected web experience for users.</a>
                            </div>
                        </div>
                        </div>
                        <div class="bottom_blog">
                            <!--第一层-->
                            <div v-if="!pannelTest" class="footer">
                                <div class="footer_active">
                                    <span v-on:click="showRewardPannel"><b-icon-suit-heart-fill class="icon_controll" /></span>
                                    <b-icon-chat-left-fill class="icon_controll" />
                                    <b-icon-share-fill class="icon_controll" />
                                    <b-icon-three-dots class="icon_controll" />
                                </div>
                  
                                    <div class="footer_token">
                                        <p class="token">141.23</p>
                                        <b-icon-spotify class="icon_controll"></b-icon-spotify>
                                    </div>
                            </div>
                            <!--第二层-->
                            <div v-else class="footer footer_reward">
                                <div class="reward_top">
                                    <el-button type="primary">
                                        <b-icon-suit-heart-fill style="margin-right:5px;"/>
                                        Vote({{voteVal}}%)</el-button>
                                    <el-button v-on:click="pannelTest = false">Cancel</el-button>
                                </div>
                                <div class="reward_buttom">
                                    <div style="padding: 5px;">
                                        <el-slider v-model="voteVal" :marks="marks" />
                                    </div>
                                    <p>
                                        You can also send a tip () to the author of this post.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
          </div>
          <div v-if="type == 1 || type == 3" class="flex_right">
                <div class="favoriteUsers board">
                    <h5>Favorite Users</h5>
                    <ul>
                        <!--通用 常显示-->
                        <li  v-for="i in 5">#Communicaties {{i}}</li>
                    </ul>
                </div>
          </div>
      </div>
      <!--Bottom 2-->
      <div v-else-if="type == 2" class="bottom_body_four">
          <!--flex one part-->
          <div class="flex_medium">
              <!--三图样式-->
              <div>
                <el-row class=" no-margin" :gutter="20">
                    <el-col class="blog_container_four" v-for="(i,index) in 15" v-bind:key=index :span="6">
                        <div class="blog">
                            <div class="top_blog_four">
                                <!--userdetial-->
                                <div class="user_detail_container">
                                    <img src="../assets/logo.png">
                                    <!--name-->
                                    <div class="user_detail_name">
                                        <span>Toney<i>56</i></span>
                                        <span>23 Mins</span>
                                    </div>
                                    <div class="user_link">
                                        <span>Vue.js 中文社区</span>
                                    </div>
                                </div>
                                <!--blog title-->
                                <div class="blog_title">
                                    <h4>自己画的饼🫓自己吃</h4>
                                </div>
                            </div>
                            <div class="medium_blog_four ">
                                <!--图片-->
                                <img src="../assets/web3.png"/>
                            </div>

                        <div class="bottom_blog">
                            <div class="footer">
                                <div class="footer_active">
                                    <b-icon-suit-heart-fill class="icon_controll" />
                                    <b-icon-chat-left-fill class="icon_controll" />
                                    <b-icon-share-fill class="icon_controll" />
                                    <b-icon-three-dots class="icon_controll" />
                                </div>
                                <div class="footer_token">
                                    <p class="token">141.23</p>
                                    <b-icon-spotify class="icon_controll"></b-icon-spotify>
                                </div>
                            </div>
                        </div>
                        </div>
                    </el-col>
        
                </el-row>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import store from './../store'
import { toRaw } from '@vue/reactivity'

export default {
  name: 'streamView',
  data () {
    return {
        type: 1,
        loading:false,
        pannelTest:false,
        voteVal:0,
        marks:{
            0: {
                    style: {
                    color: '#1989FA',
                    },
                    label: '0%',
                },
            10: '10',
            20: '20',
            30: '30',
            40:'40',
            50:{
                    style: {
                    color: '#1989FA',
                    },
                    label: '50%',
                },
            60:'60',
            70:'70',
            80:'80',
            90:'90',
            100:{
                    style: {
                    color: '#1989FA',
                    },
                    label: '100%',
                },
        },
        communityBlogs:[],
        storiesBlogs:[]

    }
  },
  methods:{
      viewChange:function(index){
          this.type = index;
      },
      showRewardPannel:function(index,type){
            this.communityBlogs[index].giftPannel = !type;

      },
      navigate:function(BlogId,BlogIndex){
            this.$router.push({name:'blogview',params: {id:BlogId, index: BlogIndex}});
      },
      sendVote:function(BlogId,authorID,key){
            const userPower = toRaw(this.$store.state.UserSession);//当前登陆用户
            const blogs = toRaw(this.$store.state.Blogs);

            if(authorID != userPower.authorID){
                var curatorsList  = blogs[key].curators;
                if(!curatorsList.includes(userPower.authorID)){
                    const voteVal = this.voteVal;

                    //算法  0.02 (each 1)  * 0.5 * 100 = $1 - 选择的比重
                    var voteRate = 0.02 * (voteVal / 100) * 100;

                    //投票能量占比 ($1) * (50%) (UTS Treasure 影响力消耗值)
                    //参数 能量值想
                    var  dollar = voteRate * (userPower.votingPower / 100);
                    var floatDollar = Math.floor(dollar * 100) / 100;
                    //保存在blog   console.log("$"+dollar);
                    // tokenVal
                    var upvote_num;
                    var index_of_blogs;
                    for(let i =0; i < blogs.length; i++){
                        if(blogs[i].blogID == BlogId){
                            blogs[i].tokenVal += floatDollar;
                            blogs[i].blogVoteCount += 1;
                            index_of_blogs = i;
                            upvote_num = blogs[i].blogVoteCount;
                        }
                    }


                    //投票次数统计, UserSession
                    userPower.voteCount += 1

                    //每40次减20, UserSession
                    //更新回复值 //用户层面
                    if(userPower.voteCount > 40 && userPower.voteCount <= 80){
                        userPower.votingPower - 0.5
                        if(userPower.voteCount == 41){
                            userPower.recovery - 5
                        }

                    }else if(userPower.voteCount >= 80 && userPower.voteCount <= 120){
                        userPower.votingPower - 0.5
                        if(userPower.voteCount == 81){
                            userPower.recovery - 5
                        }

                    }else if(userPower.voteCount >= 120 && userPower.voteCount <= 160){
                        userPower.votingPower - 0.5
                        if(userPower.voteCount == 121){
                            userPower.recovery - 5
                        }

                    }else if(userPower.voteCount >= 160 && userPower.voteCount <= 200){
                        userPower.votingPower - 0.5
                        if(userPower.voteCount == 161){
                            userPower.recovery - 4
                        }

                    }


                    //热度计算 (10-1)^0.8/(30+2)^1.8
                    var date1 = new Date(blogs[index_of_blogs].date);
                    var date2 = new Date();    //结束时间
                    var date3 = date2.getTime() - date1.getTime();

                    //计算出小时数
                    var leave1 = date3 % (24 * 3600 * 1000);
                    var leave2 = leave1 % (3600 * 1000); 
                    var minutes = Math.floor(leave2/(60 * 1000));
                    var popularVal = Math.pow(upvote_num - 1,0.8) / Math.pow(minutes + 2,1.8);
                    blogs[index_of_blogs].popularRate += popularVal;

                    //UserSession 联动更新 blogs 和 blockchain 数据集（旧）
                    blogs[index_of_blogs].curators.push(userPower.authorID)
                    //两部分更新：当前登陆用户信息更新（主要投票数据），blog内的信息更新
                    store.dispatch('votingProcessUpdate',{user:userPower,blogs:blogs});
                    this.pannelTest = false;
                    this.voteVal = 0;
                    this.showRewardPannel(key,true);

                    this.loadPage();
                }else{
                    this.$notify({
                        type:'warning',
                        title:'Warning',
                        message: "You have already voted for this blog!",
                        position: 'top-right',
                    })
                }
            }else{
                this.$notify({
                    type:'warning',
                    title:'Warning',
                    message: "You can't vote for your own blog!",
                    position: 'top-right',
                })
            }
      },
      loadPage:function(){
            var dataSet = toRaw(this.$store.state.Blogs);
            for(let i =0; i<dataSet.length; i++){
                dataSet[i].giftPannel = false;
                for(let y = i+1; y<dataSet.length; y++ ){
                    if(dataSet[i].popularRate < dataSet[y].popularRate){
                        var three = dataSet[i];
                        dataSet[i] = dataSet[y];
                        dataSet[y] = three
                    }
                }
            }
            
            this.communityBlogs = dataSet;
      }

  },
  mounted(){
        var that = this;
            this.loadPage();

 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.top_header{
    margin: 0 70px;
}
.header_pannel{
    position: relative;
    background: white;
    border-bottom: 3px solid rgb(50, 200, 255);
    padding: 5px;

}
.header_pannel h1{
    text-align: center;
}
.action_bar{
    position: absolute;
    right: 0;
    bottom: 0;
    top: 20%;
}
.action_bar ul {
    list-style: none;
    float: left;
}
.action_bar span{
        font-size: 15px;
    font-weight: 500;
}
.action_bar .li{
    padding: 20px;
    display: flex;
    align-items: center;
}
.bottom_body,.bottom_body_four{
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
  
}
.bottom_body_four{
        margin: 10px 70px;

}
.bottom_body{
    margin: 10px auto;
    max-width: 1200px;  
}
.flex_left, .flex_medium_big, .flex_right{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}
.flex_right{
        width: 5%;
}
.flex_right{
        width: 15%;
}
.flex_medium{
        flex-grow: 1;
            width: 80%;
}
.flex_left h5,.flex_right h5{
    text-align: left;
    margin: 0;
    padding: 12px 20px;
    padding-right: 46px;
    border-bottom: 1px solid #bdbdbd;
}
.board{
    background: white;
    margin: 15px 0;
    border-radius: 3px;
    box-shadow: 0px 0px 2px 1px #c4c4c3;
}
ul{
    list-style: none;
}
.board ul{
    margin: 0;
    padding: 10px 0; 
    text-align: left;
}
.board li{
    color: #333;
    padding: 5px 20px;
    font-weight: 500;
    font-size: 13px;
}
.blog_container{
    margin: 15px;

}
.blog_container_four{
    margin:15px 0;
}
.blog_one{
    background: white;
    border-radius: 7px;
    box-shadow: 0px 0px 3px 0px #898989;
}
.blog_title h4{
        margin-top: 10px;
    margin-bottom: 5px;
    word-break: break-word;
}
.user_detail_container{
        display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    // padding: 15px;
    // padding-bottom: 0;
}
.user_detail_container img{
        width: 35px;
border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border: 1px solid #e9e7e7;
}
.user_detail_name_three{
        display: flex;
    align-items: center;
        flex-grow: 1;
    padding-left: 10px;
}

.user_detail_name{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    flex-grow: 1;
    padding-left: 10px;
}
.user_detail_name_three span:not(:first-child){
    padding: 10px;
}
.user_detail_name span:first-child,.user_detail_name_three span:first-child{
        font-weight: 900;
        color: #5c5c5c;
}
.user_detail_name span:last-child,.user_detail_name_three span:last-child{
    font-size: 12px;
    color: #989898;
    font-weight: 600;
} 
.user_detail_name i,.user_detail_name_three i{
    border: 1px solid gray;
    font-size: 12px;
    padding: 2px;
    margin-left: 5px;
    color: #868686;
}
.top_blog{
        padding: 15px;
        padding-bottom: 0;
}
.top_blog_four{
            padding: 10px;
            padding-bottom: 0;

}
.top_blog_no_padding{
    padding: 0 !important;
}
.user_link{
    padding: 7px;
}
.user_link span{
        background: #60609c;
    color: white;
    padding: 5px;
    font-size: 12px;
    font-weight: 900;
}
.medium_blog,.medium_blog_four{
    text-align: center;
    margin-bottom: 10px;
    display: flex;
}
.medium_blog_three{
        padding: 10px;
    display: flex;
    border: 1px solid #ddd;
}
.medium_blog img{
    max-height: 459px;
    width: auto !important;
}
.blog_img{
        align-self: center;
    display: flex;
        margin-right: 10px;
}
.blog_img img{
    min-width: 150px;
    max-height: 110px

}
.medium_blog_four{
    margin-bottom: 0;
        display: flex;

}
.medium_blog_four img{
    max-width: 100%;
}
.description{
    padding-left: 20px;
    padding-right: 20px;

}
.no-padding{
    padding: 0 !important;
}
.no-margin{
    margin: 0 !important;
}
.description_border{
    border-bottom: 1px solid #cecece;
    padding-bottom: 10px;
}
.description a{
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}
.footer{
    padding: 2px 20px;
    display: flex;
}
.icon_controll{
    padding: 0 10px;
    margin: 10px 0;
    margin-bottom: 5px;
}
.footer_active{
    flex-grow: 1;
}
.footer_active svg{
    cursor: pointer;
}
.footer_token{
    display: flex;
}
.footer_reward{
    padding: 10px;
    display: block;
}
.reward_buttom p{
        text-align: center;
    padding-top: 10px;

}
.token{
        margin: 8px 0px;
    font-size: 15px;
    font-weight: bold;
}
.no-margin{
    margin: 0;
}

</style>
