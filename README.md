## ISEGI MAP Progress Reports

Any documentation that we are using for the project should be stored here.

Basically all you need to do is clone this repository to your local computer and follow this simple workflow when you make changes aka add new documents or plans or information to the folders.

Clone the Repo (get your own copy of the repo to work on):

    git clone git@github.com:isegimap/campusmap_reports.git

## Updating the repo
After you commit to your local copy and before you **git push** update you should first run:

    git pull

This makes sure all the file and headers in you local copy are the up to date before therefore reducing any conflicts in the merge.

To push to github and make available for all team members you should then run

	git push or sync as it is shown in the GUI app.

### Two Branches
There are two branches on this repository which are **gh-pages** and **master**

Anything that goes into the github pages branch will be generated into static html by the Jekyll Templating Engine. Read more at http://pages.github.com/

What this means is we will have a website available at http://isegimap.github.io/campusmap_reports 

The **Master* branch will contain all our project files such as specs and documents we feel are  useful to complete the project.

If you feel like this is a poor explanation of the repo please alter this Readme as required.
