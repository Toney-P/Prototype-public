<template>
    <div class="blog_container">
    <el-row justify="end" style="height:inherit;">
        <!--blog view-->
        <el-col :span="15">
            <div class="blog">
                <!-- <div style="padding: 0 150px; height:100%;"> -->
                <div class="blog_header">
                    <h2 class="blog_title">{{blog.title == ""?"自己画的饼🫓自己吃":blog.title }}</h2>
                    <p class="blog_count_bar"><span class="comment_number">{{blog.comments.length}}</span> Comments/<span class="reblog_num">{{blog.reblog}}</span> reblogs</p>
                </div>
                <div class="blog_user_detail ">
                    <el-row justify="space-between" style="height:inherit;">
                        <el-col :span="2">
                            <img class="user_img" src="../assets/logo.png"/>
                        </el-col>
                        <el-col :span="18">
                            <div class="user_detail_container">
                                <!--name-->
                                <div class="user_detail_name_three">
                                    <span>{{user.name}}<i>{{Math.pow(user.token[1].value,2)}}</i></span>
                                    <span>{{blog.disdate}}</span>
                                    <p>{{blog.Community ? blog.Community : "@" + blog.authorName+" - User Story"}}</p>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="blog_detail_count">
                                <p><span>{{blog.upvote}}</span> VOTING</p>
                                <p><span>{{blog.count}}</span> WORDS</p>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div v-html="blog.content" class="blog_content" style="word-break: break-all;">
                    
                
                </div>
            </div>
        </el-col>
        <!--fixed personal-->
        <el-col :span="5"><div class="grid-content bg-purple" />
            <div class="user_deatil">
                <div class="top_detail">
                    <h5>{{user.name}}<i> - {{Math.pow(user.token[1].value,2)}}</i></h5>
                    <p class="no-margin">@{{user.name}}</p>
                    <img class="user_img" src="../assets/logo.png"/>
                    <p class="user_introduction">
                    <a>In an essay, article, or book, an introduction is a beginning section which states the purpose and goals of the following writing. This is generally followed by the body and conclusion. </a>
                    </p>
                    <el-button type="primary">Follow
                        <el-icon class="user_active_icon"><b-icon-person-plus-fill /></el-icon>
                    </el-button>
                    <el-button type="primary">List
                        <el-icon class="user_active_icon"><b-icon-plus-lg /></el-icon>
                    </el-button>
                    <!--数据统计-->
                    <div class="user_count">
                        <el-row class="row-bg" justify="space-between">
                            <el-col :span="9">
                                <p class="no-margin">May 12, 2022</p>
                                <span class="no-margin" style="font-size: 13px;">Joined</span> 
                            </el-col>
                            <el-col :span="6">
                                <p class="no-margin">0</p>
                                <span class="no-margin" style="font-size: 13px;">Posts and Comments</span> 
                            </el-col>
                            <el-col :span="6">
                                <p class="no-margin">0</p>
                                <span class="no-margin" style="font-size: 13px;">Followers</span> 
                            </el-col>
                        </el-row>
                    </div>
                    <!--热门帖子-->
                    <div class="recommodation">
                        <h4>Most Posts</h4>
                        <div class="list">
                            <el-row v-for="(item,index) in 3" :key="index">
                                <el-col :span="5"><div class="img_cover"><img src="../assets/logo.png" /></div></el-col>
                                <el-col :span="19">
                                    <h5 style="margin-top: 5px; margin-bottom:0;">{{popuBlogs[item].title}}</h5>
                                    <p style="margin-top:5px; margin-bottom:0;">{{popuBlogs[item].disdate}}</p>
                                </el-col>
                            </el-row>
                            
                        </div>
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
    </div>
</template>

<script>
import { toRaw } from '@vue/reactivity'

