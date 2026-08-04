import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import("./home-page/home-page").then(
                m => m.HomePage
            );
        },
    },

    {
        path: 'vplaylist',
        loadComponent: () => {
            return import("./playlist-page/playlist-page").then(
                m => m.PlaylistPage
            );
        }
    }

];
