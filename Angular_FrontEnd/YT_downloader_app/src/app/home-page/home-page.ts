import { Component ,signal} from '@angular/core';
import { Header } from "../common_components/header/header";
import { TrialTab } from "../trial-tab/trial-tab";

import { RouterLink , RouterLinkActive } from '@angular/router';
import { Tabs } from "../common_components/tabs/tabs";
import { Fetch } from "../common_components/fetch/fetch";

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, RouterLinkActive, Tabs, Fetch],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  standalone: true
})
export class HomePage {


  fetchText = signal("Fetch");
  phText = signal("Paste Youtube video or short URL here");

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

}