export default {
  name: 'blogview',
  data () {
    return {
        title:'',
        content:'',
        wordCount:0,
        reblog:0,
        comment:0,
        blog:{},
        user:{},
        popuBlogs:[]


    }
  },
  methods:{

  },
  beforeMount(){
        var blogID = this.$route.params.id;
        var blogIndex = this.$route.params.index;
        let data = toRaw(this.$store.state.Blogs);
        this.blog = data[blogIndex];

        var userID = data[blogIndex].authorID;
        var userDataSet = toRaw(this.$store.state.BlockChainData);
        var userDetail;

        for(let i=0; i< userDataSet.length; i++){
            if(userDataSet[i].authorID == userID){
                userDetail = userDataSet[i];
            }
        }
        this.user = userDetail;

        //raking
        var userCurBlog = this.user.blogs;
        for(let i =0; i < userCurBlog.length; i++){
            userCurBlog[i].giftPannel = false;
            for(let y = i+1; y < userCurBlog.length; y++ ){
                if(userCurBlog[i].popularRate < userCurBlog[y].popularRate){
                    var three = userCurBlog[i];
                    userCurBlog[i] = userCurBlog[y];
                    userCurBlog[y] = three
                }
            }
        }
        this.popuBlogs = userCurBlog;
  },
  mounted(){
        // let data = JSON.parse(window.localStorage.getItem("blog"));
        // this.title = data[0].blogs[0].title;
        // this.content = data[0].blogs[0].content;
        // this.wordCount = data[0].blogs[0].count;
        // this.reblog = data[0].blogs[0].reblog;
        // this.comment = data[0].blogs[0].comments.length;

  }
}
</script>


<style>
.blog_container{
    height:100%;
}
.blog{
    background: white;
    height: 100%;
    padding: 5px 130px;
    margin: 0 10px;
}
.blog_title{
    font-weight: 900;
    font-size: 26px;
    margin-bottom: 0;
    margin-top: 10px;
}
.blog_count_bar{
    color: #1e88e5;
    margin: 5px 0;
    font-weight: 700;
    font-size: 14px;
}


.blog_detail_count p{
    margin: 0;
    background: #cccaca;
    color: white;
    font-weight: 700;
    padding: 5px;
    font-size: 13px;
    margin-bottom: 5px;

}
.blog_content img{
        width: 100%;
}
.blog_detail_count p:first-child{
    border-right: 2px solid #546e7a;
}
.blog_detail_count p:last-child{
    border-right: 2px solid #00acc1;
}
.user_deatil{
    position: fixed;
    background: white;
    width: 20%;

}
.user_img{
    width: 95px;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border: 1px solid #e9e7e7;
}
.top_detail{
    text-align: center;
}
.top_detail h5{
        margin-bottom: 5px;
}
.top_detail p{
    font-size: 12px;
    padding: 0 2px;
    margin-left: 5px;
    color: #868686;
    margin-bottom: 15px !important;
}
.user_introduction a{
    font-size: 14px;
}
.user_active_icon{
    margin: 0 5px;
    
}
.user_count{
    margin: 15px 5px;
    /* display: flex;
    flex-direction: row;
    flex-wrap: nowrap; */
    justify-content: center;
    border-top: 1px solid #bcbcbc;
    padding-top: 15px;
}
.user_count p{
  font-size: 14px;
    font-weight: 900;
    color: #4a4a4a;
}
.recommodation h4{
    border-bottom: 1px solid #bcbcbc;
    margin: 15px 5px;
    padding: 10px;
}
.list{
    text-align: left;
}
.list .img_cover{
     overflow: hidden;
    max-width: 45px;
    max-height: 45px;
    border-radius: 7px;
    margin: 5px auto;
}
.list img{
        max-width: 45px;
}
.blog_user_detail{
    margin-top: 20px;
    border-bottom: 1px solid #bcbcbc;
    padding-bottom: 10px;
}
.blog_user_detail img{
    width: 45px;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border: 1px solid #e9e7e7;
}


.user_detail_container{
        display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

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
    font-size: 13px;
    color: #757575;
    font-weight: 600;
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
.user_detail_name_three p {
    margin: 0;
    font-size: 14px;
    color: #42a5f5!important;
    font-weight: 700;
}
.user_detail_name i,.user_detail_name_three i{
    border: 1px solid #999999;
    font-size: 12px;
    padding: 1px;
    margin-left: 5px;
    color: #868686;
}
</style>
