import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import CustomPoint from '../customPoint';

@Component({
  selector: 'app-locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.scss']
})
export class LocatorComponent implements OnInit {

  private locatorForm: FormGroup;

  @Input() formTitle?: string = 'Locator Form';
  @Output() customPointEmitter = new EventEmitter<CustomPoint>();

  constructor(public formBuilder: FormBuilder) {
    this.locatorForm = this.formBuilder.group({
      latitude: [0, [Validators.required, Validators.min(-85), Validators.max(85)]], //map projection : EPSG:3857
      longtitude: [0, [Validators.required, Validators.min(-180), Validators.max(180)]]
    })
  }

  ngOnInit(): void { }

  //Getter for locatorForm
  get getLocatorForm() {
    return this.locatorForm;
  }

  //Getter and Setter for latitude and longtitude as a CustomPoint object
  get customPoint(): CustomPoint {
    let point = new CustomPoint(this.locatorForm.value.latitude, this.locatorForm.value.longtitude);
    return point;
  }

  set customPoint(customPoint: CustomPoint) {
    this.locatorForm.setValue(customPoint);
  }

  onSubmit() {
    console.log(this.customPoint);
    this.customPointEmitter.emit(this.customPoint);
  }
}
