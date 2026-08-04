import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './common_components/header/header'
import { Footer } from "./common_components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <main>
      <app-header></app-header>

      <router-outlet/>

      <app-footer/>
    </main>
  `,
  // templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('YT_downloader_app');
}
