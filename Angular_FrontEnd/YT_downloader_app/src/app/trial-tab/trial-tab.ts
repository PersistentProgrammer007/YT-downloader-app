import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trial-tab',
  imports: [CommonModule],
  templateUrl: './trial-tab.html',
  styleUrl: './trial-tab.css',
})
export class TrialTab {

  tabs = signal([
  
    {id: 'vid/short', title: 'Video/shorts', cls: 'px-6 py-2 rounded-lg bg-primary-container text-on-primary-container font-label-caps text-label-caps transition-all duration-200 active:scale-95'},
    {id: 'playlist', title: 'Playlist', cls: 'px-6 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high font-label-caps text-label-caps transition-all duration-200 active:scale-95'}
  
  ]);
  // Track active tab index
  activeTab = signal(0);

  // selectTab(index: number): void {
  //   this.activeTab.set(index);
  // }

}
