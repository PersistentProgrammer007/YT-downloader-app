
const cors = require("cors");
const express = require("express");

const app = express();

// cors setup is remaining: 

app.get('/', (_, res) => {

    let msg = "hello from express";

    res.send(msg);
});

// video webpage endpoints: 

app.post('/video/get-metadata', (reqURL, res) => {
    // should return video title, uploader name, upload date, video age (in years and months), thumbnail 
    // and available quality formats with their size in MB/GB
    
}) 

app.post('/video/download', (reqURL, res) =>{
    // should return
    // downloaded video's path + 
})

app.post('/playlist/get-metadata', (reqURL, res) => {
    // should return a list of metadata fields listed above for all videos.
})

app.post('/playlist/download-all', (reqURL, res) => {
    // should return task_id for the client app to poll constantly!
})

// music webpage endpoints:



app.listen(3000, () => {
    console.log("server is up and running!");
})