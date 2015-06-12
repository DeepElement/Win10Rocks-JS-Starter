var common = require('../common'),
    assert = require('assert'),
    uuid = require('uuid'),
    should = require('should'),
    resolver = require('../../resolver'),
    sinon = require('sinon'),
    loki = require('lokijs');

describe('Unit', function () {
    describe('LokiStorageProvider', function () {
        describe('constructor', function () {
            it("standard success", function () {
                // arrange/act
                var subjectDef = resolver.resolve('sdk/provider/loki-storage.node');
                var subject = new subjectDef();
               
                // assert
                should.exist(subject);
            });
        });

        describe('loadDatabase', function () {
            it("default - not found", function (done) {
                // arrange
                var subjectDef = resolver.resolve('sdk/provider/loki-storage.node');
                var ioc = resolver.resolve('sdk/helper/ioc.node');
                var subject = new subjectDef();
                var dbKey = uuid.v4();
                var db = new loki(dbKey, { adapter: subject });
                var loadClosure = {
                    events: {
                        proto: function (options) {
                            console.log('proto called');
                        }
                    }
                };
                
                // act
                ioc.register("storageProvider", resolver.resolve('sdk/provider/storage.node'), "request");
                db.loadDatabase(loadClosure,
                    function (resp) {
                        // assert
                        should.exist(resp);
                        resp.should.equal('Database not found');

                        return done();
                    });
            });
        });
    });
});