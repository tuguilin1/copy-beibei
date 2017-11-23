import axios from 'axios'
import jsonp from 'common/js/jsonp'

export function getHot(){
	const url = '/api/gethot'
	const data = {
		ad_id:'7_28_246_9_236',
		app:'sbeibei',
		user_tag:2147483646
	}
	return axios.get(url, {
	    params: data
	}).then((res) => {
	  return Promise.resolve(res.data)
	})
}

export function getGoods(url,funcname){

	return jsonp(url,{name:funcname})
}

export function getrecGoods(id,event_id){
	const url='/api/getRecgoods'
	const data={
		method:'beibei.recom.list.get',
		scene_id:'app_item_detail_bei_ma_recom',
		iid:id,
		event_id:event_id,
		uid:0
	}
	return axios.get(url,{
		params:data
	}).then((res)=>{
		return Promise.resolve(res.data)
	})
}

