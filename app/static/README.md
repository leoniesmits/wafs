## Week 2

I figured out what I wanted with my page and more importantly, I got an idea on how to do it.
The taken steps are: 

##### Step 1:
#### Finding a API

The API is from New York Times Archive. With this API you can get articles from any month since 1851. I choose to get articles dating from August 1969. In this month, the Vietnam War was still on, Nixon just became president, the U.S. recieved photo's from Mars from the first time, the Manson Family strook and Woodstock happened. All these things are ordened under the object keywords like this.
```json
keywords: [
{
name: "glocations",
value: "VIETNAM"
},
{
name: "glocations",
value: "VIETNAM"
},
{
name: "subject",
value: "INTERNATIONAL RELATIONS"
},
{
name: "subject",
value: "COMMUNIST-WESTERN CONFRONTATION"
},
{
name: "subject",
value: "ARMS CONTROL AND LIMITATION AND DISARMAMENT"
}
```
Besides subjects, there are "persons" and "glocations". I just focus on the subjects, since objects tend to have these more often. Also, when sorting the articles on these it gives a good view of the difference in time.

##### Step 2:
#### Figuring out how to load in the json file

Getting the json file was harder than I anticipated, since I misunderstood the api url at first. The given parameters represented the year and month, I though I had to bring in all the years and later filter.

Right now, the object that loads my API looks like this:
```javascript
var settings = {
        url: "https://api.nytimes.com/svc/archive/v1/1969/8.json",
        apiKey: "95471ed858c04cbe81da960e4f866116",
    }


...


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
```
The function has a parameter that doesn't do anything yet, but the request does work right now. The settings object defines the url and the key, in the getData function they are merged together. By printing the final url in the console, I can check if the file is correct. This is also a good way to see what the response looks like so I can organize it later in the template. 

With a function construcor, I define a new request. With the function .onload I give the parameters resolve and reject (can be used later for a promise). The request is finally send with request.send() at the end of getData function.

##### 3:
#### The routie route

In the first week, we used hashchange to assign classes to the selected list item. This week, we'll use routie to continue this practice. The route is dectected and can have a function assigned. In my design, I want to print the subject values as list items in a legend. These list items can be clicked and direct to new data in the section. I use routie for this, to render the data on the selected path. 
*don't know how yet*

##### 4:
#### Templating with transparency.js

Transparency allows you to inject data with js into your HTML that is somewhat semantic. First I tried it with just elements in HTML and putting something defined in js inside. 
```javascript
var hello = {
        hello: "Hello!",
        hi: "Hi there!",
        span: "Goodbye!"
    };

Transparency.render(document.getElementById('template'), hello);
```
```html
<section id="template">
        <div id="hello"></div>
        <div class="hi"></div>
        <span></span>
                        
</section>
```
The javascript gets the element that the data is printed into and directs to the object "hello". In this object, the names and values are defined. Inside the HTML divs and span, the js values are printed.

Now let's do this with the data from my json file. (Or let's pretend, because it hasn't worked yet).

```javascript
var newData = data.map(function (i) { //Map function thanks to Keving Wang --thanks to Chana @niyorn>
                return {
                    space: SPACE AND UPPER ATMOSPHERE, 
                    politics: POLITICS AND GOVERNMENT
                }
```
With a function like this, the data is mapped with new names. These names are easier to work with and can be directly put in the HTML with the data-bind element. This element is used if you work without JQuery. 

##### Step 4:
#### Filtering the data

Not every object in my response has keywords. Inside these keywords, the subject value is defined. I have to eliminate all the objects that have no keywords. (so when the length of keyword index is equal to 0).

##### Step 5:
#### The coloring with custom properties

I've defined the colors for all subjects in the CSS :root. My plan is to connect these variables to the new mapped array of subjects I use to get the data. This may be something I'll never get to, but I think it's a cool idea to use CSS variables with javascript

The idea is to make a legend, print the subjects as list item links and give each of them a :before that carries the color for that specific subject. Then, in the section where the articles appear, they will carry that same color. 

