import { Component, input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  imports: [],
  templateUrl: './list-item.html',
  styleUrl: './list-item.css',

  host: {
    'class': 'block' // Forces <app-list-item> to be display: block
  }
  
})
export class ListItem {

  // property of video!

  title = input();
  uploaderName = input();
  duration = input();

  // thumbnail !! !! 

  uploadDate = input();

  // list of top 4 best formats: 

  video_age = input();

}
