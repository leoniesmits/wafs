(function() {

	'use strict'

	let Api = function() {
		this.fetch = function(method, url, async) {
			template.render(templates.loading, [])			
			return new Promise((resolve, reject) => {
				//redirect when request takes too long
				let timer = setTimeout(()=> {
					template.render(templates.errorToolong,[])
					reject(9999)
				},10000)
				//ready state is safer than onload, onload throws data only when succesfull
				//readystatechange has better error tracking
				this.xhttp.onreadystatechange = () => {
					if(this.xhttp.readyState == 4 && this.xhttp.status >= 200 && this.xhttp.status <= 400) {
						clearTimeout(timer)
						resolve(JSON.parse(this.xhttp.responseText))
					}else if(this.xhttp.status >= 400) {
						clearTimeout(timer)
						reject(this.xhttp.status)
					}
				}
				this.xhttp.open(method,url,async)
				this.xhttp.send()
			})
		}
		this.xhttp = new XMLHttpRequest()
	}
	window.dribbble = new Api()
})();

