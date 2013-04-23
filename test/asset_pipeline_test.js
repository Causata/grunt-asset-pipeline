'use strict';
var grunt = require('grunt'),
    fs = require('fs');

/*
    ======== A Handy Little Nodeunit Reference ========
    https://github.com/caolan/nodeunit

    Test methods:
    test.expect(numAssertions)
    test.done()
    Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.asset_pipeline = {
    setUp: function(done) {
        // setup here if necessary
        done();
    },
    concat: function(test) {

        test.expect(2);
        var all = fs.readFileSync('build/asset_pipeline/custom_js/concat/custom.js','utf8');
        
        // var foo ='bar'; var lorem = 'ipsum'; foo = 'the unexpected';
        eval(all);
        
        test.equal( lorem, 'ipsum');
        test.equal( foo, 'the unexpected');
        
        test.done();
    }
};