

##### Step 1:
#### Loading the API

The API is from New York Times Archive. With this API you can get articles from any month since 1851. I choose to get articles dating from August 1969. In this month, the Vietnam War was still on, Nixon just became president, the U.S. recieved photo's from Mars from the first time, the Manson Family strook and Woodstock happened. 

_Next year this will be 50 years ago._

Getting the json file was harder than I anticipated, since I misunderstood the api url at first. The given parameters represented the year and month, I though I had to bring in all the years and later filter.

Right now, the object that loads my API looks like this:
```javascript
var settings = {
        url: "https://api.nytimes.com/svc/archive/v1/1969/8.json",
        apiKey: "95471ed858c04cbe81da960e4f866116",
    }
```
In the object API, the data is requested with the key and API url. The request is stored as a new XMLHttpRequest (so it has the same built-in object types).

Then, .onload is used on the new request. This function will refer to collection.filterdata. The data will be filtered here, before it is send.

```javascript
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
```

#### Filtering the data and using Transparency

At first, I got back an Array of 8505 lines of data. Under the copyright, inside the response and inside the docs was this array, consisting of objects. One object looked like this: 
```json

abstract
:
null
blog
:
[]
byline
:
{person: Array(0), original: ".Slotl to ew ork Tlm ..i"}
document_type
:
"article"
headline
:
{main: "-Doeto to Wed i.i'MiSs Pickard", kicker: "1"}
keywords
:
[]
lead_paragraph
:
null
multimedia
:
[]
news_desk
:
null
print_page
:
"21"
pub_date
:
"1969-08-01T00:00:00Z"
section_name
:
null
slideshow_credits
:
null
snippet
:
null
source
:
"The New York Times"
subsection_name
:
null
type_of_material
:
"Marriage Announcement"
web_url
:
"https://query.nytimes.com/gst/abstract.html?res=9500E6D71E3AEE34BC4953DFBE668382679EDE"
word_count
:
129
_id
:
"4fc4692145c1498b0d9ad78c"
```
There are a lot of elements I can use, but also a lot I have to get rid of. But first, I have to filter the data to get a little less than 8000 lines back. 

Inside the object collection, before sending the request, I filtered out a few things. Since I only want front page news, I filtered out all values of "1" for print_page.

```javascript
    filterByPage: function(item) {
        if(item.print_page == "1"){
            return item;
        };
    },
```

Then, I wanted to get rid of all objects without context. Luckily, these all had "no title" in their headline element. 
```javascript
    deleteEmpty: function(item) {
        if(item.headline.main.includes("No Title")) {
            return;
        } else {
            return item;
        }
    }
```

These functions were both stored in collection.filterData like this:
```javascript
filterData: function(data) {
        console.log(data)
        var frontPage = data.response.docs.filter(this.filterByPage);
        var emptyPage = frontPage.filter(this.deleteEmpty);
        template.render(emptyPage);
    },
```
Then, they were redirected to template.render where I use .map to make a new object containing all the elements from the dataset I'd like to use. This makes it really easy to use Transparency and inject the data into the HTML.

The biggest problem I had were the subjects, which play a big role in my plan. They were nested inside keywords, but were siblings of "persons" and "glocations".

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

I first had to filter out all the objects with the name "subject" and get their value. After this, I had to inject these values in the HTML. First I wrote a function to return an array of strings, consisting the values. This didn't work with Transparency. The solution I needed was way simpler. When I got back an array with name: subject, value: "moon" for example, all I had to do was assign these to an ul in the HTML.

```html
<ul data-bind="subject" id="subject">
    <li data-bind="value" class="value"></li>
</ul>
```
This was the function I used to filter out the subject and values, directed by the map function to store all elements from the code:

```javascript
ilterSubject: function(item) {             
            if (item.name === "subject") {
                return item
            } else {
                return;
            }
        }
```

#### Using Routie

I'm still working on this, haven't made it to the finishline yet.

## Packages
The packages used are:
- [Routie](https://github.com/jgallen23/routie) for routing
- [Transparency](http://leonidas.github.io/transparency/) for templating


## Actor diagram
This diagram shows what objects I use in my IFFE.

![Diagram of actors](https://github.com/leoniesmits)

Any other diagrams won't make any sense, since I'm not finished at all.

## What I still have to do:

a lot

# License
MIT - Leonie Smits