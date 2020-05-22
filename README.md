# Travel App

## Overview
This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 

## Variable notes
NOTE that you must change the donenv variables.  See the .end.example file for detials

## Building process

1. Set up the folders, create config files, install
    - Initial js, html, and css files came from project 3 (weatehr-journal-app)
    - Initial config, json, env, gitignore, and babelrc files came from project 4 (evaluate-news-nlp)
2. Run npm run build to create the dist folder
3. Create an account with GeoNames: http://www.geonames.org/export/web-services.html
4. Call the GeoNames API to get the lat/lon and country of a given city
5. Put list of results from GeoNames into a dropdown
6. Have user select the trip date
7. Search for a picture of the selected location via pixabay
  - Call multiple times if nothing comes up initially
8. Use weatherbit.io to get the weather.  This part is slightly confusing since the directions are a bit wierd.
```
If the trip is within a week, you will get the current weather forecast.
If the trip is in the future, you will get a predicted forecast.
```
- I interpreted this to mean, get the current weather of the location and get the forcast if the trip is within 16 days.  There's no forcast pst 16 days
9. Create a card to add to the document that displays the trip date, weather, a picture, and the forcast if applicable
10. Refactored and formatted code
11. Created and ran a few jest tests


## Exteded options
- Added way for user to delete a trip
- Pulled an image of a country or state if the specific place did not have a result
- Pulls forcast for up to 3 days
- User can add multple trips

## Notes
Tips:
  - Ctrl+~ opens the terminal
  - Ctrl+C stops a server when running in the terminal
  - To run the Express server use:
    - npm run start
  - Remeber to use the argument --save-dev when installing packages via npm

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