import express from 'express';
import path from 'path';

import fs from 'fs';
import { fileURLToPath } from 'url';

import youtubedl from 'youtube-dl-exec';
import ffmpeg from 'ffmpeg-static';

const router = express.Router()

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// In-memory store for download progress
const jobs = new Map();
const TEMP_DIR = path.join(__dirname, 'temp');

if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
}

function getFormatSelector(quality) {
    if (!quality) return 'bestvideo+bestaudio/best';

    // Extract numbers from strings like "1080p", "720p", "1080", etc.
    const height = quality.toString().replace(/\D/g, '');

    if (!height) return 'bestvideo+bestaudio/best';

    // Pick the best video up to that height + best audio
    return `bestvideo[height<=${height}]+bestaudio/best[height<=${height}]`;
}

function getFormatSelector2(quality) {
    if (!quality) return 'bestvideo+bestaudio/best';

    // Matches the first group of numbers (e.g., "360" from "360p - MP4 - 426.52 MB")
    const match = quality.toString().match(/^(\d+)/);
    const height = match ? match[1] : null;

    if (!height) return 'bestvideo+bestaudio/best';

    // Pick the best video up to that height + best audio
    return `bestvideo[height<=${height}]+bestaudio/best[height<=${height}]`;
}

// 1. Start Download Endpoint
router.post('/start', (req, res) => {

    const { url, format, title} = req.body;

    console.log("here! url = " + url + " and format = " + format + " also title: " + title);

    
    const jobId = Date.now().toString(); 
    const filePath = path.join(TEMP_DIR, `${jobId}.mp4`);

    jobs.set(jobId, { status: 'preparing', progress: 0, video_title: title });

    console.log("filepath = " + filePath);

    const formatSelector = getFormatSelector2(format);

    // Spawn the yt-dlp process
    const subprocess = youtubedl.exec(url, {
        f: `"${formatSelector}"`,
        o: `"${filePath}"`,

        mergeOutputFormat: 'mp4',

        jsRuntimes: 'node',
        extractorArgs: 'youtube:player_client=tv,web_embedded',

        ffmpegLocation: `"${ffmpeg}"`
    });


    // Listen to stdout to catch the progress percentage
    subprocess.stdout.on('data', (data) => {
        const text = data.toString();

        const currentJob = jobs.get(jobId);
        
        // Regex to extract progress like "[download]  45.0%"
        const progressMatch = text.match(/\[download\]\s+(\d+\.\d+)%/);
        if (progressMatch) {
           
            currentJob.status = 'downloading';
            currentJob.progress = parseFloat(progressMatch[1]);

        }
        
        // When ffmpeg starts merging video and audio
        if (text.includes('[Merger]')) {

            currentJob.status = 'merging';
            currentJob.progress = 100;
        }
    });

    subprocess.on('close', () => {

        const currentJob = jobs.get(jobId);

        if (currentJob) {
            currentJob.status = 'completed';
            currentJob.progress = 100;
        }
    });

    subprocess.on('error', (err) => {

        const currentJob = jobs.get(jobId);

        if (currentJob) {
            currentJob.status = 'error';
            currentJob.error = err.message;
        }

    });

    console.log("in donwload.js - " + jobId);

    res.json({ jobId });
});

// 2. Progress Checker Endpoint
router.get('/progress/:jobId', (req, res) => {
    const job = jobs.get(req.params.jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
});

// 3. Final File Delivery Endpoint
router.get('/file/:jobId', (req, res) => {
    const filePath = path.join(TEMP_DIR, `${req.params.jobId}.mp4`);

    const jobId = req.params.jobId;

    console.log("jobId given for downloading: " + jobId);
    
    const job = jobs.get(jobId);

    // console.log("title: " + job.video_title);

    let title = 'youtube_video.mp4';

    if (fs.existsSync(filePath)) {

        if(job.video_title){

            let title_words = job.video_title.split(" ");

            title = title_words[0] + " " + title_words[1] + " from YT downloader.mp4";
        }

        res.download(filePath, title, (err) => {
            // Cleanup: Delete file from server after 1 minute to save disk space
            setTimeout(() => {
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }, 60000); 
        });
    } else {

        res.status(404).send('File path ' + filePath + ' not found');
    }

    // const jobId = req.params.jobId;
    // const filePath = path.join(TEMP_DIR, `${jobId}.mp4`);
    
    // if (fs.existsSync(filePath)) {
    //     // 1. Get the job details from your store
    //     const job = jobs.get(jobId);
        
    //     // 2. Default filename fallback
    //     let fileName = 'youtube_video.mp4';
        
    //     // 3. If we have a title, sanitize it for the OS
    //     if (job && job.title) {
    //         // Replaces illegal Windows/Mac filename characters with a dash
    //         const sanitizedTitle = job.title.replace(/[/\\?%*:|"<>]/g, '-');
    //         fileName = `${sanitizedTitle}.mp4`;
    //     }

    //     // 4. Pass the custom fileName to res.download
    //     res.download(filePath, fileName, (err) => {
    //         setTimeout(() => {
    //             if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    //         }, 60000); 
    //     });
    // } else {
    //     res.status(404).send('File not found');
    // }
});


export default router;