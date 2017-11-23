export class ware{
	constructor({title,img,iid,price,price_ori,desc,event_id,item_price}){
		this.title=title
		this.img = img
		this.iid=iid
		this.price=price
		this.price_ori=price_ori
		this.desc=desc
		this.event_id=event_id
		this.item_price=item_price
	}
}

export function createware(data){
	return new ware({
		title:data.title,
		img:data.img,
		iid:data.iid,
		price:data.price,
		price_ori:data.price_ori,
		desc:data.desc,
		event_id:data.event_id,
		item_price:data.item_price
	})
}