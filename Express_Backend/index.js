
import express from 'express';
import cors from 'cors';
import youtubedl from 'youtube-dl-exec';

const app = express();

app.use(express.json());

// cors setup is remaining: 

app.get('/', (_, res) => {

    let msg = "hello from express";

    res.send(msg);
});

// video webpage endpoints: 

app.post('/video/get-metadata', async (req, res) => {
    // should return video title, uploader name, upload date, video age (in years and months), thumbnail 
    // and available quality formats with their size in MB/GB


    const { url } = req.body;

    try { 

       const output = await youtubedl(url, {
            dumpSingleJson: true,
            noWarnings: true,
            preferFreeFormats: true
        });

        res.json({
            title: output.title,
            duration: output.duration,
            thumbnail: output.thumbnail,
            formats: output.formats.map(f => ({ format_id: f.format_id, ext: f.ext }))
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch video details', details: error.message });
    }
    
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