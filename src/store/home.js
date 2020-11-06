
import {reqBannerList, reqCategoryList, reqFloorList} from '@/api'

const state ={
    // 存数据
    categoryList:[],
    bannerList:[],
    floorList:[]
}

const mutations ={
    // 直接修改state数据
    RECEIVECATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    RECEIVEBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    RECEIVEFLOORLIST(state,floorList){
        state.floorList=floorList
    }
}


const actions ={
// 异步action 因为一般我们都在action当中去发送请求那数据
    async getCategoryList(context){
        const result =await reqCategoryList()
        if(result.code===200){
         context.commit('RECEIVECATEGORYLIST',result.data)
        }
    },
    // context直接解构
    async getBannerList({commit}){
        const result = await reqBannerList()
        if(result.code===200){
            commit('RECEIVEBANNERLIST',result.data)
        }
    },
    async getFloorList({commit}){
        const result=await reqFloorList()
        if(result.code===200){
            commit('RECEIVEFLOORLIST',result.data)
        }
    }
}

const getters ={

}

export default{
    state,
    mutations,
    actions,
    getters
}