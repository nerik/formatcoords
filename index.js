function Coords() {}

Coords.prototype.init = function() {
	if (!arguments.length) {
		throw new Error('no arguments');
	}
	else if (arguments[0].lat && arguments[0].lng) {
		this.lat = arguments[0].lat;
		this.lon = arguments[0].lng;
	}
	else if (typeof arguments[0] === "string") {
		var strarr = arguments[0].split(",");
		this.lat = parseFloat(strarr[0].trim());
		this.lon = parseFloat(strarr[1].trim());
	}
	else if (Object.prototype.toString.call(arguments[0]) === "[object Array]" ) {
		var arr = arguments[0];
		if (arguments[1] === true) {
			this.lat = arr[1];
			this.lon = arr[0];
		} else {
			this.lat = arr[0];
			this.lon = arr[1];
		}
	}
	else if (arguments[2] === true) {
	    this.lat = arguments[1];
		this.lon = arguments[0];
	} 
	else {
		this.lat = arguments[0];
		this.lon = arguments[1];
	}

	this.compute();
};

Coords.prototype.compute = function() {
	this.north = this.lat > 0;
	this.east = this.lon > 0;
	this.latValues = computeFor(this.lat);
	this.lonValues = computeFor(this.lon);

	function computeFor(initValue) {
		var values = {};
		values.initValue = initValue;
		values.degrees = Math.abs(initValue);
		values.degreesInt = Math.floor(values.degrees);
		values.degreesFrac = values.degrees - values.degreesInt;
		values.secondsTotal = 3600 * values.degreesFrac; 
		values.minutes = values.secondsTotal / 60; 
		values.minutesInt = Math.floor(values.minutes);
		values.seconds = values.secondsTotal - (values.minutesInt * 60);
		return values;
	}
};

var shortFormats = {
	'FFf' : 'DD MM ss X',
	'Ff' : 'DD mm X',
	'f': 'dd X'
};

var units = {
	degrees: '°',
	minutes: '´',
	seconds: '"',
};

Coords.prototype.format = function(format, latLonSeparator) {
	if (!format) format = 'FFf';
	if (!latLonSeparator) latLonSeparator = ' ';

	if ( Object.keys(shortFormats).indexOf(format) > -1 ) {
		format = shortFormats[format];
	}

	var lat = formatFor(this.latValues, (this.north) ? 'N' : 'S' );
	var lon = formatFor(this.lonValues, (this.east) ? 'E' : 'W' );

	function formatFor(values, X) {
		var formatted = format;
		formatted = formatted.replace(/DD/g, values.degreesInt+units.degrees);
		formatted = formatted.replace(/dd/g, values.degrees.toFixed(5)+units.degrees);
		formatted = formatted.replace(/D/g, values.degreesInt);
		formatted = formatted.replace(/d/g, values.degrees.toFixed(5));
		formatted = formatted.replace(/MM/g, values.minutesInt+units.minutes);
		formatted = formatted.replace(/mm/g, values.minutes.toFixed(5)+units.minutes);
		formatted = formatted.replace(/M/g, values.minutesInt);
		formatted = formatted.replace(/m/g, values.minutes.toFixed(5));
		formatted = formatted.replace(/ss/g, values.seconds.toFixed(5)+units.seconds);
		formatted = formatted.replace(/s/g, values.seconds.toFixed(5));
		
		formatted = formatted.replace(/-/g, (values.initValue<0) ? '-' : '');
		
		formatted = formatted.replace(/X/g, X);

		return formatted;
	}

	return lat + latLonSeparator + lon;
};

function formatcoords() {
    var c = new Coords();
    c.init.apply(c, arguments);
    return c;
}

module.exports = formatcoords;