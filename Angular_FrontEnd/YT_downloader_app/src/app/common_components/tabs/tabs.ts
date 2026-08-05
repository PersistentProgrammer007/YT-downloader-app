import { Component, signal } from '@angular/core';

import { RouterLink , RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-tabs',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
})
export class Tabs {

    activeClass = 'px-6 py-2 rounded-lg bg-primary-container text-on-primary-container font-label-caps text-label-caps transition-all duration-200 active:scale-95';

  inactiveClass = 'px-6 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high font-label-caps text-label-caps transition-all duration-200 active:scale-95'
  


   tabs = signal([
  
    {id: 'vid/short', title: 'Video/shorts', link: '/'},
    {id: 'playlist', title: 'Playlist', link: '/vplaylist'}
  
  ]);

  // Track active tab index
  activeTab = signal(0);


}
