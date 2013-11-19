### Please help to improve this documentation by forking the repo and then submitting a pull request.

## ISEGI - UNL Open Source Campus Map Project

This repository contains the files used to produce the UNL Campolide Map that is available at http://novagis.github.io/os_campus_map/

This map is the result of a project to produce remake the current campus that was origninally produced by another team of students of the [http://mastergeotech.info/](Msc. Geospatial Technologies)

### How it works

We are using a number of different pieces of software and products to produce this map. Each of these will be described below:

#### Github Pages
We use the power of github page to serve up our web map website.

You can find out more information on how this works please see http://pages.github.com/

#### Mapbox
We are using a number of different tools produced by mapbox include the [https://www.mapbox.com/mapbox.js/api/](mapbox.js), [https://www.mapbox.com/tilemill/](tilemill) and [https://www.mapbox.com/plans/](mapbox hosting).

The basemap for our maps including the sateillite layer are styled and produced in Tilemill and then those layers are uploaded into Mapbox hosting.

The styles used to produce the basemaps and their respective layers are contained in this repository. 

**Tilemill Styles** - located in the **X folder**

**Shapefiles** - shapefiles are located in the **/map_files/shapefiles** folder

### Updating this repository and the Map

First you should fork this repository by clicking Fork above.

Then you should clone this new repository to your own comupter using:

	git clone git@github.com:XXXX/xxxxx.git
	
To view the site on your computer you must first have **ruby** and the **jekyll** gem installed on your machine and available to the terminal.

	cd github/os_campus_map

To serve up the site you just run the command below:

	jekyll serve --baseurl '' --watch

This will then serve up your website at the following address so put this into your browser address bar

	http://localhost:4000/

Next you should open your favourite text editor and make your changes.

Commit these changes to the repository and push them to your github repo.

When you are happy with these changes and you should then submit a pull request to NOVAGIS repo and your changes will be reviewed and tested before being merged into the repo.
	
Make your changes 

Basically all you need to do is clone this repository to your local computer and follow this simple workflow when you make changes aka add new documents or plans or information to the folders.


### Repo Structure

There is one branch in this repo and that is **gh-pages** Everything in this branch will be published publicly.

Anything that goes into the github pages branch will be generated into static html by the Jekyll Templating Engine. Read more at http://pages.github.com/

What this means is we will have a website available at http://novagis.github.io/os_campus_map/


