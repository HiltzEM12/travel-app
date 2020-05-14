# Travel App

## Overview
This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 

## Building process

1. Set up the folders, create config files, install
    - Initial js, html, and css files came from project 3 (weatehr-journal-app)
    - Initial config, json, env, gitignore, and babelrc files came from project 4 (evaluate-news-nlp)
2. Run npm run build to create the dist folder
3. Create an account with GeoNames: http://www.geonames.org/export/web-services.html
4. Call the GeoNames API to get the lat/lon and country of a given city


## Notes
Tips:
  - Ctrl+~ opens the terminal
  - Ctrl+C stops a server when running in the terminal
  - To run the Express server use:
    - npm run start

Getting started:
** Run as admin
1. Set up git (make sure you're in the correct directory)
  - clone the repository to your machine then go to the folder and run the following:
    - git init
    - git add .
    - git commit -m "Initial commit"
  - Create repository in gitHub then go back to bash and run the following:
    - git remote add origin repositoryurl
    - git push -u origin master
2. install the program via the following:
  - npm install
3. check to see if the install worked
  - npm run dev
4. check if it compiles:
  - npm run build
  - as you change the code and add features, you'll need to install other packages to get this running"
    - npm i packagename