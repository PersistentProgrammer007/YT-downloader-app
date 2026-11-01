
import express from 'express';
import cors from 'cors';
import youtubedl from 'youtube-dl-exec';

import fs from 'fs/promises';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import downloadRouter from './download.js'

const app = express();

app.use(express.json());

// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type']
// }));

app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200']
}))


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/thumbnails', express.static(path.join(__dirname, 'thumbnails')));

app.use('/download', downloadRouter);

// cors setup is remaining: 

app.get('/', (_, res) => {

    let msg = "hello from express";

    res.send(msg);
});

// video webpage endpoints: 

// Ensure a directory exists for saving thumbnails
const THUMBNAIL_DIR = path.join("H:/College and programming related/MSCIT/Sem 3/Project/YT download app/Express_Backend", 'thumbnails');
fs.mkdir(THUMBNAIL_DIR, { recursive: true }).catch(console.error);

/**
 
helper 
 
 */

function formatDuration(totalSeconds) {
    if (!totalSeconds) return '0:00';
    
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.floor(totalSeconds % 60);

    const paddedSecs = secs.toString().padStart(2, '0');

    if (hrs > 0) {
        const paddedMins = mins.toString().padStart(2, '0');
        return `${hrs}:${paddedMins}:${paddedSecs}`; // e.g. "1:05:23"
    }
    
    return `${mins}:${paddedSecs}`; // e.g. "12:45"
}

/**
 * Helper: Downloads the thumbnail image and returns the saved filename.
 */
async function downloadThumbnail(thumbnailUrl, videoId) {

    const response = await fetch(thumbnailUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch thumbnail: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Determine extension from content-type or URL fallback
    const contentType = response.headers.get('content-type') || '';
    let ext = '.jpg';
    if (contentType.includes('png')) ext = '.png';
    else if (contentType.includes('webp')) ext = '.webp';

    const fileName = `${videoId || Date.now()}_thumbnail${ext}`;
    const filePath = path.join(THUMBNAIL_DIR, fileName);

    // console.log("filePath is: " + filePath);

    await fs.writeFile(filePath, buffer);
    return fileName;
}

/**
 * Helper: Calculates video age in years and months from YYYYMMDD upload_date string.
 */
function calculateVideoAge(uploadDateStr) {
    if (!uploadDateStr || uploadDateStr.length !== 8) return 'Unknown age';

    const year = parseInt(uploadDateStr.slice(0, 4), 10);
    const month = parseInt(uploadDateStr.slice(4, 6), 10) - 1; // 0-indexed
    const day = parseInt(uploadDateStr.slice(6, 8), 10);

    const uploadDate = new Date(year, month, day);
    const now = new Date();

    let years = now.getFullYear() - uploadDate.getFullYear();
    let months = now.getMonth() - uploadDate.getMonth();

    if (now.getDate() < uploadDate.getDate()) {
        months--;
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    const yearStr = years === 1 ? '1 year' : `${years} years`;
    const monthStr = months === 1 ? '1 month' : `${months} months`;
    return `${yearStr}, ${monthStr}`;
}

/**
 * Helper: Formats file size into MB or GB.
 * Falls back to estimation via total bitrate (tbr) and duration if filesize is missing.
 */
function formatSize(format, duration) {
    let bytes = format.filesize || format.filesize_approx;

    // Estimate size from total bitrate (tbr in kbps) if bytes aren't provided by the manifest
    if (!bytes && format.tbr && duration) {
        bytes = (format.tbr * 1000 / 8) * duration;
    }

    if (!bytes) return 'Size Unknown';

    const GB = 1024 * 1024 * 1024;
    const MB = 1024 * 1024;

    if (bytes >= GB) {
        return `${(bytes / GB).toFixed(2)} GB`;
    }
    return `${(bytes / MB).toFixed(2)} MB`;
}

/**
 * Helper: Extracts the top 4 unique video resolutions sorted highest to lowest.
 */

function getTop4VideoFormats(formats) {
    // 1. Find the largest audio-only track to estimate the audio size
    const audioTracks = formats.filter(f => f.vcodec === 'none' && f.acodec !== 'none');
    const bestAudioSize = audioTracks.reduce((max, f) => {
        const size = f.filesize || f.filesize_approx || 0;
        return size > max ? size : max;
    }, 0);

    // 2. Filter for tracks that actually contain video and have a valid height
    const videoFormats = formats.filter(f => f.vcodec !== 'none' && f.vcodec != null && f.height);

    // 3. Deduplicate by resolution (keep only the best quality version of each resolution)
    const uniqueResolutions = {};
    for (const f of videoFormats) {
        const height = f.height;
        const size = f.filesize || f.filesize_approx || 0;
        
        // If the video track lacks audio, add the best audio size to it
        const hasAudio = f.acodec !== 'none' && f.acodec != null;
        const totalSizeBytes = hasAudio ? size : size + bestAudioSize;
        
        // Skip formats where we have absolutely no size data
        if (totalSizeBytes === 0) continue;

        // Keep the version with the highest size/bitrate for this resolution
        if (!uniqueResolutions[height] || totalSizeBytes > uniqueResolutions[height].totalSizeBytes) {
            uniqueResolutions[height] = {
                resolution: `${height}p`,
                ext: f.ext === 'webm' ? 'mp4' : f.ext, // Browsers often merge webm/mp4 DASH into MP4
                totalSizeBytes: totalSizeBytes
            };
        }
    }

    // 4. Sort by resolution descending (1080p, 720p, 480p, etc.) and grab the top 4
    const sortedFormats = Object.values(uniqueResolutions)
        .sort((a, b) => parseInt(b.resolution) - parseInt(a.resolution))
        .slice(0, 4);

    // 5. Format them into readable strings (e.g., "1080p - MP4 - 26.50 MB")
    return sortedFormats.map(f => {
        const sizeMb = (f.totalSizeBytes / (1024 * 1024)).toFixed(2);
        return `${f.resolution} - ${f.ext.toUpperCase()}`;
    });
}

app.post('/video/get-metadata', async (req, res) => {

    console.log("endpoint running!");

    const url  = req.body.url;

    // console.log("in here, url is : " + url);

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        
        const output = await youtubedl(url, {
            dumpSingleJson: true,
            noWarnings: true,
            preferFreeFormats: true
        });

        // 1. Download the thumbnail image locally and get the file name
        let thumbnailFileName = null;
        if (output.thumbnail) {
            thumbnailFileName = await downloadThumbnail(output.thumbnail, output.id);
        }

        // 2. Format upload date (YYYYMMDD -> DD-MM-YY)
        const rawDate = output.upload_date || '';
        const formattedDate = rawDate.length === 8 
            ? `${rawDate.slice(6, 8)}-${rawDate.slice(4, 6)}-${rawDate.slice(2, 4)}`
            : rawDate;

        // console.log(formattedDate);


        // 3. Get top 4 best video formats formatted as strings        
        const top4Formats = getTop4VideoFormats(output.formats);
        console.log("adjusted formats: ", top4Formats);
        

        const totalSeconds = output.duration || 0;
        const formattedDuration = formatDuration(totalSeconds);

        res.json({
            title: output.title || 'Unknown Title',
            uploader: output.uploader || output.channel || 'Unknown Uploader',
            uploadDate: formattedDate,
            videoAge: calculateVideoAge(rawDate) + " Ago",
            thumbnailFileName: thumbnailFileName,
            formats: top4Formats,
            duration: formattedDuration
        });

    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch video details',
            details: error.message
        });
    }
});

