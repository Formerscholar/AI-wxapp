import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		type:3,
		hasLogin: false,
		userInfo: {},//用户信息,
	},
	mutations: {
		set_type(state, provider){
			state.type = provider
			uni.setStorage({
				key: 'type',   
				data: provider
			}) 
		},
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			})
			uni.setStorage({//缓存用户登陆状态
			    key: 'is_vip',  
			    data: provider.is_vip  
			})
			uni.setStorage({//缓存用户登陆状态
			    key: 'token',  
			    data: provider.token 
			}) 
			uni.setStorage({//缓存用户登陆状态
			    key: 'hasLogin',  
			    data: true  
			}) 
			// uni.setStorage({//登录方式
			// 	key:'loginmode',
			// 	data:provider
			// })
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			// console.log(222)
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: ''  
			})
			uni.setStorage({
				 key: 'is_vip',  
				 data: ''  
			})
			uni.setStorage({//缓存用户登陆状态
			    key: 'token',  
			    data: ''  
			}) 
			uni.setStorage({//缓存用户登陆状态
				key: 'hasLogin',   
				data: false  
			}) 
			uni.redirectTo({
				url:'/pages/login/login'
			})
			// uni.setStorage({//登录方式
			// 	key:'loginmode',
			// 	data:''
			// })
		}
	},
	actions: {
	
	}
})

export default store