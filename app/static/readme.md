# Web App From Scratch
The course repo for 'Web App From Scratch' which has a duration of 3 weeks.

In parallel with the course [CSS To The Rescue](https://github.com/kyunwang/hva-css-minor)


## TOC

- [Getting Started](#getting-started)
- [Features](#features)
- [API](#the-used-api)
- [Packages](#packages)
- [Diagrams](#actor-and-flow-diagram)
- [Todo](#Todo)
- [Issues](#known-issues)
- [Wishlist](#wishlist)
- [Future Plan](#future-plan)

Challenges:
- Use vanilla Javascript only
- Try to use CSS Grid as main layout tool
- Microlibs may be used for templating and routing
- Implement BEM CSS class naming

## Getting started

1. Clone the repo: `git clone https://github.com/kyunwang/wafs.git`

2. Change directory to the app folder: `cd app`

3. Install the dependencies: `npm install` or if you use yarn `yarn`

4. And you are ready to go. The app will open up automatically.

## Features
- Browse Anime
- Browse Manga
- Search on users (To keep track of what you are watching yourself) - Basic
- Filter your user library on *all, currently watching, finished watching and plan to watch*
- See the users anime and manga


## The used API
This application makes use of the [Kitsu API](https://kitsu.docs.apiary.io/).

**Citation from the docs**

> Kitsu is a modern anime discovery platform that helps you track the anime you're watching, discover new anime and socialize with other fans.With the Kitsu API you can do everything the client can do and much more.API path: https://kitsu.io/api/edge


It was really easy to get basic `GET` requests but a lot of the documentation as unclear. Like how to make `POST` requests, as the required header and data has not been documented. The time taken to understand and implemment the API could have been much less if it had been beter documentated or more varied exampled were given.

At the time of using the API authorization was also not possible (At the time of writing a *Password grant has been documented*).


## Packages
The packages used are:
- [Routie](https://github.com/jgallen23/routie) for routing
- [Transparency](http://leonidas.github.io/transparency/) for templating

These packages are ok for small applications but not suitable for anything bigger than that.

Had to include `babel-polyfil` because the compiled code wouldn't work otherwise.

### Routing - Routie
A really simple hash router.
It does the job as a super simple light-weight router. A caveat is that internal linking can happen because of the hash linking. (The jumping to id's).


**Citation from the docs**
> Routie is a javascript hash routing library. It is designed for scenarios when push state is not an option (IE8 support, static/Github pages, Phonegap, simple sites, etc). It is very tiny (800 bytes gzipped), and should be able to handle all your routing needs.

Development seems to be stopped since July 2016

### Templating - Transparency
Feels really cluttered and inefficient because the templated have to be declared in the (index)html. It sadly cannot be declared elsewhere and be imported as components.

It was really abstract at the start and I needed time to get used to the way it works.

Documentation can't be said to be clear, but the it certainly helps, especially the examples.

Unlike `Pug`, `Transparancy` does render dynamically.

**Citation from the docs**
> Transparency is a semantic template engine for the browser. It maps JSON objects to DOM elements by id, class and data-bind attributes.

Development seems to be stopped since September 2015


## Actor and Flow diagram
These diagrams give a overview of the available methods and how the (data)flow goes of the application.

![Diagram of actors](https://github.com/leoniesmits)


# License
MIT - Leonie Smits