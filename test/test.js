
/*jshint -W083 */
/*jshint -W030 */

var formatcoords = require('../index');
var expect = require("chai").expect;

var coords = {
	floats: formatcoords(-35.282000, 149.128684), 
	floatslonlat: formatcoords(149.128684, -35.282000, true), 
	array: formatcoords([-35.282000, 149.128684]),
	arraylonlat: formatcoords([149.128684, -35.282000], true),
	string: formatcoords('-35.282000, 149.128684'),
	latlon: formatcoords({lat:-35.282000, lng: 149.128684 })
};

describe('formatcoords()', function() {

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
        	expect(coord.lat).to.equal(-35.282000);
        };
    };

    var lonIsCorrect = function (coord) {
        return function () {
        	expect(coord.lon).to.equal(149.128684);
        };
    };


	for(var key in coords) {
		coord = coords[key];
		it('should have lat and lon properties with ' + key, latLonExist(coord) );
		it('should have lat and lon properties that are floats, with ' + key, latLonAreFloats(coord) );
		it('should have a lat property equal to -35.282000, with ' + key, latIsCorrect(coord) );
		it('should have a lon property equal to 149.128684, with ' + key, lonIsCorrect(coord) );
	}

});

describe('compute()', function() {

	coord = coords.floats;
	it('should have north value set to false with ', function () {
		expect(coord.north).to.be.false;
	} );

	it('should have east value set to true with ', function () {
		expect(coord.east).to.be.true;
	} );

	it('should have lat degrees set to 35.282000 with ', function () {
		expect(coord.latValues.degrees).to.equal(35.282000);
	} );

	it('should have lon degrees set to 149.128684 with ', function () {
		expect(coord.lonValues.degrees).to.equal(149.128684);
	} );

	it('should have lat minutes set to 16.91999999999979 with ', function () {
		expect(coord.latValues.minutes).to.equal(16.91999999999979);
	} );

	it('should have lon minutes set to 7.7210333333333 with ', function () {
		expect(coord.lonValues.minutes).to.equal(7.721039999999562);
	} );

	it('should have lat seconds set to 55.2 with ', function () {
		expect(coord.latValues.seconds).to.equal(55.19999999998731);
	} );

	it('should have lon seconds set to 43.262 with ', function () {
		expect(coord.lonValues.seconds).to.equal(43.262399999973695);
	} );
});