<template>
	<div class='baby'>
		<new-goods :goods='baby_goods' @select='select'></new-goods>
	</div>
</template>

<script type="text/javascript">
import {getGoods} from 'api/recommend'
import NewGoods from 'base/newgoods'
import {mapMutations} from 'vuex'
	export default{
		props:{
			url:{
				type:String,
				default:''
			},
			callback:{
				type:String,
				default:''
			}
		},
		components:{
			NewGoods
		},
		data(){
			return{
				baby_goods:[],
				index:1,
				newurl:this.url,
				is_srolling:true
			}
		},
		methods:{
			_getbabygoods(){
				const url = this.url
				const callbackname = this.callback
				getGoods(url,callbackname).then((res)=>{
					this.baby_goods =this._getGoods(res.martshows) 
				})
			},
			_getGoods(list){
				let ret=[]
				list.forEach((item)=>{
					if(item.compact_item_show!=undefined){
						ret.push(item.compact_item_show)
					}
					
				})
				return ret
			},
			load(){
				this.newurl = this.newurl.replace(new RegExp(this.index),this.index+1)
				const callbackname = this.callback
				getGoods(this.newurl,callbackname).then((res)=>{
					this.baby_goods=this.baby_goods.concat(this._getGoods(res.martshows))
				})
				this.index = this.index+1
			},
			new(){
				const scrollY = document.body.scrollTop
				const totalheight = document.body.scrollHeight
				const height = document.documentElement.clientHeight
				if(scrollY+height > totalheight-500){
					this.load()
				}
				this.is_srolling=true
			},
			select(id){
				this.$router.push({
					path:`/goods/${id}`
				})
				this.set_eventid(id)
			},
			...mapMutations({
				set_eventid:'SET_EVENTID'
			})
		},
		mounted(){
			this._getbabygoods(),
			window.addEventListener('scroll',()=>{
					if(this.is_srolling==true){
						setTimeout(this.new,500)
					}
					this.is_srolling=false
				}
			)
		}
	}
</script>

<style type="text/css" scoped>
	*{
		margin: 0;
		padding: 0;
	}
	.baby{
		width: 100%;
		position: absolute;
		top:6%;
	}
</style>