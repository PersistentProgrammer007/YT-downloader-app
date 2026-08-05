import { Component, input } from '@angular/core';

@Component({
  selector: 'app-fetch',
  imports: [],
  templateUrl: './fetch.html',
  styleUrl: './fetch.css',
})
export class Fetch {

  fetchText = input();

  placeholderText = input();

}
