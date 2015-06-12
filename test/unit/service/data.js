var common = require('../common'),
    assert = require('assert'),
    should = require('should'),
    resolver = require('../../resolver'),
    sinon = require('sinon');

describe('Unit', function () {
    describe('DataService', function () {
        describe('constructor', function () {
            it("standard success", function () {
                // arrange/act
                var subjectDef = resolver.resolve('sdk/service/data.node');
                var subject = new subjectDef();
               
                // assert
                should.exist(subject);
            });
        });

        describe('load', function () {
            it("standard success", function (done) {
                // arrange
                var subjectDef = resolver.resolve('sdk/service/data.node');
                var subject = new subjectDef();
                
                // act
                subject.load(function () {
                    // assert
                    should.exist(subject);
                    
                    // Unload
					subject.unload(done);
                });
            });
        });

        describe('unload', function () {
            it("standard success", function (done) {
                // arrange
                var subjectDef = resolver.resolve('sdk/service/data.node');
                var subject = new subjectDef();
                
                // act
                subject.unload(function () {
                    // assert
					
                    return done();
                });
            });
        });

        describe('pause', function () {
            it("standard success", function (done) {
                // arrange
                var subjectDef = resolver.resolve('sdk/service/data.node');
                var subject = new subjectDef();
                
                // act
                subject.pause(function () {
                    // assert
					
                    return done();
                });
            });
        });

        describe('resume', function () {
            it("standard success", function (done) {
                // arrange
                var subjectDef = resolver.resolve('sdk/service/data.node');
                var subject = new subjectDef();
                
                // act
                subject.resume(function () {
                    // assert
					
                    return done();
                });
            });
        });
    });
});