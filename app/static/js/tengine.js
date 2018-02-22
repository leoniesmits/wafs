//basic rendering engine
//could be written better
(function() {

	'use strict'

	let TemplateEngine = function() {
		this.view = document.getElementById("view")
		this.templateString = ``
		this.render = function(template, data) {
			let templateString = ``
			if(data.length >= 1) {
				data.forEach((d) => {
					this.templateString += template(d)
				})
			}else {
				this.templateString = template()
			}
			this.view.innerHTML = this.templateString
			console.log(this.templateString)
			this.templateString = ``
		}
	}
	window.template = new TemplateEngine()
})();