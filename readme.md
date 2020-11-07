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
Creamos un componente de anguar:
$


El hml de nuestra app será:
```
<app-map-viewer></app-map-viewer>
```

# Visualizar mapas con Leaflet
Leaflet es una de las librerías de Javascript más populares para visualizar mapas de forma interactiva.

Entre otras cosas con Leaflet puedes:
1. Usar capas de Google Maps u Open Street Maps.
2. Ajustar el canvas a dispositivos móviles.
3. Usar iconos y marcadores propios.
4. Leer archivos GeoJSON.
5. Mapas cloropéticos.
6. Gestionar distintas capas.

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
    "rxjs": "~6.6.0",
    "tslib": "^2.0.0",
    "zone.js": "~0.10.2",
    "leaflet": "1.7.1"
  },
```

# Capas
Vamos a usar una capa con los estados de Estados Unidos. Esta capa consiste en un JSON que se encuentra en nuestro directorio de /assets.

https://blog.mestwin.net/use-leaflet-in-your-angular-8-project-for-interactive-maps/
https://github.com/Asymmetrik/ngx-leaflet
https://leafletjs.com/examples/choropleth/

# Eventos mouse over y mouse out

# Popup

https://stackoverflow.com/questions/52756424/cant-get-resetstyle-to-work-in-ngx-leaflet