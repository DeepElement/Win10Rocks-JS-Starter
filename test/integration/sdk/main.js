var assert = require('assert'),
    should = require('should'),
    resolver = require('../../resolver');

describe('Integration', function () {
    describe('Main', function () {
        describe("load", function () {
            it('callback fired', function (done) {
                var subject = resolver.resolve('sdk/main.node.js');
                subject.load(done);
            })
        });

        describe("unload", function () {
            it('callback fired', function (done) {
                var subject = resolver.resolve('sdk/main.node.js');
                subject.unload(done);
            })
        });

        describe("resume", function () {
            it('callback fired', function (done) {
                var subject = resolver.resolve('sdk/main.node.js');
                subject.resume(done);
            })
        });

        describe("pause", function () {
            it('callback fired', function (done) {
                var subject = resolver.resolve('sdk/main.node.js');
                subject.pause(done);
            })
        });
    });
});