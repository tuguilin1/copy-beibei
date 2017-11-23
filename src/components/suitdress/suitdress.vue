<template>
	<div>
		<base-goods :url='"https://sapi.beibei.com/martshow/channel/1-woman_dress---0.html"' :callback='"BeibeiMartshowChannelGet"'></base-goods>
	</div>
</template>

<script type="text/javascript">
import BaseGoods from 'base/base'
	export default{
		components:{
			BaseGoods
		}
	}
</script>
