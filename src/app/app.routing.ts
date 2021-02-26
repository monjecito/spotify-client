import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UserEditComponent} from './components/user-edit/user-edit.component';
import {ArtistListComponent} from './components/artist-list/artist-list.component';
import {HomeComponent} from './components/home/home.component';
import {ArtistAddComponent} from './components/artist-add/artist-add.component';
const appRoutes: Routes = [
  
    {path:'',component:HomeComponent},
    { path: 'mis-datos', component: UserEditComponent },
    { path: 'artistas/:page', component: ArtistListComponent },
    {path:'crear-artista',component:ArtistAddComponent},
    {path:'**',component:HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);