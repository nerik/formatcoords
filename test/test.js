
/*jshint -W083 */
/*jshint -W030 */

var formatcoords = require('../index');
var expect = require("chai").expect;

describe('formatcoords()', function() {

	var coords = {
		floats: formatcoords(-41.343825, 107.929688), 
		floatslonlat: formatcoords(107.929688, -41.343825, true), 
		array: formatcoords([-41.343825, 107.929688]),
		arraylonlat: formatcoords([107.929688, -41.343825], true),
		string: formatcoords('-41.343825, 107.929688'),
		latlon: formatcoords({lat:-41.343825, lng: 107.929688 })
	};

	it('should throw a specific error when no argument is sent', function() {
		expect(function() { formatcoords(); }).to.throw(/no arguments/);
	} );

	var latLonExist = function (coord) {
        return function () {
        	console.log(coord.lat+','+coord.lon);
            expect(coord.lat).to.exist;
			expect(coord.lon).to.exist;
        };
    };

    var latLonAreFloats = function (coord) {
        return function () {
        	// console.log(coord.lat+','+coord.lon);
            expect(coord.lat).to.be.a('number');
			expect(coord.lon).to.be.a('number');
        };
    };

    var latIsCorrect = function (coord) {
        return function () {
        	expect(coord.lat).to.equal(-41.343825);
        };
    };

    var lonIsCorrect = function (coord) {
        return function () {
        	expect(coord.lon).to.equal(107.929688);
        };
    };


	for(var key in coords) {
		coord = coords[key];
		it('should have lat and lon properties with ' + key, latLonExist(coord) );
		it('should have lat and lon properties that are floats, with ' + key, latLonAreFloats(coord) );
		it('should have a lat property equal to -41.343825, with ' + key, latIsCorrect(coord) );
		it('should have a lon property equal to 107.929688, with ' + key, lonIsCorrect(coord) );
	}


});