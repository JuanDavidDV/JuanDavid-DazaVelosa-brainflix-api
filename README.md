## BrainFlix Back-End API

API instructions: <a href="https://unit-3-project-api-0a5620414506.herokuapp.com/" target="_blank">BrainFlix API</a>
<br/>
These API instructions were created by: <a href="https://brainstation.io/" targte="_blank">BrainStation</a>

## How to run this project?
- To run the project use: `$ npm run dev`

## Installed Packages
- [npm axios](https://www.npmjs.com/package/axios)    
    - Installation:
    `$ npm install axios`

- [npm cors](https://www.npmjs.com/package/cors)    
    - Installation:
    `$ npm install cors`

- [npm dotenv](https://www.npmjs.com/package/dotenv)    
    - Installation:
    `$ npm install dotenv --save`

- [npm express](https://www.npmjs.com/package/express)    
    - Installation:
    `$ npm install express`

- [npm nodemon](https://www.npmjs.com/package/nodemon)    
    - Installation:
    `$ npm install -g nodemon`

- [npm react-router-dom](https://www.npmjs.com/package/react-router-dom)
    - Installation:
    `$ npm install react-router-dom`

- [npm uuid](https://www.npmjs.com/package/uuid)    
    - Installation:
    `$ npm install uuid`

## API Routes and Methods
#### GET /videos
- Returns an array of video objects

#### GET /videos/:id
- Returns a detailed object of a single video

#### POST /videos/:id/comments
- Creates a new comment for a specific video
- Request body must have a "name" and "comment"

#### POST /videos
- Creates a new video and adds to existing array of video objects
- Request body must contain video title, description, and thumbnail image

#### PUT /videos/:id/likes
- Returns the video object with updated number of likes
- Increments the number of likes for a specific video object

#### DELETE /videos/:videoId/comments/:commentId
- Deletes the given comment and returns it in the response body


## Technologies used to develop this project:
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,vite,js,npm,nodejs,express,sass" />
  </a>
</p>