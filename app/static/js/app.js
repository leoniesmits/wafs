"use strict";
// create local scope
(function() {

    // initialize application
    var app = {
        init: function() {
            routes.init();
        }
    }

    // handle routes and states
    var routes = {
        init: function() {
            window.addEventListener("hashchange", function() {
                sections.toggle(window.location.hash);
            })
        }
    }

    // render and toggle sections
    var sections = {
        toggle:function(route) {
            var selection = document.querySelectorAll("section");
            var active = document.querySelector(`${route}`);
            console.log(selection);

    

            selection.forEach(function(selection) {
                // active.classList.toggle("active");
                selection.classList.remove("active");
                active.classList.add("active");
            });
            

        }
    }

    // start the application 
    app.init();
})()


