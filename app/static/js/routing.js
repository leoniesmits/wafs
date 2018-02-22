//basic routing with routie

(function() {
	'use strict'
	routie({
		'home' : function() {
			template.render(templates.card,app.state.data)
		},
		'tags/:tag' : function(t) {
			console.log(t)
		},
		'detail/:id' : function(d) {
			let id =+ d 
			
			const filteredShot = app.state.data.filter((shot) => {
				return shot.id == id
			})

			template.render(templates.detail, filteredShot) 
		},
		'*' : function() {
			//look for hash in url
			//only render 404 when wrong hash url has been entered
			const url = window.location.href
			const hashSearch = RegExp('#')
			if(hashSearch.test(url)) {
				template.render(templates.error404, [])	
			}
			
		}
	})
})();
