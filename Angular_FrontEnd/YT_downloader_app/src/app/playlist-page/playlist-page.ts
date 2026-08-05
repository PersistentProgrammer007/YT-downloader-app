import { Component, signal} from '@angular/core';
import { Tabs } from "../common_components/tabs/tabs";
import { Fetch } from "../common_components/fetch/fetch";

import { ListItem } from "../common_components/list-item/list-item";

@Component({
  selector: 'app-playlist-page',
  imports: [Tabs, Fetch, ListItem],
  templateUrl: './playlist-page.html',
  styleUrl: './playlist-page.css',
})
export class PlaylistPage {

  
  fetchText = signal("Fetch Playlist");
  phText = signal("Paste your own created or other creator's playlist URL here.");

  videometadata = signal([
    {id: 1 ,title: 'Modern UI Design Trends 2024 - Full Masterclass', uploaderName: 'Design Academy', video_age: '2 days ago', duration: '12:45',
      formats: ['1080p(mp4) - 240mb', '720p(mp4) - 180mb'], thumbnailPath: ''
    },
    {id: 2 ,title: '2 Modern UI Design Trends 2024 - Full Masterclass', uploaderName: '2 Design Academy', video_age: '4 days ago', duration: '15:45',
      formats: ['1080(mp4) - 300mb', '720p(mp4) - 200mb'], thumbnailPath: ''
    }
  ]);

}
