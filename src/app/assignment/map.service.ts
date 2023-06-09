import { Injectable } from "@angular/core";

import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

@Injectable({
    providedIn: "root",
})
export class MapService {
    public map: Map;
    public mapView: MapView;

    createMap(container: any) {
        this.map = new Map({
            basemap: "topo-vector",
        });

        this.mapView = new MapView({
            container: container,
            map: this.map,
            center: [-118.805, 34.027],
            zoom: 15,
        });
    }
}