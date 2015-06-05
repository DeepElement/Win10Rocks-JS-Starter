var common = require('../common'),
    assert = require('assert'),
    should = require('should'),
    resolver = require('../../resolver'),
    sinon = require('sinon');

describe('Unit', function () {
    describe('MessageService', function () {
        describe('constructor', function () {
            it("standard success", function () {
                // arrange/act
                var subjectDef = resolver.resolve('sdk/service/message.node');
                var subject = new subjectDef();
               
                // assert
				should.exist(subject);
            });
        });
		
		describe('load', function () {
            it("standard success", function (done) {
                // arrange
                var subjectDef = resolver.resolve('sdk/service/message.node');
                var subject = new subjectDef();
                
				// act
				subject.load(function(){
					// assert
					
					return done();
				});
            });
        });
        
        describe('unload', function () {
            it("standard success", function (done) {
                // arrange
                var subjectDef = resolver.resolve('sdk/service/message.node');
                var subject = new subjectDef();
                
				// act
				subject.unload(function(){
					// assert
					
					return done();
				});
            });
        });
        
        describe('pause', function () {
            it("standard success", function (done) {
                // arrange
                var subjectDef = resolver.resolve('sdk/service/message.node');
                var subject = new subjectDef();
                
				// act
				subject.pause(function(){
					// assert
					
					return done();
				});
            });
        });
        
        describe('resume', function () {
            it("standard success", function (done) {
                // arrange
                var subjectDef = resolver.resolve('sdk/service/message.node');
                var subject = new subjectDef();
                
				// act
				subject.resume(function(){
					// assert
					
					return done();
				});
            });
        });
        
                
        describe('register', function () {
            var subject;
            
            beforeEach(function(done){
                var subjectDef = resolver.resolve('sdk/service/message.node');
                subject = new subjectDef();
                subject.load(done);
            });
            
            it("Single Message", function () {
                // arrange
                var subjectDef = resolver.resolve('sdk/service/message.node');
                var subject = new subjectDef();
                var sampleMessageDelegate = function(messageType, args){
                    
                };
                
				// act
                subject.register('SampleMessage', sampleMessageDelegate);
                
                // assert
                subject.isRegistered('SampleMessage', sampleMessageDelegate).should.be.ok;
            });
            
           it("Double Message", function () {
                // arrange
                var subjectDef = resolver.resolve('sdk/service/message.node');
                var subject = new subjectDef();
                var sampleMessageDelegate = function(messageType, args){
                    
                };
                var messages = ['SampleMessageA', 'SampleMessageB'];
                
				// act
                subject.register(messages, sampleMessageDelegate);
                
                // assert
                subject.isRegistered(messages).should.be.ok;
            });
            
            it("Invalid Message", function () {
                // arrange
                var subjectDef = resolver.resolve('sdk/service/message.node');
                var subject = new subjectDef();
                var sampleMessageDelegate = function(messageType, args){
                    
                };

				// act
                subject.register('SampleMessageA', sampleMessageDelegate);
                
                // assert
                subject.isRegistered('SampleMessageB').should.not.be.ok;
            });
        });
        
          describe('send', function () {
            var subject;
            
            beforeEach(function(done){
                var subjectDef = resolver.resolve('sdk/service/message.node');
                subject = new subjectDef();
                subject.load(done);
            });
            
            it("Single Message Criteria", function () {
                // arrange
                var subjectDef = resolver.resolve('sdk/service/message.node');
                var subject = new subjectDef();
                var sampleMessageDelegate = sinon.spy();
                var messageType = 'sampleMessage';
                var messageArgs = {
                };
                
				// act
                subject.register(messageType, sampleMessageDelegate);
                subject.send(messageType, messageArgs);
                
                // assert
                sampleMessageDelegate.calledOnce.should.be.ok;
                sampleMessageDelegate.calledWith(messageType, messageArgs).should.be.ok;
            });
            
            it("Double Message Criteria - Ordered", function () {
                // arrange
                var subjectDef = resolver.resolve('sdk/service/message.node');
                var subject = new subjectDef();
                var sampleMessageDelegate = sinon.spy();
                var messageTypes = ['sampleMessageA', 'sampleMessageB'];
                var args = [{ prop: 'A'}, {prop: "B"}];
                
				// act
                subject.register(messageTypes, sampleMessageDelegate, true);
                subject.send(messageTypes[0], args[0]);
                subject.send(messageTypes[1], args[1]);
                
                // assert
                sampleMessageDelegate.calledOnce.should.be.ok;
            });
        });
    });
});