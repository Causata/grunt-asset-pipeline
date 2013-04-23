
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
        var all = fs.readFileSync('build/asset_pipeline/custom_js/concat/custom.js','utf8');
        eval(all);
        test.equal( foo, 'foobar');
        test.done();
    },
    uglify:function(test){
        var all = fs.readFileSync('build/asset_pipeline/custom_js/uglify/custom.js','utf8');
        test.ok( all );
        test.done();
    },
    rev: function(test){
        var all = fs.readFileSync('build/asset_pipeline/custom_js/rev/19ac63ce.custom.js','utf8');
        test.ok( all );
        test.done();
    }
};