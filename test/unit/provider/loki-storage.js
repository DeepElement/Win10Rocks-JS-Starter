var common = require('../common'),
    assert = require('assert'),
    uuid = require('uuid'),
    should = require('should'),
    resolver = require('../../resolver'),
    sinon = require('sinon'),
    loki = require('lokijs');

describe('Unit', function() {
    describe('LokiStorageProvider', function() {
        describe('constructor', function() {
            it("standard success", function() {
                // arrange/act
                var subjectDef = resolver.resolve('sdk/provider/loki-storage.node');
                var subject = new subjectDef();

                // assert
                should.exist(subject);
            });
        });

        describe('loadDatabase', function() {
            it("default - not found", function(done) {
                // arrange
                var subjectDef = resolver.resolve('sdk/provider/loki-storage.node');
                var ioc = resolver.resolve('sdk/helper/ioc.node');
                var subject = new subjectDef();
                var dbKey = uuid.v4();
                var db = new loki(dbKey, {
                    adapter: subject
                });


                // act
                ioc.register("storageProvider", resolver.resolve('sdk/provider/storage.node'), "request");
                db.loadDatabase({},
                    function(resp) {
                        // assert
                        should.exist(resp);
                        resp.should.equal('Database not found');

                        return done();
                    });
            });

            it("found", function(done) {
                // arrange
                var subjectDef = resolver.resolve('sdk/provider/loki-storage.node');
                var ioc = resolver.resolve('sdk/helper/ioc.node');
                var subject = new subjectDef();
                var dbKey = uuid.v4();
                var collectionName = 'records';
                var dbNotFoundErrorStr = "Database not found";
                var db = new loki(dbKey, {
                    adapter: subject
                });

                // act
                ioc.register("storageProvider", resolver.resolve('sdk/provider/storage.node'), "request");
                db.loadDatabase({},
                    function(resp) {
                        should.exist(resp);
                        resp.should.equal(dbNotFoundErrorStr);

                        db.addCollection(collectionName);
                        db.saveDatabase();

                        db.loadDatabase({},
                            function(err) {
                                should.not.exist(err);

                                // assert
                                return done();
                            });
                    });
            });
        });


        it("typed reconstruction", function(done) {
            // arrange
            var subjectDef = resolver.resolve('sdk/provider/loki-storage.node');
            var ioc = resolver.resolve('sdk/helper/ioc.node');
            var subject = new subjectDef();
            var dbKey = uuid.v4();
            var collectionName = 'records';
            var dbNotFoundErrorStr = "Database not found";
            var db = new loki(dbKey, {
                adapter: subject
            });
            var constructorSpy = sinon.spy();
            var loadClosure = {};
            loadClosure[collectionName] = {
                proto: constructorSpy
            };

            // act
            ioc.register("storageProvider", resolver.resolve('sdk/provider/storage.node'), "request");
            db.loadDatabase(loadClosure,
                function(resp) {
                    db.addCollection(collectionName);
                    db.getCollection(collectionName).insert({
                        name: uuid.v4()
                    });
                    db.saveDatabase();

                    db.loadDatabase(loadClosure,
                        function(resp) {
                            // fetch on the collection
                            var items = db.getCollection(collectionName).find();

                            // assert
                            constructorSpy.calledOnce.should.be.ok;


                            return done();
                        });
                });
        });
    });
});
