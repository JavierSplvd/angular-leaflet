# Visualizar mapas con Leaflet
Leaflet es una de las librerías de Javascript más populares para visualizar mapas de forma interactiva.

Tenemos que tener en cuenta distintos conceptos que usa Leaflet y que son comunes a la hora de trabajar con librerías de GIS:
- Feature: es un objeto que define una geometría (línea, polilínea, figura geométrica, ...)
- Layer o capa: es un objeto que tiene una feature y le da el contexto en el mapa. Tiene información sobre los límites de la feature, opciones sobre cómo se puede interaccionar con ella, estilos, etc...

# Entorno
El proyecto usa nodejs (v14) y Angular.
Creamos la app con:
$ ng new my-app
Probamos que se ha instalado correctamente con:
$ cd my-app
$ ng serve --open
Hay que instalar tanto leaflet como ngx-leaflet, que es la librería de angular de leaflet y también los tipos para usar typescript.
$ npm install leaflet
$ npm install @asymmetrik/ngx-leaflet
$ npm install --save-dev @types/leaflet
```
  "dependencies": {
    "@angular/animations": "~10.2.0",
    "@angular/common": "~10.2.0",
    "@angular/compiler": "~10.2.0",
    "@angular/core": "~10.2.0",
    "@angular/forms": "~10.2.0",
    "@angular/platform-browser": "~10.2.0",
    "@angular/platform-browser-dynamic": "~10.2.0",
    "@angular/router": "~10.2.0",
    "@asymmetrik/ngx-leaflet": "8.1.0",
    "leaflet": "1.7.1",
    "rxjs": "~6.6.0",
    "tslib": "^2.0.0",
    "zone.js": "~0.10.2"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~0.1002.0",
    "@angular/cli": "~10.2.0",
    "@angular/compiler-cli": "~10.2.0",
    "@types/jasmine": "~3.5.0",
    "@types/jasminewd2": "~2.0.3",
    "@types/leaflet": "1.5.4",
    "@types/node": "^12.11.1",
    "codelyzer": "^6.0.0",
    "jasmine-core": "~3.6.0",
    "jasmine-spec-reporter": "~5.0.0",
    "karma": "~5.0.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage-istanbul-reporter": "~3.0.2",
    "karma-jasmine": "~4.0.0",
    "karma-jasmine-html-reporter": "^1.5.0",
    "protractor": "~7.0.0",
    "ts-node": "~8.3.0",
    "tslint": "~6.1.0",
    "typescript": "~4.0.2"
  }
```
En el archivo de angular.json añadir los estilos propios de leaflet:
"styles": [
              "src/styles.scss",
              "./node_modules/leaflet/dist/leaflet.css"
            ],
Ahora hay que añadir el módulo a nuesto app.module.ts
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule
  ],
Ahora ya tenemos todas las dependencias necesarias para poder usar esta librería.

# Componente de mapa
Creamos un componente de angular:
`$ ng generate component map-viewer`

Añadimos el componente a app.component.html. Será el único elemento que tenga nuestra página.
```
<app-map-viewer></app-map-viewer>
```
En map-viewer.component.css añadimos la altura que tenga el componente:
```
#map {
    height: 600px;
}
```
En map-viewer.component.html añadimos el elemento que va a tener nuestro mapa:
```
<div id="map" leaflet [leafletOptions]="mapOptions">
</div>
```
El atributo de leafletOptions tiene que recibir un objeto de opciones que definimos en nuestro componente:
```
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
```
Cuando creamos un mapa de Leaflet tiene por defecto un nivel de zoom y una latitud y longitud a la que llevarnos. En nuestro caso quiero llevar la vista a encuadrar la mayor parte de estados, por eso tenemos la opcion de "center" y "zoom" con esos valores.

En "layers" metemos las distintas capas que queremos mostrar.

# Capas
Vamos a usar una capa con los estados de Estados Unidos. Esta capa consiste en un JSON que se encuentra en nuestro directorio de /assets.

Hay muchos sitios donde obtener capas con la geometría de los países u otros lugares. Voy a dejar unos links a repositorios con una gran cantidad de datasets:
- https://github.com/datasets/
- https://public.opendatasoft.com/
Ahí puedes encontrar datasets con los países, regiones y provincias de muchos países o incluso la localización de parques naturales, aeropuertos y demás lugares de interés.
Nosotros vamos a usar un dataset con los estados de Estados Unidos, llamado us-states.json, y lo vamos a guardar en src/assets. Para acceder a un json en /assets tenemos varias formas. Yo he elegido mediante declaraciones de import.
En tsconfig.json añadir la configuración de:
```
    "resolveJsonModule": true, 
    "esModuleInterop": true
```
Y luego en nuestro componente map-viewer.component.ts:
```
import statesData from '../../assets/us-states.json';
```

# Eventos mouseover y mouseout
Queremos que cuando pasemos el ratón por un estado quede destacado sobre el resto. Esto lo vamos a conseguir cambiando el estilo con eventos.

Nuestro archivo GeoJSON consiste en una lista de features, que tienen una polilínea que marca el contorno del estado. Cada feature dispara una serie de eventos y nosotros podemos asignar funciones como respuesta a esos eventos.

```
  geoJsonLayers = geoJSON(statesData as any, { style: stateStyle, onEachFeature: this.onEachFeature })

```
La opción de onEachFeature es una función que se va a llamar antes de añadir una feature a nuestra capa. Hay que aclarar que cada feature va a tener su propia capa, por lo que vamos a terminar con una capa por cada estado.

```
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
```

# Popup

https://stackoverflow.com/questions/52756424/cant-get-resetstyle-to-work-in-ngx-leaflet

https://blog.mestwin.net/use-leaflet-in-your-angular-8-project-for-interactive-maps/
https://github.com/Asymmetrik/ngx-leaflet
https://leafletjs.com/examples/choropleth/
