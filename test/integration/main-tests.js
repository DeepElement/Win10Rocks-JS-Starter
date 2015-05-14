var assert = require('assert'),
    should = require('should'),
    resolver = require('../resolver');

describe('Integration', function () {
    describe('Main', function () {
        it('load', function () {
            var subject = resolver.resolve('sdk/main.node.js');
            should.exist(subject);
        })
    });
});