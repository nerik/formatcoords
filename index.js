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
		values.degrees = Math.abs(initValue);
		values.degreesInt = Math.floor(values.degrees);
		values.degreesFrac = values.degrees - values.degreesInt;
		values.secondsTotal = 3600 * values.degreesFrac; 
		values.minutes = values.secondsTotal / 60; 
		values.seconds = values.secondsTotal - (Math.floor(values.minutes) * 60);
		return values;
	}
};

function formatcoords() {
    var c = new Coords();
    c.init.apply(c, arguments);
    return c;
}

module.exports = formatcoords;