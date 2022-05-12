import { createStore } from 'vuex'
import { toRaw } from '@vue/reactivity'

export default createStore({
  state: {
    socketConnection:null,
    BlockChainData:[],
    UserSession:null,
    Blogs:[],
    UTSBYTS:1,
    UTSTreasure: 0.5,
    UTSGold:1
  },

  mutations: {
    muta_saveConnection: (state, data) => {
      state.socketConnection = data;
    },
    muta_loadBlockChainData: (state,data)=>{
      var data = JSON.parse(sessionStorage.getItem('BlockChainData'));
      var empty=[];
      if(data){
        if(data.length > 0){
          state.BlockChainData = data;
        }
      }else{
        sessionStorage.setItem('BlockChainData',JSON.stringify(empty))

      }

    },
    muta_loadUserData: (state, data) => {
      var data = sessionStorage.getItem('UserSession');
      if(data){
        state.UserSession = JSON.parse(data);
      }else{
        sessionStorage.setItem('UserSession',JSON.parse(JSON.stringify(state.UserSession)));
      }
    },
    muta_loadBlogs: (state, data) => {
      var data = JSON.parse(sessionStorage.getItem('Blogs'));
      var empty=[];

      if(data){
        if(data.length > 0){
          state.Blogs = data;
        }
      }else{
        sessionStorage.setItem('Blogs',JSON.stringify(empty))

      }
    },
    muta_insertNewUser: (state, data) => {
      state.BlockChainData.push(data);
      sessionStorage.setItem('BlockChainData',JSON.stringify(state.BlockChainData))
    },
    muta_updateBlockChainData: (state, data) => {
      state.BlockChainData = data.data;
      state.UserSession = data.user;
      sessionStorage.setItem('BlockChainData',JSON.stringify(state.BlockChainData))
      sessionStorage.setItem('UserSession',JSON.stringify(state.UserSession))

    },
    muta_setUsersession: (state, data) => {
      state.UserSession = JSON.parse(JSON.stringify(data));
      sessionStorage.setItem('UserSession',JSON.stringify(state.UserSession));

    },
    muta_updateBlog: (state, data) => {
      state.Blogs = data;
      sessionStorage.setItem('Blogs',JSON.stringify(state.Blogs));

    },
    muta_votingProcessUpdate: (state, data) => {
    
      var blockchainData = toRaw(state.BlockChainData);

      var newBlogsVal = toRaw(data.blogs); 
      var newUserVal = toRaw(data.user);
      blockchainData[data.user.index] = newUserVal;//用户已更新，userSession 没有

      //替换新blockchainData用户组的blog，Blog 没有
      for(let i = 0; i < blockchainData.length; i++){
        for(let y = 0; y < blockchainData[i].blogs.length; y++){
          for(let x =0; x < newBlogsVal.length; x++){
              if(blockchainData[i].blogs[y].blogID == newBlogsVal[x].blogID){
                blockchainData[i].blogs[y] =  newBlogsVal[x];

              }
          }
        }
      }

      //更新用户信息 userSession 
      state.UserSession = newUserVal
      //更新Blog信息 Blog 
      state.Blogs = newBlogsVal


      //session part
      sessionStorage.setItem('UserSession',JSON.stringify(state.UserSession));//session
      sessionStorage.setItem('BlockChainData',JSON.stringify(state.BlockChainData));//session
      sessionStorage.setItem('Blogs',JSON.stringify(state.Blogs));//session


    }
  },
  actions: {
    //Websocket Connection
    saveConnection({ commit }, data) {
      commit('muta_saveConnection', data);
    },
    //loadData blackChain
    loadBlockChainData({commit}){
      commit('muta_loadBlockChainData');
    },
    //loadUserData
    loadUserData({commit}){
      commit('muta_loadUserData');

    },
    // loadLogs
    loadLogs({commit}){
      commit('muta_loadBlogs');
    },
    //insert user
    insertNewUser({ commit }, data){
      commit('muta_insertNewUser',data);

    },
    //update blackChain
    updateBlockChainData({commit},data){
      commit('muta_updateBlockChainData',data);

    },

    updateBlog({commit},data){
      commit('muta_updateBlog',data);

    },
    //login save userDetail localsession
    setUsersession({commit},data){
      commit('muta_setUsersession',data);

    },
    //update all
    votingProcessUpdate({commit},data){
      commit('muta_votingProcessUpdate',data);//usersession dataset

    }

  },
  modules: {
    //饮用
  },
  getters: {
  }
})
