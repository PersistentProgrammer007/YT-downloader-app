
import express from 'express';
import cors from 'cors';
import youtubedl from 'youtube-dl-exec';

import fs from 'fs/promises';
import path from 'path';

const app = express();

app.use(express.json());

// cors setup is remaining: 

app.get('/', (_, res) => {

    let msg = "hello from express";

    res.send(msg);
});

// video webpage endpoints: 

// Ensure a directory exists for saving thumbnails
const THUMBNAIL_DIR = path.join("H:/College and programming related/MSCIT/Sem 3/Project/YT download app/Angular_FrontEnd/YT_downloader_app/src/app", 'thumbnails');
fs.mkdir(THUMBNAIL_DIR, { recursive: true }).catch(console.error);

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

    console.log("filePath is: " + filePath);

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
function getTop4VideoFormats(formats = [], duration) {
    const resolutionMap = new Map();

    for (const f of formats) {
        // Only include video streams with a valid height
        if (!f.height || f.vcodec === 'none') continue;

        // If we haven't stored this height yet, or if this format prefers .mp4 / has a larger size
        const existing = resolutionMap.get(f.height);
        if (!existing || (f.ext === 'mp4' && existing.ext !== 'mp4')) {
            resolutionMap.set(f.height, f);
        }
    }

    // Sort descending by height (e.g., 1080 -> 720 -> 480 -> 360 -> 240)
    const sortedHeights = Array.from(resolutionMap.keys()).sort((a, b) => b - a);

    // Pick top 4 and format the output strings
    return sortedHeights.slice(0, 4).map(height => {
        const f = resolutionMap.get(height);
        const sizeStr = formatSize(f, duration);
        return `${height}p (.${f.ext}) ~ ${sizeStr}`;
    });
}

app.post('/video/get-metadata', async (req, res) => {
    const { url } = req.body;

    console.log("in here");

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

        // 2. Format upload date (YYYYMMDD -> YYYY-MM-DD)
        const rawDate = output.upload_date || '';
        const formattedDate = rawDate.length === 8 
            ? `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6, 8)}` 
            : rawDate;

        // 3. Get top 4 best video formats formatted as strings
        const top4Formats = getTop4VideoFormats(output.formats, output.duration);

        res.json({
            title: output.title || 'Unknown Title',
            uploader: output.uploader || output.channel || 'Unknown Uploader',
            uploadDate: formattedDate,
            videoAge: calculateVideoAge(rawDate),
            thumbnailFileName: thumbnailFileName,
            formats: top4Formats
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