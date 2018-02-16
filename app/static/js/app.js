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
            routie ({
                "": function() {

                },
                "military": function(){
                }
            });
            // window.addEventListener("hashchange", function() {
            //     var route = window.location.hash;
            //     template.toggle(route);
            // });

            api.getData();
        }
    }
    var api = {
        getData:function(route){
            var url = settings.url+ "?api-key=" +settings.apiKey;
            console.log(url);
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.onload = function(resolve, reject) {
                if (request.status >=200 && request.status < 300) {
                    var data = JSON.parse(request.responseText);
                    console.log(data);
                }
            }
            request.send();
        }
    }



    // render and toggle sections
    var template = {

    }

    var hello = {
        hello: "Hello!",
        hi: "Hi there!",
        span: "Goodbye!"
      };

    Transparency.render(document.getElementById('template'), hello);


    // start the application 
    app.init();
})();


