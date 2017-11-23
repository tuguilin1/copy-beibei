import * as types from './mutation-types'

const mutations={
	[types.SET_EVENTID](state,id){
		state.eventid=id
	},
	[types.SET_INFO](state,info){
		state.info=info
	}
} 

export default mutations