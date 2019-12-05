## Setup environment

### Install Node & NPM if you don't have it

https://nodejs.org/en/

### Install docsify 
``npm i docsify-cli -g``

### Clone this repo and delete the .git foder
``git clone https://github.com/rasensio/aws-workshop.git MY_WORKSHOP``

### Preview your site
Get into the root of the site and run this command to start editing and live previewing

``docsify serve``

## Customize your site

You will modify this basic pages to get started. After that you'll start writing your doc

### index.html
* Change the ``<title></title>`` attribute with your workshop name
* In the window.$docsify initialization script , modify the ``name`` attribute for your workshop name, ``editInGithubUrl`` and github ``repo``

### _coverpage.md

This is the page that will be seen first. 

* Change the ``ABC Workshop`` for your own.
* Add a description
  
### _navbar.md

* Change the second link to the main documentation of the topic you are addressing
* Feel free to completely modify these links, don't add more than 3 if possible

### _sidebar.md

This is where the left sidebar content is written. You will revisit this page a lot during the creation of your workshop. A set of sample pages is attached

* Add and remove sections at will. 

Each section should have this format

```
- Excersise #1

  - [Do step C](2-excersice-1/1-stepC.md)
  - [Do step D](2-excersice-1/2-stepD.md)
```

### init.md
* Change the title
* Add a description and a architectural diagram if you want

## Add pages
Your pages structure will be under ``1-getting-started`` where you will put your content for the workshop.

## Amplify deployment

### Add redirects

Source: `/<*>.md`
Target: `/<*>.md`

Source: `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>`
Target: `/index.html`

