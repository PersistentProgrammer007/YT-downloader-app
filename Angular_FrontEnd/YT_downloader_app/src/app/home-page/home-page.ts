import { Component ,signal, inject, OnInit} from '@angular/core';
import { Header } from "../common_components/header/header";
import { TrialTab } from "../trial-tab/trial-tab";

import { RouterLink , RouterLinkActive } from '@angular/router';
import { Tabs } from "../common_components/tabs/tabs";
import { Fetch } from "../common_components/fetch/fetch";

import { YoutubeClient } from "../services/youtube-client"
import { VideoDetails } from '../Models/VideoMetadata'

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, RouterLinkActive, Tabs, Fetch],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  standalone: true
})
export class HomePage implements OnInit{


  fetchText = signal("Fetch");
  phText = signal("Paste Youtube video or short URL here");

  // videoMetadata = {id: 1 ,title: 'Modern UI Design Trends 2024 - Full Masterclass', uploaderName: 'Design Academy', video_age: '2 days ago', duration: '12:45',
  //     formats: ['1080p(mp4) - 240mb', '720p(mp4) - 180mb'], thumbnailPath: ''
  //   }

  youtubeService = inject(YoutubeClient);

  video = signal<Partial<VideoDetails>>({});

 getVideoDetails(event : Event, url:string) : void {

  event.preventDefault();

    this.youtubeService.getVideoMetadata(url.trim())
    .subscribe({
    
      next: (data) => {

        let imagePath : string = "http://localhost:3000/thumbnails/" + data.thumbnailFileName;
        data.thumbnailFileName = imagePath;

        this.video.set(data)
      },

      error: (err) => {
        console.log('API error: ' + err);
      }

    });

 }
  

  ngOnInit(): void {

    // console.log(this.youtubeService.data)

    // // this.youtubeService.getVideoMetadata()
    
    // //AFTER api call

    // let imagePath : string = "thumbnails/" + this.youtubeService.data.thumbnailFileName
    // this.youtubeService.data.thumbnailFileName = imagePath;



    // this.data.set(this.youtubeService.data);
  }


}

  // title = "its working, the home page!";


  // activeClass = 'px-6 py-2 rounded-lg bg-primary-container text-on-primary-container font-label-caps text-label-caps transition-all duration-200 active:scale-95';

  // inactiveClass = 'px-6 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high font-label-caps text-label-caps transition-all duration-200 active:scale-95'
  

  // tabs = signal([
  
  //   {id: 'vid/short', title: 'Video/shorts', link: '/'},
  //   {id: 'playlist', title: 'Playlist', link: '/vplaylist'}
  
  // ]);

  // // Track active tab index
  // activeTab = signal(0);

  // // on click function: 

  // getButtonText() : string {

  //   if(this.activeTab() === 0)
  //     return 'Fetch';
  //   else 
  //     return 'Fetch Playlist';

  // }

  // getPlaceholder() : string {

  //   if(this.activeTab() === 0)
  //     return 'paste video/short URL here...';
  //   else
  //     return "paste Your own or other creator's playlist here";

  // }

  // getMainClass() : string {
  //   if(this.activeTab() === 0) 
  //     return 'max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24 min-h-screen';
  //   else 
  //     return 'flex-grow max-w-container-max mx-auto w-full px-margin-mobile md:px-gutter py-12';
  // }