(function() {

	'use strict'

	let Api = function() {
		this.fetch = function(method, url, async) {
			return new Promise((resolve, reject) => {
				this.xhttp.onreadystatechange = () => {
					if(this.xhttp.readyState == 4 && this.xhttp.status >= 200 && this.xhttp.status <= 400) {
						resolve(JSON.parse(this.xhttp.responseText))
					}else if(this.xhttp.status >= 400) {
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


(function() {
	const TemplateEngine() {
		this.view = document.getElementById("view")

		this.build = function() {}

		this.render = function(template) {}
	}

	window.template = new TemplateEngine()
})();


(function() {

	'use strict'

	routie({
		'home' : function() {
			console.log("yo")
		},
		'tags/:tag' : function(t) {
			console.log(t)
		},
		'detail/:id' : function() {
			console.log("test")
		},
		'*' : function() {
			console.log('bla')
		}
	})
	//window.router = new Router()
})();



(function() {

	'use strict'

	const App = function() {
		this.state = {
			data: [],
			isLoading: true
		}
		this.init = function() {
			dribbble.fetch('GET',"https://api.dribbble.com/v1/shots/?access_token=c5312519011b8c727842737d8bdf60cedc9bf0f3b0cde84875602764160dcf55&per_page=100",true).then((d) =>{
				this.setState({data: JSON.parse(d), isLoading: false})
			})
			window.location.hash = "#home"
		}
		this.setState = function(obj) {
			Object.assign(this.state, obj)
		}
		this.init()
	}
	window.app = new App()
})();






/*
(function() {
	let templates = {
		card: function(d) {
			let template = ``

			d.map(function(i) {
				template += `
				<div>
					<h1>${i.title}</h1>
					<img src="${i.images.hidpi}" />
					<div>
						<div>
							<h2>Views:</h2>
							<p>${i.views_count}</p>
						</div>
						<div>
							<h2>Likes:</h2>
							<p>${i.likes_count}</p> 
						</div>

						<div>
							${i.tags.map(function(d) {
								return `<a href="#/tags/${d}">${d}</a>`
							})}
						</div>
					</div>
				</div>
				`
			})
			return template
		},
		detail: function(d) {

		}
	}

	let app = {
		init: function() {
			guacamole.router.init()
			
				window.location.hash = "#/"
				//window.dispatchEvent("hashchange")
			
			guacamole.router.config([
				{
					route: "#/",
					template: templates.card
				},
				{
					route: "#/tags/:name",
					template: templates.card
				},
				{
					route: "#/detail/:id",
					template: templates.detail
				}

			])
			api.fetch("https://api.dribbble.com/v1/shots/?access_token=c5312519011b8c727842737d8bdf60cedc9bf0f3b0cde84875602764160dcf55&per_page=100","GET", true)
			.then(function(response) {
				app.config.data = response
			})
			.catch(function(e) {
				throw new Error(e)
			})

		},config: {
			data: []
		}
	}

	let guacamole = {
		render: function(template,list) {
			let body = window.document.body
			body.innerHTML = template.template(list)
		},

		router: {

			init: function() {
				window.addEventListener("hashchange",guacamole.router.checkUrl, true)
				console.log(this)
			},
			checkUrl: function(e) {
				let url = e.newURL
				let link = url.match("((\#\/[^/#]+)|(\#\/))")
				guacamole.router.route(link[0])
				console.log(this)
			},
			routes: [],
			config: function(routes) {
				guacamole.router.routes = routes
			},
			route: function(url) {
				let route = guacamole.router.routes.filter(function(r) {
					return r.route === url
				})

				if(route.length === 1) {
					guacamole.render(route[0], app.config.data)
				}else {
					console.warn(url+" most likely doenst exist")
				}
			}


		}
	}

	let api = {
		fetch: function(url, method, async) {
			return new Promise(function(resolve, reject) {
					let xhttp = new XMLHttpRequest()
					xhttp.onreadystatechange = function() {
						if(xhttp.readyState === 4 && xhttp.status >= 200 && xhttp.status < 400) {
							let parsedData = JSON.parse(xhttp.responseText)
							resolve(parsedData)
						}else if(xhttp.status >= 400) {
							reject(xhttp.status)
						}
					}
					xhttp.open(method, url, async)
					xhttp.send()
			})
		}
	}

	
	
	app.init()

})()



/*(function(){

	//object litteral
	let app = {
		//method
		init: function() {
			routes.init()
		}
	}

	let routes = {
		init: function() {
			let self = this
			window.addEventListener("hashchange", self.getHash)
			
		},
		getHash: function(e) {
			let splitString = e.newURL.split("#")
			let route = splitString[splitString.length - 1]
			sections.toggle(route)
		}
	}

	let sections = {
		toggle: function(route) {
			let start = document.getElementById("start")
			let bestPractices = document.getElementById("best-practice")


			if(route === "start") {
				start.classList.add("show")
				bestPractices.classList.remove("show")
			}else if(route === "best-practice") {
				bestPractices.classList.add("show")
				start.classList.remove("show")
			}

			console.log(route)
		}
	}

	app.init()

})()
*/