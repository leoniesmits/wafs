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
        url: "https://api.nytimes.com/svc/archive/v1/2018/5.json",
        apiKey: "r8QZbMEAyISGNhszSuglD4akcNUbYeAK",
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
            routie({
				"": function () {     
                    api.getData();
                    template.toggle();
				},
				"detail/?:storyid": function (storyid) {
                    template.toggle(storyid);
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

{// this object filters all the data I need for specific elements
// the filterdata method first filters the front page news
// then filters out the empty titles (news articles that have "no title" as title)
// this filtered data is sent do template.render to put everything in place
    var collection = {
        data: [],
        filterData: function(data) {
            console.log(data)

            var frontPage = data.response.docs.filter(this.filterByPage);
            var emptyPage = frontPage.filter(this.deleteEmpty);
            this.data = emptyPage;
            collection.mapData(emptyPage);
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
        mapData: function(data, storyid){
            var self = this;
            var templateData = data.map(function(i) {
                
                var subjectArray = i.keywords.filter(collection.filterSubject);
                return {
                    snippet: i.snippet,
                    source: i.source,
                    main: i.headline.main,
                    lead: i.lead_paragraph,
                    abstract: i.abstract,
                    url: i.web_url,
                    subject: subjectArray,
                    date: i.pub_date,
                    image: i.multimedia[0].url,
                    author: i.byline.original,
                    id: i._id
                }
               
            });

            collection.data = templateData;
            template.render(data, storyid)
        },
        filterSubject: function(item) {             
            if (item.name === "subject") {
                return item
            } else {
                return;
            }  
        }
    }}

// this object renders the data to the template
// method render makes up an array with .map of all selected pieces of data
// the method filterSubject filters out the value of only subjects within keywords
// Transparency.render selects the HTML element and injects the data accordingly
    var template = {
        directive:  {
            detail_url: {
                href() {
                    return "#detail/" + this.id;
                }
            },
            image: {
                src() {
                    // console.log(this.image)
                    return "https://static01.nyt.com/" + this.image;
                }
            }
        },
        render : function(data, storyid ){
            Transparency.render(document.getElementById('start'), collection.data, template.directive);

            var loader = document.querySelectorAll('#loader');
            loader.forEach(function(i){
                i.classList.remove("active")
            })

        },
        toggle: function(id) {
            if (id) {
                var article = document.querySelector("article")
                article.classList.toggle("active");
            } else {
                var article = document.querySelector("article")
                article.classList.toggle("active")
            }

            var detail = collection.data.filter(function (story) {
                return story.id === id
            })
            
            Transparency.render(document.getElementById('detail'), detail, template.directive);
        }
    }
// start the application 
    app.init();
})();


