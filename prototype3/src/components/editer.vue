<template>
    <el-row :gutter="20" style="    margin: 0 10px;
    height: calc(100% - 10px);">
        <el-col :span="12">
            <div class="commonBody">
                <h1 style="margin: 5px 0;font-size: 22px;font-weight: 900;">Write a new post for
                    <el-select
                        v-model="typeBlog"
                        placeholder="Select"
                        size="mini"
                        style="width: 150px"
                        >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>


                </h1>
                <el-input placeholder="Title" v-model="blog_title"/>
                <div class="editer_div">
                    <div class="editer_func">
                        <el-icon class="active_icon" v-on:click="heading(1)"><b-icon-type-h1 /></el-icon>
                        <el-icon class="active_icon" v-on:click="heading(2)"><b-icon-type-h2 /></el-icon>
                        <el-icon class="active_icon" v-on:click="heading(3)"><b-icon-type-h3 /></el-icon>
                        <el-icon class="active_icon" v-on:click="editor.commands.setParagraph()"><b-icon-paragraph /></el-icon>
                        <el-icon class="active_icon" v-on:click="editor.chain().focus().toggleBulletList().run()"><b-icon-list-ul /></el-icon>
                        <el-icon class="active_icon" v-on:click="editor.commands.setImage({ src: 'https://courseseeker.edu.au/assets/images/institutions/3016.png' })"><b-icon-card-image /></el-icon>
                        <el-icon class="active_icon" v-on:click="editor.commands.toggleBold()"><b-icon-type-bold /></el-icon>
                        <div style="display: inline-block;border-left: 1px solid;padding: 0px 5px;">
                            <el-icon v-on:click="editor.chain().focus().toggleHighlight().run()" v-bind:class="{'highlineActive':editor.isActive('highlight')}" class="active_icon"><b-icon-pencil-fill /></el-icon>
                            <span v-on:click='editor.chain().focus().toggleHighlight({ color: "red" }).run()' :class="{ 'selected': editor.isActive('highlight', { color: 'red' }) }" class="color_selection">Red</span>
                            <span v-on:click='editor.chain().focus().toggleHighlight({ color: "yellow" }).run()' :class="{ 'selected': editor.isActive('highlight', { color: 'yellow' }) }" class="color_selection">Yellow</span>
                            <span v-on:click='editor.chain().focus().toggleHighlight({ color: "green" }).run()' :class="{ 'selected': editor.isActive('highlight', { color: 'green' }) }" class="color_selection">Green</span>
                        </div>
                        <span style="vertical-align: bottom;font-size: 20px;">WordCount:{{countWord}}</span>
                    </div>
                    <editor-content style="height: calc(100% - 70px);" v-on:change='active' :editor="editor" />
                </div>
                <el-input class="editer_input_margin_top" v-model="blog_description" placeholder="Description"/>
                    <span class="titp"> Short preview description: 
                        <span class="titp_count"> {{blog_description.length}}/120 </span> 
                        characters used. </span>
                <!-- <el-input class="editer_input_margin_top" v-model="blog_tags" placeholder="Topics"/> -->
                  <div class="editer_input_margin_top"><el-tag
                    v-for="tag in tagsCollection"
                    :key="tag"
                    class="mx-1"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">{{ tag }}</el-tag>
                      <el-input
                      style="width:130px;"
                            v-if="inputVisible"
                            ref="InputRef"
                            v-model="newTagName"
                            class="ml-1 w-20"
                            size="small"
                            @keyup.enter="handleInputConfirm"
                            @blur="handleInputConfirm"
                        />
                        <el-button v-else class="button-new-tag ml-1" size="small" v-on:click="showInput">
                            + New Tag
                        </el-button></div>
                    <span class="titp"> Topics-Tags to classify your post: 
                        <span class="titp_count"> {{tagsCollection.length}}/10 </span>
                    </span>
                    <div style="float: right;">
                        <el-button type="primary" v-on:click="publish_post">Publish</el-button>
                    </div>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="commonBody">
                <div style="font-size: 25px;font-weight: 900;">{{blog_title == '' ? 'Preview':blog_title}}</div>
                <div class="viewer" v-html="data_json" style="overflow: hidden scroll;height: calc(100% - 25px);word-break: break-word;">
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Bold from '@tiptap/extension-bold'
import CharacterCount from '@tiptap/extension-character-count'
// import http from '../utils/interceptor'
// import vueSocketIo from 'vue-socket.io'
// import SocketIO from 'socket.io-client'
import store from './../store'
import { toRaw } from '@vue/reactivity'

