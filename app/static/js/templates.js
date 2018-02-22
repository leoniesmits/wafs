//templates
let templates = {
	error404 : function() {
		const template = `
			<section>
				<h1>404</h1>
				<p>Oops, this page does not exist.</p>
			</section>
		`
		return template
	},
	loading: function() {
		const template = `
			<div class="loader"></div>
		`
		return template
	},
	card : function(data) {
		const template = `
			<section>
				<a href="#detail/${data.id}">
				<article>
					<h1>${data.title}</h1>
					<img src="${data.images.hidpi}" alt="" />
					<section>
						<article>
							<h1>likes</h1>
							<p>${data.likes_count}</p>
						</article>
						<article>
							<h1>views</h1>
							<p>${data.views_count}</p>
						</article>
						<article>
							<h1>Tags</h1>
							<ul>
								${data.tags.map((d) => {
									return `<li><a href=#tags/${d}>${d}</a></li>`
								}).join('')}
							</ul>
						</article>
					</section>
				</article>
				</a>
			</section>
		`

		return template
	},

	detail: function(data) {
		const template = `
			<section>
				<a href="#home">Back</a>
				<section>
					<article>
						<h1>${data.title}</h1>
						<img src="${data.images.hidpi}" alt="${data.title}" />
						<p>${data.description}</p>
					</article>
				</section>
			</section>
		`
		return template
	},

	errorToolong: function() {
		const template = `
			<section>
				<h1>Network error</h1>
				<p>Your request is taking too long to solve, try again later</p>
			</section>
		`
		return template
	},

	nodata: function() {
		const template = `
			<section>
				<h1>Oops</h1>
				<p>No data is available at this time, please comeback later</p>
			</section>
		`
	}

}
