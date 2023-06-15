import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocatorComponent } from '../locator/locator.component';
import CustomPoint from '../customPoint';
import { MapService } from '../map.service';
import { Point } from '@arcgis/core/geometry';
import SimpleMarkSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Graphic from '@arcgis/core/Graphic';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';
import { identify } from '@arcgis/core/rest/identify';
import IdentifyParameters from '@arcgis/core/rest/support/IdentifyParameters';
import MapView from '@arcgis/core/views/MapView';
import WebStyleSymbol from '@arcgis/core/symbols/WebStyleSymbol';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import { customPinSymbol } from '../customPinPoint';

@Component({
  selector: 'app-map-identify',
  templateUrl: './map-identify.component.html',
  styleUrls: ['./map-identify.component.scss']
})
export class MapIdentifyComponent implements OnInit {

  mapLayerUrl = 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer';
  pinPoint: Graphic;
  polygonArea: Graphic;

  @ViewChild(LocatorComponent) locator: LocatorComponent;
  @ViewChild('mapPanel', { static: true }) mapPanel: ElementRef;

  constructor(private mapservice: MapService) { }

  ngOnInit(): void {
    this.mapservice.createMap(this.mapPanel.nativeElement);
    this.mapservice.mapView = new MapView({
      container: this.mapservice.mapView.container,
      map: this.mapservice.map,
      center: [-100.29081082700414, 39.85707025631872],
      zoom: 5,
    });
    const layer = new MapImageLayer({
      url: this.mapLayerUrl,
      opacity: 0.5
    });

    this.mapservice.map.add(layer);

    this.mapservice.mapView.on('click', (event) => { this.onIdentifyCLick(event.mapPoint) });
  }

  onSubmitCustompoint(customPoint: CustomPoint) {

    this.mapservice.mapView.graphics.remove(this.pinPoint);

    const point = new Point({
      latitude: customPoint.latitude,
      longitude: customPoint.longtitude
    })

    const simpleMarkerSymbol = new SimpleMarkSymbol({
      color: [119, 220, 60],
      outline: {
        color: [255, 255, 255],
        width: 2
      }
    })

    const pinSymbol = new WebStyleSymbol({
      name: "tear-pin-1",
      styleName: "Esri2DPointSymbolsStyle"
    });

    const graphic = new Graphic({
      geometry: point,
      symbol: customPinSymbol
    })

    this.pinPoint = graphic;

    this.mapservice.mapView.popup.close();
    this.mapservice.mapView.graphics.add(graphic);
    this.mapservice.mapView.goTo(point);

  }

  onIdentifyCLick(point: any) {
    let coordinate = new CustomPoint(point.latitude, point.longitude);
    this.locator.customPoint = coordinate;
    document.getElementById("mapPanel").style.cursor = "wait";

    const identifyParams = new IdentifyParameters({
      layerIds: [3],
      geometry: point,
      tolerance: 3,
      mapExtent: this.mapservice.mapView.extent,
      returnGeometry: true
    })

    identify(this.mapLayerUrl, identifyParams).then((response) => {
      if (response === null || response.results.length === 0) { document.getElementById("mapPanel").style.cursor = "auto"; }
      let feature = response.results[0].feature;
      let pop2007 = new Intl.NumberFormat().format(feature.attributes.POP2007);
      let area = new Intl.NumberFormat().format(feature.attributes.Shape_Area);

      feature.popupTemplate = {
        title: 'ชื่อรัฐ : ' + feature.attributes.STATE_NAME,
        content:
          `<b>ประชากร(ข้อมูลจากปี 2007)&nbsp;:&nbsp;</b>${pop2007}<br>` +
          `<b>พื้นที่&nbsp;:&nbsp;</b>${area}`
      };

      return feature;
    }).then((feature) => {
      this.mapservice.mapView.popup.open({
        features: [feature],
        location: point
      });
      document.getElementById("mapPanel").style.cursor = "auto";
      this.createPolygon(feature.geometry.rings);
    })
  }

  createPolygon(rings: any) {
    console.log(rings);

    this.mapservice.mapView.graphics.remove(this.polygonArea);
    let polygon = {
      type: "polygon",
      rings: rings,
      spatialReference: this.mapservice.mapView.spatialReference
    };

    let graphic = new Graphic({
      geometry: polygon,
      symbol: new SimpleFillSymbol({
        color: [56, 222, 53, 0.3],
        outline: {
          color: [38, 171, 36],
          width: 1
        }
      })
    });
    this.polygonArea = graphic;
    this.mapservice.mapView.graphics.add(graphic);
    this.mapservice.mapView.graphics.reorder(this.pinPoint, 1);
  }

}
