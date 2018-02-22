(function() {

	'use strict'

	const App = function() {
		//app states
		this.state = {
			data: [],
			isLoading: true
		}
		this.init = function() {
			dribbble.fetch('GET',"https://api.dribbble.com/v1/shots/?access_token=c5312519011b8c727842737d8bdf60cedc9bf0f3b0cde84875602764160dcf55&per_page=10",true).then((d) =>{
				if(d.length > 1) {
					this.setState({data: d, isLoading: false})
				}else {
					template.render(templates.nodata, [])
				}
			}).then(() => {
				window.location.hash = "#home"
			}).catch((e) =>{
				console.log(e)
			})
		}
		//handler for managing app states
		this.setState = function(obj) {
			Object.assign(this.state, obj)
		}

		//constructor self init
		this.init()
	}
	window.app = new App()
})();