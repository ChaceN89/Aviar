# Aviar
> Project Site [_here_](https://aviar.herokuapp.com/). 

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)



## General Information
- Git Hub Repository -> https://github.com/kar2fast/Aviar
- Essentially an Instagram clone meant to let users display their various form of image files through posts.
- Lets people share posts about their personal art projects
- For SENG 401 at the University of Calgary in the Winter 2022 semester
- Hosted online using Heroku



## Technologies Used
- GitHub
- Git
- MERN Stack
    - Nodejs
    - Expressjs
    - MongoDB
    - React
 - JavaScript
 - HTML
 - CSS
 - Redux toolkit
 - Heroku



## Features
- Password encryption for users
- User of Json web tokens (JWT)
- Use of a cloud database (MongoDB)
- Simple username and password login/account system
- Users can edit their account information
- Users can add posts to collections
- Collections info can be editted
- Gallery to display all posts
- Users can search form posts by a search term
- User can reset search by clicking on dashboard logo
- Users can upload their own posts
- Users can comment on any post
- Can click on a post to go to the main screen




## Screenshots
![Example screenshot](./img/screenshot.png)
<!-- If you have screenshots you'd like to share, include them here. -->


## Setup
__Dependecies Used__
<details><summary>Backend</summary>
    
    - nodemon
    - express
    - dotenv
    - colors
    - mongoose    
    - jsonwebtoken
    - bcryptjs    
    - express-async-handler   
    - express-fileupload   
    - concurrently
    
</details>
    
<details><summary>Frontend</summary>

    - react-router-dom
    - react-icons  
    - axios react-toastify 
    - react-accordion-with-header
    - react-modal 
    - react-reveal
    - react-router 
    - react-scripts
    - react-redux
    - axios
    
</details>

__How to use__
- Clone into the github
- Enter the root folder 
- Run npm install
- Enter the frontend folder 
- Run npm install
- Return to the root folder
- Add the .env file to the root directory 
    - .env file contains database information JWT secret, Port number and development type 
- Run npm run client to run just the frontend
- Run npm run server to run just the backend
- Run npm run dev to run the complete project

The Project is also deployed at this link https://aviar.herokuapp.com/


## Room for Improvement
Room for improvement:
- More features could be added
    - view your own posts
    - delete your own posts
    - A rating system for liking posts
    - system for password recovery
    - Display user information on header and on the users posts
- A better understanding of The Mern stack technologies would have helped the planning process
- A better dashboard to display more posts on the screen at on time (or an option to select differnt views)


## Acknowledgements
Give credit here.
This project was a great learning proccess and Helped the group learn about the Mern Stack and how it can be used for development
- This project was based on [this tutorial](https://www.youtube.com/playlist?list=PLx5VofXGboI3keWyKVqmEDXT4Fk-utH2P).
- Many thanks to Tim Reiner for the help with diagrams and advice for the project



