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
		var arr = arguments[0].split(",");
		this.lat = parseFloat(arr[0].trim());
		this.lon = parseFloat(arr[1].trim());
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
};

function formatcoords() {
    var c = new Coords();
    c.init.apply(c, arguments);
    return c;
}

module.exports = formatcoords;