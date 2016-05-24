# formatcoords

![](https://raw.githubusercontent.com/nerik/formatcoords/master/doc/mercator.jpg)

A simple and flexible tool to format decimal lat/lon coordinates into degrees/minutes/seconds formats (like DMS), using a [moment.js](http://momentjs.com/)-like API.

For geo hipsters that think that **48° 54´ 16.016" S 71° 0´ 56.250" W** looks way more awesome than **-48.9044488,-71.015625**.

## install: node/browserify 

```
npm install formatcoords
```

## use

```
var formatcoords = require('formatcoords');
formatcoords(40.76,-73.984).format();
//40° 45' 36.000" N 73° 59' 2.400" W
```

#### parsing

The ```formatcoords(coord1[, coord2, lonlat])``` method accepts decimal lat/lon coordinates in several formats :
- ```formatcoords([lat, lon])```: an array of floats.
- ```formatcoords([lon, lat], true)```: an array of floats. First longitude, then latitude. Useful for use with GeoJSON, for example.
- ```formatcoords(lat, lon)``` : floats.
- ```formatcoords(lon, lat, true)``` : floats. First longitude, then latitude. Useful for use with GeoJSON, for example.
- ```formatcoords('latlon')``` : ```latlon``` is a string in "lat,lon" format.
- ```formatcoords({lat: lat, lng: lon}``` an object with ```lat``` and ```lng``` properties (Leaflet LatLng object)

#### formatting

```
var coords = formatcoords(27.725499,-18.024301);
```

```
coords.format([format, lat/lon separator, number of decimal places])
```

Default output format is DMS (degrees minutes seconds), with a space to separate lat and lon :
```
coords.format()
//27° 43´ 31.796" N 18° 1´ 27.484" W
```

*Available short formats :*

|                       | Token   | Output |
|----------------------:|:--------|--------|
|degrees minutes seconds (DMS)|FFf        |27° 43´ 31.796" N 18° 1´ 27.484" W        |
|degrees decimal minutes|Ff       |27° 43.529933333333´ N -18° 1.4580666666667´ W       |
|decimal degrees        |f        |27.725499° N 18.024301° W        |

*Custom formats*

The following values are available for both latitudes and longitudes: 

|                               | Token   | Output |
|------------------------------:|:--------|--------|
|degrees                        |D        |27        |
|degrees with unit              |DD       |27°        |
|decimal degrees                |d        |27.725499        |
|decimal degrees with unit      |dd       |27.725499°        |
|minutes                        |M        |7        |
|minutes with unit              |MM       |7´        |
|decimal minutes                |m        |7.63346        |
|decimal minutes with unit      |mm       |7.63346´        |
|decimal seconds                |s        |31.796        |
|decimal seconds with unit      |ss       |31.796"        |
|direction                      |X        |[N,S], [E,W]        |
|minus sign (west of Greenwich and south of equator)|-        |[-]        |

*Custom format example*

```
coord.format('-D M s', ', ');
//-35 16 55.20000, 149 7 43.26240
```
```
coord.format('DD MM ss X', ', ', 0);
//35° 43´ 49" S, 86° 1´ 55" E
```

*Decimal places*

Decimal values will render with 5 decimal places by default although they can be varied with the custom format.


## Browser support
IE <= 8 not supported.

## DMS to decimal

Use [parse-dms](https://www.npmjs.com/package/parse-dms).