export default {
    components: {
        EditorContent,
    },
    data() {
        return {
        editor: null,
        data_json:'', // editor data
        selectedColor:null,
        openHighline:false,
        imgURL:'./assets/logo.png',
        websock:null,
        blog_title:'',
        blog_description:'',
        blog_tags:'',
        tagsCollection:[],
        newTagName:'',
        inputVisible:false,
        countWord:0,
        typeBlog:'User Story',
        options:[
            {
                value: '1',
                label: 'User Story',
            },
            {
                value: '2',
                label: 'Community',
            }]
        }
    },
    beforeMount(){
        var that = this;
        this.editor = new Editor({
            extensions: [
                StarterKit,
                Document,
                Paragraph,
                Text,
                Heading.configure({
                    levels: [1, 2, 3],
                }),
                Highlight.configure({
                    multicolor: true,
                }),
                CharacterCount.configure({
                    mode: 'nodeSize',
                }),
                Image.configure({
                    inline: true,
                    allowBase64: true,
                    HTMLAttributes: {
                        class: 'editer_img',
                    },
                }),
                
                Bold
            ],
            content: '',
            autofocus: true,//初始化后将光标放在编辑器中
            editable: true,//使文本可编辑
            injectCSS: true,
            onCreate({ editor }) {
                that.data_json = editor.getHTML()
                // editor.commands.toggleHighlight({ color: '#ffcc00' })

            },
            onUpdate({ editor }) {
                var edit_json = editor.getHTML();
                var removeRegexP = /<p><\/p>/g
                that.data_json = edit_json.replace(removeRegexP, "<br>");
                that.countWord = editor.storage.characterCount.words()

            }
        });

    },
    created(){
    },
    mounted() {
        this.websock = this.$store.state.socketConnection;   
    },
    computed:{
        checkUserSession:function(){
            return this.$store.UserSession;
        },
        checkBlockChainData:function(){
            return this.$store.BlockChainData;
        }

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
    publish_post:function(){
        var that = this;
        var user = toRaw(this.$store.state.UserSession);
        var dataSet = JSON.parse(JSON.stringify(this.$store.state.BlockChainData));

        //request detail
        const detail = {
            type:'publish',
            username: user.name,
            Bkeys: user['Bkeys'].Password,//public key,
            UUID:this.createGUID(),
            index:user.index
        }

        this.websock.emit('appReturnPublishRes',detail);
        this.websock.on('appPublishRes',(res)=>{
            if(res.statu == 200){
                //blog集
                var blogsData =  JSON.parse(JSON.stringify(that.$store.state.Blogs));
                const authorID = user.authorID; //登录时保存，用于储存到指定用户
                const authorName = user.name; //登录时保存，用于储存到指定用户
                const randomBlogId = that.createGUID();
                const blogIndex = blogsData.length > 0 ? blogsData.length : 0;

                var blog_object={};
                if(that.typeBlog == 2){
                    blog_object = {
                        'type':2,
                        'authorID':authorID,
                        'authorName':authorName,
                        'blogID': randomBlogId,
                        'title': that.blog_title,
                        'content':that.data_json,
                        'description':that.blog_description,
                        'tags':that.tagsCollection,
                        'count':that.countWord,
                        'reblog':0,
                        'date':'',
                        'comments':[],
                        'tokenVal':0,
                        'popularRate':0.0,//算法实现（）
                        'date':Date(),
                        'disdate':new Date().toUTCString(),
                        'upvote':0,
                        'downvote':0,
                        'user':user,
                        'Community':'UTS Faculty of Engineering and IT',
                        'blogIndex':blogIndex,
                        'blogVoteCount':0,
                        'curators':[]
                    }
                }else{
                    blog_object = {
                        'type':1,
                        'authorID':authorID,
                        'authorName':authorName,
                        'blogID': randomBlogId,
                        'title': that.blog_title,
                        'content':that.data_json,
                        'description':that.blog_description,
                        'tags':that.tagsCollection,
                        'count':that.countWord,
                        'reblog':0,
                        'date':'',
                        'comments':[],
                        'tokenVal':0,
                        'popularRate':0.0,//算法实现（）
                        'date':Date(),
                        'disdate':new Date().toUTCString(),
                        'upvote':0,
                        'user':user,
                        'blogIndex':blogIndex,
                        'blogVoteCount':0,
                        'curators':[]

                    }
                }

                //更新 个人帖子信息
                dataSet[user.index].blogs.push(blog_object);
                store.dispatch('updateBlockChainData',{data:dataSet,user:dataSet[user.index]});

                //更新 帖子
                blogsData.push(blog_object);
                store.dispatch('updateBlog',blogsData);
                that.$router.push({name:'blogview',params: {id:randomBlogId, index: (blogsData.length-1)}});
            }
        })
    },
    handleInputConfirm:function(){
        if (this.newTagName) {
            this.tagsCollection.push(this.newTagName)
        }
        this.inputVisible = false
        this.newTagName = ''
    },
    showInput:function(){
        if(this.tagsCollection.length != 10){
            this.inputVisible = true
            this.$nextTick(() => {
                    this.$refs.InputRef.focus()
            })
        }
    },
    active:function(){
       this.data_json = this.editor.getHTML()
    },
    heading:function(type){
        const objType = {'level':type};
        this.editor.chain().focus().toggleHeading(objType).run()
    },
  },
  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>
<style>
.commonBody{
    background: white;
    height: calc(100% - 20px);
    padding: 10px 20px;
}

.editer_div{
margin-top: 15px;
    border: 1px solid #dcdfe5;
    height: calc(100% - 200px);
}
.editer_input_margin_top{
            /* margin-top: 15px; */

}
.editer_func{
    padding: 10px;
    border-bottom: 1px solid #dcdfe4;
}

.titp{
    color: #999;
    font-size: 12px;
}
.titp_count{
    font-weight: 900;
}

/* 编辑器 */
.ProseMirror:focus {
    outline: none;
}
.ProseMirror{
    border-radius: 7px;
    padding: 10px;
        overflow-y: scroll;
    height: 100%;
}
.ProseMirror p,.viewer p  {
    margin: 0;
}

.active_icon{
    font-size: 20px;
    font-weight: 900;
    border-radius: 6px;
    border: 1px solid black;
    padding: 2px;
    margin-right: 5px;
    cursor: pointer;
    background: white;
}
.color_selection{
    display: inline-block;
    font-size: 20px;
    vertical-align: top;
    padding: 0 5px;
}
.selected{
    border: 1px solid #51b6de;
    background: #85f6f54d;
    font-weight: 900;
    }
    .highlineActive{
        background: #85f6f54d;
    }
    .editer_img{
            width: 100%;
    }
</style>