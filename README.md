# formatcoords
A simple and flexible tool to format decimal lat/lon coordinates into other formats (like DMS) 

## install: node/browserify 

```
npm install formatcoords
```

## use

```
var formatcoords = require('formatcoords');
formatcoords(40.76,-73.984).parse();
//40° 45' 36.000" N 73° 59' 2.400" W
```

#### parsing

The ```formatcoords(coord1[, coord2, lonlat])``` method accepts decimal lat/lon coordinates in several formats :
- ```formatcoords(lat, lon)``` : ```lat``` and ```lon``` are floats.
- ```formatcoords(lon, lat, true)``` : ```lon``` and ```lat``` are floats. First longitude, then latitude. Useful for use with GeoJSON, for example.
- ```formatcoords(latlon)``` : ```latlon``` is a string in "[lat,lon]" format.

#### formatting

```
var coords = formatcoords(27.725499,-18.024301);
```

```
coords.parse([format])
```

Default output format is DMS (degrees minutes seconds) :
```
coords.parse()
//27° 43´ 31.796" N 18° 1´ 27.484" W
```

*Available formats :*

|                       | Token   | Output |
|----------------------:|:--------|--------|
|degrees minutes seconds (DMS)|fff        |27° 43´ 31.796" N 18° 1´ 27.484" W        |
|degrees decimal minutes|fF       |27° 43.529933333333´ , -18° 1.4580666666667´        |
|decimal degrees        |F        |27.725499° N 18.024301° W        |

*Custom formats*

|                               | Token   | Output |
|------------------------------:|:--------|--------|
|degrees                        |d        |27        |
|degrees with unit              |dd       |27°        |
|decimal degrees                |D        |27.725499        |
|decimal degrees with unit      |DD       |27.725499°        |
|decimal seconds                |S        |31.796        |
|decimal seconds with unit      |SS       |31.796"        |
|North South                    |N        |N        |
|East West                      |E        |W        |

*Decimal places*

Seconds have 3 decimal places by default. It is customizable using an integer after the token :
```
coords.parse('SS4');
//31.7960"
```

## DMS to decimal

Use [parse-dms](https://www.npmjs.com/package/parse-dms).
