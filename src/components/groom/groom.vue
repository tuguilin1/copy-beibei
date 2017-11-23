<template>
	<div class="recommend">
		<div v-for='item in hot_goods' @click='purchase(item)'>
			<img :src="item.img">
			<span class='depict'> 
				{{item.title}}
			</span>
			<div class='price'>
				<span>￥{{returnFloat(item.price)}}</span>
				<span>￥{{returnFloat(item.price_ori)}}</span>
				<span>{{item.sale_tip}}</span>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
import {getGoods} from 'api/recommend'
import {mapMutations} from 'vuex'
import {createware} from 'common/js/ware'
	export default{
		data(){
			return{
				hot_goods:[],
				id:0
			}
		},
		methods:{
			_getDatas(){
				this.id=(this.$route.path).match(/\d+/g)[0]
				const url=`https://sapi.beibei.com/martshow/item/new/${this.id}-1-hot-0-0-0-0.html`
				getGoods(url,'BeibeiMartshowItemNewGet').then((res)=>{
					this.hot_goods=res.martshow_items
				}).catch((e)=>{
					console.log(e)
				})
			},
			purchase(item){
				this.$router.push({
					path:`/purchase/${item.iid}`
				})
				item.event_id=this.event_id
				const ware=createware(item)
				sessionStorage.setItem('user', JSON.stringify(ware))
				this.setinfo(ware)
			},
			...mapMutations({
				setinfo:'SET_INFO'
			}),	
			returnFloat(num){
				 var value=num/100.0;
				 var xsd=value.toString().split(".");
				 if(xsd.length==1){
				 	value=value.toString()+".00";
				    return value;
				 }
				 if(xsd.length>1){
				 	if(xsd[1].length<2){
					  value=value.toString()+"0";
			    	}
			 	    return value;
				 }
			}
		},
		mounted(){
			this._getDatas()
		}
	}
</script>

<style type="text/css" scoped>
	*{
		margin: 0;
		padding: 0;
	}
	.recommend{
		width: 100%;
		margin-top: 50px;
	}
	.recommend div{
		width: 50%;
		box-sizing: border-box;
		float: left;
		height: 650px;
	}
	.recommend div img{
		width: 100%;
		height: 450px;
	}
	.depict{
		font-size: 2.3em;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box; 
		-webkit-box-orient: vertical; 
		margin-right: 3%;
		margin-left: 3%;
	}
	.price{
		width: 100%;
		display: flex;
		margin-top: 20px;
	}
	.price span:first-child{
		font-size: 2.5em;
		color:red;
		margin-left: 3%;
	}
	.price span:nth-child(2){
		font-size: 2em;
		color:gray;
		text-decoration: line-through;
		margin-top: 3%;
		margin-left: 5%;
	}
	.price span:last-child{
		margin-left: 50%;
		font-size: 1.6em;
		white-space: nowrap;
		margin-top: 3%;
	}
</style>