import { Component, OnInit } from '@angular/core';
import { geoJSON, latLng, Map, MapOptions } from 'leaflet';
import { Subject } from 'rxjs';
import statesData from '../../assets/us-states.json';

function getColor(d) {
  return d > 1000 ? '#800026' :
    d > 500 ? '#BD0026' :
      d > 200 ? '#E31A1C' :
        d > 100 ? '#FC4E2A' :
          d > 50 ? '#FD8D3C' :
            d > 20 ? '#FEB24C' :
              d > 10 ? '#FED976' :
                '#FFEDA0';
}

function stateStyle(feature) {
  return {
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.7
  };
}

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.css']
})
export class MapViewerComponent implements OnInit {

  mapOptions: MapOptions

  map: Map

  currentState = new Subject()

  geoJsonLayers = geoJSON(statesData as any, { style: stateStyle, onEachFeature: this.onEachFeature })

  constructor() {
    this.onEachFeature.bind(this)
  }

  ngOnInit(): void {
    this.mapOptions = {
      center: latLng(40, -97),
      zoom: 4,
      zoomControl: false,
      scrollWheelZoom: false,
      layers: [
        this.geoJsonLayers
      ],
    };
  }

  onMapReady(map: Map) {
    this.map = map
  }

  click(e: any) {
    console.log(this.map.getCenter())
    console.log(this.map.getBounds())
    // @ts-ignore
    console.log(this.map._layers)

  }

  onEachFeature(feature, layer) {
    layer.on({
      mouseover: (e) => {
        var layer = e.target;
        layer.setStyle({
          color: 'black',
        });
        layer.bringToFront();
      },
      mouseout: (e) => {
        var layer = e.target;

        layer.setStyle({
          color: 'white',
        });
        layer.bringToFront();
      }
    });
  }
}