app.post('/video/get-metadata1', async (req, res) => {
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

app.post('/playlist/get-metadata', async (req, res) => {

    console.log("hello from playlist metadata");

    const url = req.body.url;   // playlist link!

    if (!url) {
        return res.status(400).json({ error: 'Playlist URL is required' });
    }

    try {
        const output = await youtubedl(url, {
            dumpSingleJson: true, // Returns the entire playlist as one JSON object
            flatPlaylist: true,   // FAST EXTRACT: Gets just titles/URLs/durations, skips heavy video format extraction
            noWarnings: true
        });

        // 'output' now represents the Playlist object
        // 'output.entries' contains an array of the videos in the playlist

        
        const playlistTitle = output.title || 'Unknown Playlist';
        const channelName = output.channel || output.uploader || 'Unknown Channel';
        const totalVideos = output.entries ? output.entries.length : 0;

        console.log("total videos: " + totalVideos);

        // Map through the entries to format the video list
        // const videoDetails = await Promise.all(
        //     (output.entries || []).map(async (video, index) => {

        // let thumbnailFileName = null;
        // if (video.thumbnail) {
        //     thumbnailFileName = await downloadThumbnail(video.thumbnail, video.id);
        // }
        
        //     return {
        //         index: index + 1,
        //         title: video.title,
        //         uploader: video.uploader || channelName,
    
        //         thumbnailFileName: thumbnailFileName,
        //         url: video.url,
        //         duration: formatDuration(video.duration || 0), 
        //     };
        // })
        // );

        const videoDetails = (output.entries || []).map((video, index) => {
            const rawDate = video.upload_date;
            const videoAgeString = rawDate ? calculateVideoAge(rawDate) + " Ago" : "Date unknown";

            // yt-dlp flat-playlists often put thumbnails in an array. 
            // Grab the last one in the array (usually the highest resolution), or fallback to the single string.
            let thumbnailUrl = null;
            if (video.thumbnails && video.thumbnails.length > 0) {
                thumbnailUrl = video.thumbnails[video.thumbnails.length - 1].url;
            } else if (video.thumbnail) {
                thumbnailUrl = video.thumbnail;
            }

            return {
                index: index + 1,
                title: video.title,
                uploader: video.uploader || channelName,

                // Send the URL directly! No more 'await downloadThumbnail()'
                thumbnailUrl: thumbnailUrl, 
                url: video.url,
                duration: formatDuration(video.duration || 0)
            };
        });

        res.json({
            p_title: playlistTitle,
            channel: channelName,
            totalVideos: totalVideos,
            videos: videoDetails
        });

    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch playlist details',
            details: error.message
        });
    }
})

app.post('/playlist/download-all', (reqURL, res) => {
    // should return task_id for the client app to poll constantly!
})

// music webpage endpoints:

app.listen(3000, () => {
    console.log("server is up and running!");
})