<template>
	<div class='seckill'>
		<div class='goods_list' v-show='goods.length' v-for='item in goods'>
			<div class='image'><img :src="item.img"></div>
			<div class="desc">
				<div class="title">{{item.title}}</div>
				<div class="mark">
					<div class="mark1">
						<span class='limit'>限{{item.surplus_stock}}件</span>
						<span>￥{{returnFloat(item.price)}}</span>
						<span>￥{{returnFloat(item.price_ori)}}</span>
					</div>
					<div class="mark2">
						<div>即将开抢</div>
						<div>10:00</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
import {getGoods} from 'api/recommend'
import {returnFloat} from 'common/js/returnfloat'
	export default{
		data(){
			return{
				goods:[],
				index:2
			}
		},
		methods:{
			_getseckillGoods(){
				const url = "https://sapi.beibei.com/martgoods/tuan/search_by_tag/1-30-tomorrow---.html"
				const callback = 'BeibeiMartgoodsSearchByTagGet'
				getGoods(url,callback).then((res)=>{
					console.log(res.tuan_items)
					this.goods=res.tuan_items
				}).catch((e)=>{
					console.log(e)
				})
			},
		
			load(){
				const url = `https://sapi.beibei.com/martgoods/tuan/search_by_tag/${this.index}-30-tomorrow---.html`
				getGoods(url,'BeibeiMartgoodsSearchByTagGet').then((res)=>{
					if(res.tuan_items!=undefined){
						this.goods=this.goods.concat(res.tuan_items)
						this.index = this.index+1
					}
				}).catch((e)=>{
					console.log(e)
				})
			},
			new(){
				const scrollY = document.body.scrollTop
				const totalheight = document.body.scrollHeight
				const height = document.documentElement.clientHeight
				if(scrollY+height > totalheight-500){
					this.load()
				}
			},
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
			this._getseckillGoods(),
			window.addEventListener('scroll',this.new)
		}
	}
</script>

<style type="text/css">
	*{
		margin: 0;
		padding: 0;
	}
	.goods_list{
		width: 100%;
		height: 400px;
		display: flex;
		position: relative;
		background: white;
	}
	.goods_list .desc{
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-left: 10%;
		margin-top: 4%;
		height: 100%;
	}
	.goods_list .image{
		position: relative;
		height: 70%;
		width: 30%;
		left: 5%;
		top:10%;
	}
	.image img{
		width: 100%;
		height: 100%;
	}
	.desc .title{
		font-size: 2.5em;
		flex: 1;
		color:gray;
	}
	.desc .mark{
		flex: 1.5;
	}
	.mark2{
		float: right;
	}
	.mark1{
		display: flex;
		flex-direction: column;
	}
	.mark1 span:first-child{
		font-size: 1.5em;
		background: #C71935;
		width: 25%;
		height: 40px;
		line-height: 40px;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		text-align: center;
		color:white;
	}
	.mark1 span:nth-child(2){
		font-size:3em;
		font-weight: bolder;
	}
	.mark span:last-child{
		font-size: 3em;
		font-weight: bolder;
		text-decoration: line-through;
		color:#848C94;
	}
	.mark2{
		position: absolute;
		right: 10%;
		top:50%;
		width: 15%;
	}
	.mark2 div:first-child{
		width: 100%;
		height: 50px;
		border:1px solid #0FEB63; 
		font-size: 1.4em;
		text-align: center;
		line-height: 50px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		box-sizing: border-box;
	}
	.mark2 div:last-child{
		width: 100%;
		height: 70px;
		text-align: center;
		line-height: 70px;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		font-size: 2.5em;
		background: #0FEB63;
		font-weight: border;
		color:white;
	}
</style>