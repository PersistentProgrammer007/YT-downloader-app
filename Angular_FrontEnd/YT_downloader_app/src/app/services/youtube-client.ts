import { Injectable } from '@angular/core';
import { VideoDetails } from '../Models/VideoMetadata'

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Global service! 
})
export class YoutubeClient {

  private baseUrl = "http://localhost:3000";

  arr: Array<string> = ["format1", "format2", "format3"]

  data: VideoDetails = {
    title: "kavpurav gouram",
    uploader: "Shiv",
    uploadDate: "20-10-2018",
    videoAge: "4 years",
    thumbnailFileName: "ttmecaJuh1o_thumbnail.jpg",
    formats: this.arr,
    duration: "4:35"
  }

  constructor(private http: HttpClient) { }

  getVideoMetadata(videourl : string) : Observable<VideoDetails> {
    return this.http.post<VideoDetails>(`${this.baseUrl}/video/get-metadata`, {url: videourl})
  }



}