#### Subjects from the keyword value I will use:

- SPACE AND UPPER ATMOSPHERE
- POLITICS AND GOVERNMENT
- MILITARY ACTION
- MUSIC
- MURDERS AND ATTEMPTED MURDERS
- FEDERAL AGENCIES
- DATA PROCESSING (INFORMATION PROCESSING)

## What I still have to do:

##### Before 22/02:
- [ ] __Filter the data.__
    - [x] use .filter to make new array with data I'll use
    - [x] Take out everything I don't need/take everything I do
    - [ ] use .map to assign names to the values in object
- [ ] __Figure out how to use transparency.js.__
    - [ ] Figure out what data has to go where
    - [ ] Figure out how to put data in an object or array
- [ ] __Use routie to select data before render.__
    - [ ] Use routie to get path and inject template with data
- [ ] __Inject data into the template.__
    - [ ] Use semantic markup, make sure the needed data is in the right place
    - [ ] Figure out how to make the legend with just data from json
    - [ ] If possible, connect the custom properties and the js
- [ ] __Make the detail page.__
    - [ ] Has to be accessable through the main page section
    - [ ] Presents a little more data than the main page, maybe provides a link


##### 22/02
- [ ] __Get feedback, iterate.__

##### 23/02 
- [ ] __Push everything__


## Week 3

##### Step 5:
#### Filter the data

[Source for this practice](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

Before using request.send() to render the data, I have to filter it at first, as I'm currently recieving over 8.000 lines of JSON. I made a function inside getData, before .send, that refers to another object. This function is called collection.filter. I used an example with dummy data to see if it works:
```javascript
    var arr = [
        { print_page: "11" },
        { print_page: "1" },
        { print_page: "35" },
        { print_page: "1" },
        { },
        { id: null },
        { id: NaN },
        { id: 'undefined' }
      ];

      console.log(arr)

      var invalidEntries = 0;

      function filterByID(obj) {
          console.log(obj);
          if (obj.print_page === "1") {
            return true;
          } else {
              invalidEntries++;
              return false;
          }
      }

      var arrByID = arr.filter(filterByID);

      console.log("gefilterd",arrByID);
      console.log("verkeerde",invalidEntries);
```
I only want objects returned that have a printpage value of "1". This means the page on where the news is printed, I filter this because I only want front page news. First I print the entire array in the console and then again after the function is finished. The function filterPrintPage has a parameter obj, that holds all the objects from the array. If the printpage of object is equal to 1, return true. If not, return false. Another variable is added, called invalidEntries with value 0. This will count all the objects that are filtered out. This variable is called in the else statement, that counts all the invalid entries with ++, so I can log the number of these entries. 

In the console I recieved the following:
```javascript
(8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
app.js:100 {print_page: "11"}
app.js:100 {print_page: "1"}
app.js:100 {print_page: "35"}
app.js:100 {print_page: "1"}
app.js:100 {}
app.js:100 {id: null}
app.js:100 {id: NaN}
app.js:100 {id: "undefined"}
app.js:111 gefilterd (2) [{…}, {…}]
app.js:112 verkeerde 6
```

First the array with all objects, then all objects individually and finally the fitlered objects and number of wrong entries. 

## Actor diagram
![actor diagram](./images/actordiagram.png)

## Flow diagram
![flow diagram](./images/flowdiagram.png)



#### what we learned
##### Writing in objects

An object literal is used to structure the code. These objects have properties and methods. Something they know about themselves and something they can do.
```javascript
var obj = {
    propertyB: 1;
    methodB: function() {
        anotherObj.methodA();
    }
}

var anotherObj = {
    propertyA: "a", "b";
    methodA: function(){}
}

obj.methodB();
```

By using an IIFE, the function that holds everything calls itself. Then everything that is defined only lives in that scope. By using objects, the functions and variables can talk to each other. They can direct to each other by calling each other in functions, or giving another object as parameter. 

