import { Component, OnInit } from '@angular/core';
import { CampgroundsService } from 'src/app/services/campgrounds.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-campgrounds',
  templateUrl: './campgrounds.component.html',
  styleUrls: ['./campgrounds.component.css']
})
export class CampgroundsComponent implements OnInit {

  camps:any;
    // For Map
    map!: mapboxgl.Map;
    features: any;
    coordinates:any;
  constructor(private campgroundService: CampgroundsService) { }

  ngOnInit(): void {
    this.getCamps();
    //this.buildmapClusterMap();
  }
  getCamps(){
    return this.campgroundService.getAllCamp().subscribe(res => {
      this.camps = res;
      // this.camps.forEach((element: any) => {
      //   console.log('elements are =',element.geometry.coordinates)
      // });
      console.log(this.camps);
    
    })
  }
  // ======================
  // Cluster Map
  // ==================
  // buildmapClusterMap(){
  //   this.map = new mapboxgl.Map({
  //   accessToken: environment.mapbox.accessToken,
  //   container: 'map',
  //   style: 'mapbox://styles/mapbox/dark-v10',
  //   center: [-103.5917, 40.6699],
  //   zoom: 3
  // });
  // this.map.on('load', () => {
  //   // Add a new source from our GeoJSON data and
  //   // set the 'cluster' option to true. GL-JS will
  //   // add the point_count property to your source data.
  //   this.map.addSource('earthquakes', {
  //   type: 'geojson',
  //   // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
  //   // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
  //   data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
  //   cluster: true,
  //   clusterMaxZoom: 14, // Max zoom to cluster points on
  //   clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
  //   });
     
  //   this.map.addLayer({
  //   id: 'clusters',
  //   type: 'circle',
  //   source: 'earthquakes',
  //   filter: ['has', 'point_count'],
  //   paint: {
  //   // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
  //   // with three steps to implement three types of circles:
  //   //   * Blue, 20px circles when point count is less than 100
  //   //   * Yellow, 30px circles when point count is between 100 and 750
  //   //   * Pink, 40px circles when point count is greater than or equal to 750
  //   'circle-color': [
  //   'step',
  //   ['get', 'point_count'],
  //   '#51bbd6',
  //   100,
  //   '#f1f075',
  //   750,
  //   '#f28cb1'
  //   ],
  //   'circle-radius': [
  //   'step',
  //   ['get', 'point_count'],
  //   20,
  //   100,
  //   30,
  //   750,
  //   40
  //   ]
  //   }
  //   });
     
  //   this.map.addLayer({
  //   id: 'cluster-count',
  //   type: 'symbol',
  //   source: 'earthquakes',
  //   filter: ['has', 'point_count'],
  //   layout: {
  //   'text-field': '{point_count_abbreviated}',
  //   'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
  //   'text-size': 12
  //   }
  //   });
     
  //   this.map.addLayer({
  //   id: 'unclustered-point',
  //   type: 'circle',
  //   source: 'earthquakes',
  //   filter: ['!', ['has', 'point_count']],
  //   paint: {
  //   'circle-color': '#11b4da',
  //   'circle-radius': 4,
  //   'circle-stroke-width': 1,
  //   'circle-stroke-color': '#fff'
  //   }
  //   });
     
  //   // inspect a cluster on click
  //   this.map.on('click', 'clusters', (e) => {
  //   const features = this.map.queryRenderedFeatures(e.point, {
  //   layers: ['clusters']
  //   });
  //   // const clusterId = features[0].properties!.cluster_id;
  //   // this.map.getSource('earthquakes').getClusterExpansionZoom(
  //   // clusterId,
  //   // (err:any, zoom:any) => {
  //   // if (err) return;
     
  //   // this.map.easeTo({
  //   // center: features[0].geometry.coordinates,
  //   // zoom: zoom
  //   // });
  //   // }
  //   // );
  //    });
     
  //   // When a click event occurs on a feature in
  //   // the unclustered-point layer, open a popup at
  //   // the location of the feature, with
  //   // description HTML from its properties.
  //   this.map.on('click', 'unclustered-point', (e:any) => {
  //   const coordinates = e.features[0].geometry.coordinates.slice();
  //   const mag = e.features[0].properties.mag;
  //   const tsunami =
  //   e.features[0].properties!.tsunami === 1 ? 'yes' : 'no';
     
  //   // Ensure that if the map is zoomed out such that
  //   // multiple copies of the feature are visible, the
  //   // popup appears over the copy being pointed to.
  //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  //   }
     
  //   new mapboxgl.Popup()
  //   .setLngLat(coordinates)
  //   .setHTML(
  //   `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`
  //   )
  //   .addTo(this.map);
  //   });
     
  //   this.map.on('mouseenter', 'clusters', () => {
  //   this.map.getCanvas().style.cursor = 'pointer';
  //   });
  //   this.map.on('mouseleave', 'clusters', () => {
  //   this.map.getCanvas().style.cursor = '';
  //   });
  //   });
  // }

}
