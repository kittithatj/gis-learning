import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommentComponent } from '../comment/comment.component';
import { MapComponent } from '../map/map.component';
import { MapIdentifyComponent } from '../map-identify/map-identify.component';
import { LocatorComponent } from '../locator/locator.component';

const routes: Routes = [
  {
    path: '',
    component: CommentComponent,
  },
  {
    path: 'map',
    component: MapComponent,
  },
  {
    path: 'map/identify',
    component: MapIdentifyComponent,
  },
  {
    path: 'locator',
    component: LocatorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignmentRoutingModule { }