<template>
    <div class="container">
        <div class="header">
            <div class="blog_user_detail">
                <div style="min-height: 240px;
                    max-width: 1000px;
                    margin: 0px auto;
                    display: flex;
                    align-items: flex-end;">
                    <el-row justify="space-between" style="height:inherit;    width: 100%;    margin-bottom: 20px;">
                        <el-col :span="3">
                            <img class="user_img" src="../assets/logo.png"/>
                        </el-col>
                        <el-col :span="17">
                            <div class="user_detail_container">
                                <!--name-->
                                <div class="user_detail_name_three">
                                    <span class="">Toney<i>56</i></span>
                                    <span>23 Mins</span>
                                </div>
                                    <p class="detail">
                                        <el-icon class="el_icon"><b-icon-diagram-3 /></el-icon>
                                        <span>300</span> Followers · 
                                        <span>12</span> Following · 
                                        <el-icon class="el_icon"><b-icon-link-45deg /></el-icon>
                                        <span>
                                            hive.blog/@oflyhigh</span> · 
                                            <el-icon class="el_icon"><b-icon-geo-alt /></el-icon>
                                        <span>
                                            China</span>
                                    </p>
                                    <p class="detail">Programmer, Maker, Freelancer, Witness. Make friends, Make money, Make life better!</p>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="blog_detail_count">
                                <p>Approve Witness</p>
                                <p>Interactions</p>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <div class="body">
            <el-row :gutter="20" justify="space-evenly">
                <el-col :span="12">
                    <div class="flex_medium">
                        <!--大图样式-->
                        <div class="flex_medium_big">
                            <div v-for="(i,key) in 3" v-bind:key='key' class="blog_container">
                                <div class="blog">
                                    <div class="top_blog">
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
                                    <div class="medium_blog">
                                        <!--图片-->
                                        <img src="../assets/web3.png"/>
                                    </div>
                                    <div class="bottom_blog">
                                        <div class="description description_border">
                                            <a>Web 3.0, also known as the third-generation internet, is the next evolution of the World Wide Web. It provides a data-driven Semantic Web employing a machine-based understanding of data with the objective of developing a more intelligent and connected web experience for users.</a>
                                        </div>
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
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
  name: 'personalView',
  data () {
    return {
    

    }
  },
  methods:{

  },
  mounted(){

  }
}
</script>


<style>
.container{
    height:100%;
    padding: 10px;
}
.add_margin{
    margin: 10px;
}
.header{
background: linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 40%, rgba(10, 10, 10, 0.75) 100%) center center / cover no-repeat,url(http://localhost:8080/img/back.56478fc8.png);
    background-repeat: round;
}
.blog_user_detail{
    border-bottom: 1px solid #bcbcbc;
    min-height: 240px;

}
.blog_detail_count p{
        color: white;
    border: 3px solid;
    padding: 5px;
    font-weight: 900;
        margin-top: 0;
}

.blog_user_detail img{
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border: 2px solid #e9e7e7;
    min-width: 100px;
    width: 100px;
    height: 100px;;
}
.user_img{
    width: 95px;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border: 1px solid #e9e7e7;
}
.user_detail_container{
        /* display: flex;
    flex-direction: row;
    flex-wrap: nowrap; */

}
.el_icon{
        font-size: 19px;
vertical-align: sub;
padding-right: 3px;
}
.detail{
    color: #ffffff;
    font-size: 15px;
    font-weight: 500;
    margin: 10px 0;
}
.detail_background{
    background: greenyellow;
}
.user_detail_name_three span:not(:first-child){
    padding: 3px 10px;
    font-size: 13px;
    color: #ffffff;
    font-weight: 600;
    border: 2px solid;
    border-color: rgb(255, 255, 255);
    margin: 0 5px;
    border-radius: 100px;
}
.user_detail_name span:first-child,.user_detail_name_three span:first-child{
    font-weight: 900;
    color: #ffffff;
    font-size: 23px;
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
    border: 1px solid;
    padding: 1px;
    margin-left: 5px;
    color: white;

    font-size: 15px;
    font-weight: 600;
    background-color: hsla(0,0%,100%,.3);
    border-color: #c5c5c5;
    
}



/* asd */
/* .flex_medium_big{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}
.flex_medium{
        flex-grow: 1;
            width: 80%;
}
.blog_container{
    margin: 15px;

}
.blog{
    background: white;
    border-radius: 7px;
    box-shadow: 0px 0px 3px 0px #898989;
}
.top_blog{
        padding: 15px;
        padding-bottom: 0;
}
.user_detail_container{
        display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
 
}
.user_detail_container img{
        width: 35px;
border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border: 1px solid #e9e7e7;
}
.user_detail_name{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    flex-grow: 1;
    padding-left: 10px;
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
.blog_title h4{
        margin-top: 10px;
    margin-bottom: 5px;
    word-break: break-word;
}
.medium_blog{
    text-align: center;
    margin-bottom: 10px;
    display: flex;
}

.medium_blog img{
    max-height: 459px;
    width: auto !important;
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
} */
</style>
