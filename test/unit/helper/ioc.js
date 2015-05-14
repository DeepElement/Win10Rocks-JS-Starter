var assert = require('assert'),
    should = require('should'),
    resolver = require('../../resolver');

describe('Unit', function () {
    describe('IoC', function () {
        describe('clear', function () {
            it("standard success", function () {
                // arrange
                var subject = resolver.resolve('sdk/helper/ioc.node');
                var sampleClass = function () { };
                
                // act
                subject.register(sampleClass, "request");
                subject.clear();
                
                // assert
                (function () {
                    subject.get(sampleClass)
                }).should.throw();
            });
        });
        
        describe('register', function () {
            it('bad scope', function () {
                // arrange
                var subject = resolver.resolve('sdk/helper/ioc.node');
                var sampleClass = function () { };
                
                // assert
                (function () {
                    subject.register(sampleClass, "ninja-scope");
                }).should.throw();
            });
            
            it('request scope', function () {
                // arrange
                var subject = resolver.resolve('sdk/helper/ioc.node');
                var instantiationCount = 0;
                
                var sampleClass = function () {
                    instantiationCount++;
                };
                sampleClass.prototype.sampleMethod = function () {

                };
                
                // act
                subject.register(sampleClass, "request");
                var instance = subject.get(sampleClass);
                var secondInstance = subject.get(sampleClass);
                
                // assert
                instance._instance.should.not.equal(secondInstance._instance);
                instantiationCount.should.equal(2);
            });
            
            it('application scope', function () {
                // arrange
                var subject = resolver.resolve('sdk/helper/ioc.node');
                var instantiationCount = 0;
                
                var sampleClass = function () {
                    instantiationCount++;
                };
                sampleClass.prototype.sampleMethod = function () {

                };
                
                // act
                subject.register(sampleClass, "application");
                var instance = subject.get(sampleClass);
                var secondInstance = subject.get(sampleClass);
                
                // assert
                instance._instance.should.equal(secondInstance._instance);
                instantiationCount.should.equal(1);
            });
        });
    });
});