import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';
import { LocatorComponent } from '../locator/locator.component';
import { MapComponent } from '../map/map.component';
import { MapIdentifyComponent } from '../map-identify/map-identify.component';
import { AssignmentRoutingModule } from './assignment.routing.module';
import { MapService } from '../map.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [CommentComponent, LocatorComponent, MapComponent, MapIdentifyComponent],
  imports: [
    CommonModule,
    FormsModule,
    AssignmentRoutingModule,
    ReactiveFormsModule,
    InputNumberModule,
    ButtonModule
  ],
  providers: [MapService],
  bootstrap: [CommentComponent]
})
export class AssignmentModule { }
