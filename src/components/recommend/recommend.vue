<template>
	<div class='recommend'>
		<div class="hot">
			<div v-for='item in hotgoods'>
				<img :src="item.img">
			</div>
		</div>
		<new-goods :goods='recommend' @select='select'></new-goods>
	</div>
</template>

<script type="text/javascript">
import {getHot} from 'api/recommend'
import {getGoods} from 'api/recommend'
import NewGoods from 'base/newgoods'
import {mapMutations} from 'vuex'

	export default{
		components:{
			NewGoods
		},
		data(){
			return{
				hotgoods:[],
				recommend:[],
				index:2,
				is_srolling:true
			}
		},
		methods:{
			_getHot(){
				getHot().then((res)=>{
					this.hotgoods = res.promotion_pro_shortcuts
				})
			},
			_getRecommend(){
				const url = 'https://sapi.beibei.com/martshow/new/1-1.html'
				getGoods(url,'BeibeiMartshowNewGet').then((res)=>{
					this.recommend = this._getGoods(res.martshows)
				}).catch((e)=>{
					console.log(e)
				})
			},
			_getGoods(list){
				let ret=[]
				list.forEach((item)=>{
					if(item.compact_item_show!=undefined){
						ret.push(item.compact_item_show)
					}
					else{
						if(item.item_show!=undefined){
							ret.push(item.item_show)
						}
					}
					
				})
				return ret
			},
			load(){
				const url = `https://sapi.beibei.com/martshow/new/${this.index}-1.html`
				getGoods(url,'BeibeiMartshowNewGet').then((res)=>{
					this.recommend=this.recommend.concat(this._getGoods(res.martshows))
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
			this._getHot(),
			this._getRecommend(),
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
	.recommend{
		position: absolute;
		top:7%;
		width: 100%;
	}
	.hot{
		width: 100%;
		height: 600px;
	}
	.hot div{
		float: left;
	}
	.hot img{
		width: 100%;
		height: 100%;
	}
	.hot div:first-child{
		height: 100%;
		width: 40%;
		box-sizing: border-box;
		border-right: 1px solid black;
	}
	.hot div:not(:first-child){
		height: 50%;
		width: 30%;
		box-sizing: border-box;
	}
	.hot div:nth-child(2),.hot div:nth-child(3){
		border-bottom: 1px solid black;
	}
	.hot div:nth-child(2),.hot div:nth-child(4){
		border-right: 1px solid black;
	}

</style>