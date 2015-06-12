var common = require('../common'),
    assert = require('assert'),
    should = require('should'),
    resolver = require('../../resolver');

describe('Integration', function () {
    describe('Main', function () {
        describe("load", function () {
            it('callback fired', function (done) {
                var subject = resolver.resolve('sdk/main.node');
                subject.load(done);
            });

            afterEach(function (done) {
                var subject = resolver.resolve('sdk/main.node');
                subject.unload(done);
            });
        });

        describe("unload", function () {
            it('callback fired', function (done) {
                var subject = resolver.resolve('sdk/main.node');
                subject.unload(done);
            });
        });

        describe("resume", function () {
            it('callback fired', function (done) {
                var subject = resolver.resolve('sdk/main.node');
                subject.resume(done);
            });
        });

        describe("pause", function () {
            it('callback fired', function (done) {
                var subject = resolver.resolve('sdk/main.node');
                subject.pause(done);
            });
        });
    });
});