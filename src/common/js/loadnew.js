export function loadnew(func){
			const scrollY = document.body.scrollTop
			const totalheight = document.body.scrollHeight
			const height = document.documentElement.clientHeight
			if(scrollY+height > totalheight-500){
				func()
			}
		}