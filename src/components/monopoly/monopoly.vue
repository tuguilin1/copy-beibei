<template>
	<div class='monopoly'>
		<div class="head">
			<div>
				<img :src="brand.brand_logo">
			</div>
			<div class="desc">
				<span>
					{{brand.brand_name}}
				</span>
				<span>
					{{brand.buying_info}}
				</span>
			</div>
			<div>
				收藏
			</div>
		</div>
		<div class="recommend">
			<div class="rechead" v-if='isshow'>
				<img :src="title[0].icon">
				<span>{{title[0].title}}</span>
			</div>
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
		<div class="goods">
			<div class="rechead" v-if='isshow'>
				<img :src="title[1].icon">
				<span>{{title[1].title}}</span>
			</div>
			<div class="reference">
				<router-link tag='div' :to="{path:`/goods/${id}/recommend`}">推荐</router-link>
				<router-link tag='div' :to="{path:`/goods/${id}/newgoods`}">新品</router-link>
				<router-link tag='div' :to="{path:`/goods/${id}/sales`}">销量</router-link>
				<router-link tag='div' :to="{path:`/goods/${id}/price`}">价格</router-link>
				<div>筛选</div>
			</div>
			<router-view></router-view>
		</div>
		<div class="othergoods">
			<div class="rechead" v-if='isshow'>
				<img :src="title[2].icon">
				<span>{{title[2].title}}</span>
			</div>
			<div v-for='item in rec_goods'  >
				<div class="logo">
					<img :src="item.logo">
					<span>{{item.title}}</span>
				</div>
				<div class='context'>
					<figure v-for='rec in item.recom_items'>
						<img :src="rec.img">
						<figcaption class='name'>{{rec.title}}</figcaption>
						<figcaption class='item_price'>{{rec.item_price}}</figcaption>
					</figure>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
import {mapGetters} from 'vuex'
import {getGoods} from 'api/recommend'
import title from 'common/js/new'
import {mapMutations} from 'vuex'
import {createware} from 'common/js/ware'
export default{
	data(){
		return{
			hot_goods:[],
			goods:[],
			brand:{},
			rec_goods:[],
			id:0,
			title:[],
			isshow:false,
			event_id:0
		}
	},
	computed:{
		...mapGetters([
			'eventid'
		])
	},
	methods:{
		_getallgoods(){
			this.id = (this.$route.path).match(/\d+/g)[0]
			const url=`https://sapi.beibei.com/martshow/item/new/${this.id}-1-hot-0-0-0-0.html`
			const callback = 'BeibeiMartshowItemNewGet'
			getGoods(url,callback).then((res)=>{
				this.brand = res.brand_info
				this.rec_goods=res.recom_martshows_lists
				this.hot_goods=res.hot_items_info.hot_items
				this.title.push(new title({
					icon:res.hot_items_info.icon,
					title:res.hot_items_info.title
				}))
				this.title.push(new title({
					icon:res.martshow_items_icon,
					title:res.martshow_items_title
				}))
				this.title.push(new title({
					icon:res.recom_martshows_icon,
					title:res.recom_martshows_title
				}))
				this.event_id=res.event_id
				this.isshow=true
			})
		},
		returnpage(){
			console.log(1)
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
		},
		...mapMutations({
			setinfo:'SET_INFO'
		})	
	},
	mounted(){
		this._getallgoods()
	}
}
</script>

<style type="text/css" scoped>
	*{
		margin: 0;
		padding: 0;
	}
	.monopoly{
		position: fixed;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 200;
		background: white;
		overflow: scroll;
	}
	.head{
		width: 100%;
		height: 200px;
		display: flex;
		margin-top: 50px;
	}
	.head div:first-child{
		height: 160px;
		margin-top: 20px;
		margin-left: 5%;
		width: 160px;
	}
	.head img{
		width: 100%;
		height: 100%;
	}
	.desc{
		margin-top: 50px;
		display: flex;
		flex-direction: column;
	}
	.desc span:first-child{
		font-size: 3em;
	}
	.desc span:last-child{
		font-size: 2em;
		color:gray;
		margin-top: 20px;
	}
	.head div:last-child{
		margin-top: 100px;
		font-size: 3em;
		margin-left: 200px;
	}
	.rechead{
		width: 20%;
		margin-left: 40%;
		height: 60px;
		position: relative
	}
	.rechead img{
		width: 40px;
		height: 70%;
		position: absolute;
		top:15%;
	}
	.rechead span{
		font-size: 2em;
		margin-left: 20%;
		line-height: 60px;
		float: right;
	}
	.recommend{
		width: 100%;
		margin-top: 50px;
	}
	.recommend div:not(:first-child){
		width: 50%;
		box-sizing: border-box;
		float: left;
		height: 650px;
	}
	.recommend div:not(:first-child) img{
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
	.goods{
		width: 100%;
		clear:both;
	}
	.rechead2{
		width: 20%;
		margin-left: 40%;
		height: 60px;
		position: relative;
	}
	.rechead2 img{
		width: 40px;
		height: 70%;
		position: absolute;
		top:15%;
	}
	.rechead2 span{
		font-size: 2em;
		margin-left: 20%;
		line-height: 60px;
		float: right;
	}
	.reference{
		height: 100px;
		width: 100%;
	}
	.reference div{
		font-size:3em;
		flex: 1;
		text-align: center;
		width: 20%;
		float: left;
	}
	.othergoods{
		width: 100%;
		clear:both;
	}
	.logo{
		width: 100%;
		height: 100px;
		position: relative;
	}
	.logo img{
		width: 200px;
		height: 100px;
		position: absolute;
		top:0;
		left: 3%;
	}
	.logo span{
		font-size: 3em;
		margin-left: 30%;
		line-height: 100px;
	}
	.context{
		display: flex;
	}
	.context figure{
		flex: 1;
		height: 300px;
	}
	.context img{
		width: 100%;
		height: 80%;
	}
	.name{
		font-size: 2em;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 1;
		display: -webkit-box; 
		-webkit-box-orient: vertical; 
		margin-left: 3%;
		margin-right: 3%;
	}
	.item_price{
		font-size: 2.5em;
		margin-left: 3%;
		margin-top: 10px;
		text-align: center;
		color:#0FFFFF;
	}
	.othergoods div:not(:first-child){
		margin-top: 40px;
	}
</style>