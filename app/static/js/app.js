/*<-- T O  D O -->*/
// - FIX ROUTIE FROM DETAIL
// - TOGGLE DISPLAY ON ROUTIE SECTION
// - SELECT ALL SUBJECTS NEEDED IN MAPS
// - FIL LEGEND AS ROUTIE
// - PUT CONTENT IN LEGEND
// - FIGURE OUT LOCAL STORAGE

// create local scope
// this practice is called an Immediately Invoked Function Expression (IIFE)
// it's a function that runs as soon as it's defined
(function() {
    "use strict";

// the settings for the url before I render its data
// in the url, the last two values are the year and month
// I selected august 1969
// underneath, I stored the api key (my access) in another variable
    var settings = {
        url: "https://api.nytimes.com/svc/archive/v1/1969/8.json",
        apiKey: "95471ed858c04cbe81da960e4f866116",
    }

// initialize application
// this object is to bring structure to the file
// and to start at a explicit poin
// I guess you could call it a "hatch"?
    var app = {
        init: function() {
            routes.init();
        }
    }

// handle routes and states
    var routes = {
        init: function() {
            api.getData();
            routie({
				"home": function () {
					template.toggle('#home');
				},
				"detail/:storyid": function (storyid) {
                    console.log(storyid)
					template.toggle('#detail');
				}
			});

            
        }
    }

// sen the request for the api url
// use .onload on the new XMLHttpRequest and direct to collection.filterdata
// the data is filtered here before it is send
    var api = {
        getData:function(route){
            var url = settings.url+ "?api-key=" +settings.apiKey;
            var request = new XMLHttpRequest();

            request.open("GET", url, true);
            request.onload = function() {
                if (request.status >=200 && request.status < 300) {
                    var data = JSON.parse(request.responseText);
                    collection.filterData(data);
                }
            }
            
            request.send();
        }
    }

// this object filters all the data I need for specific elements
// the filterdata method first filters the front page news
// then filters out the empty titles (news articles that have "no title" as title)
// this filtered data is sent do template.render to put everything in place
    var collection = {
        filterData: function(data) {
            var frontPage = data.response.docs.filter(this.filterByPage);
            var emptyPage = frontPage.filter(this.deleteEmpty);
            template.render(emptyPage);
        },
        filterByPage: function(item) {
            if(item.print_page == "1"){
                return item;
            };
        },
        deleteEmpty: function(item) {
            if(item.headline.main.includes("No Title")) {
                return;
            } else {
                return item;
            }
        },
// this does work on console.log but not on return
        selectSubjects: function(subjectArray) {
            var subjectValue = subjectArray.forEach(function (item) {
                // console.log(item.value)
                return item.value
            })
            // var legendData = subjectValue.map(function(item) {
            //     return {
            //         space: "SPACE AND UPPER ATMOSPHERE"
            //     }
            // })
        },
    }

// this object renders the data to the template
// method render makes up an array with .map of all selected pieces of data
// the method filterSubject filters out the value of only subjects within keywords
// Transparency.render selects the HTML element and injects the data accordingly
    var template = {
        render : function(data, storyid){
            var self = this;
            var templateData = data.map(function(i) {
                var subjectArray = i.keywords.filter(self.filterSubject);
                // var authorArray = i.byline.filter(self.filterAuthor);
                console.log(i.byline)
                return {
                    snippet: i.snippet,
                    source: i.source,
                    main: i.headline.main,
                    lead: i.lead_paragraph,
                    abstract: i.abstract,
                    url: i.web_url,
                    subject: subjectArray,
                    date: i.pub_date,
                    // author: authorArray,
                    id: i._id
                }
            });

            var directives = {
                detail_url: {
                    href() {
                        return "#detail/" + this.id;
                    }
                }
            }
            
            console.log(templateData)
            if(document.querySelector(".active").id === "start"){
                 Transparency.render(document.getElementById('start'), templateData, directives);
            } else if(document.querySelector(".active").id === "detail") {
                Transparency.render(document.getElementById('detail'), templateData[storyid]);
            }
        },
        filterSubject: function(item) {             
            if (item.name === "subject") {
                return item
            } else {
                return;
            }
        },
        filterAuthor: function(item) {
            if (item.original == "original") {
                return item
            } else {
                return;
            }
        },
        toggle: function(route) {
            var articles = document.querySelectorAll("article");
            articles.forEach(function (item) {
                item.classList.remove("active");
                if(item.id === route) {
                    item.classList.add("active")
                }
            })
        }
        // toggle: function (route) {
		// 	var section = document.querySelectorAll("article");
		// 	var current = document.querySelector(route);

		// 	section.forEach(function (item) {
		// 		if (item === current) {
		// 			item.classList.add('active');
		// 		} else {
		// 			item.classList.remove('active');
		// 		}
		// 	});
		// }
    }

// start the application 
    app.init();
})();


