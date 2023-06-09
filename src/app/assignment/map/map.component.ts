import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocatorComponent } from '../locator/locator.component';
import CustomPoint from '../customPoint';
import { MapService } from '../map.service';
import { Point } from '@arcgis/core/geometry';
import { customPinSymbolGreen } from '../customPinPointGreen';
import Graphic from '@arcgis/core/Graphic';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  @ViewChild(LocatorComponent) locator: LocatorComponent;
  @ViewChild('mapPanel', { static: true }) mapPanel: ElementRef;

  constructor(private mapservice: MapService) { }

  ngOnInit(): void {
    this.mapservice.createMap(this.mapPanel.nativeElement);
  }

  onSubmitCustompoint(customPoint: CustomPoint) {

    console.log(customPoint);

    const point = new Point({
      latitude: customPoint.latitude,
      longitude: customPoint.longtitude
    })

    const graphic = new Graphic({
      geometry: point,
      symbol: customPinSymbolGreen
    })

    this.mapservice.mapView.graphics.removeAll();
    this.mapservice.mapView.graphics.add(graphic);
    this.mapservice.mapView.goTo(point);
  }

}
