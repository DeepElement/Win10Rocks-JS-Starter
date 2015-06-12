var common = require('../common'),
    assert = require('assert'),
    should = require('should'),
    resolver = require('../../resolver'),
    sinon = require('sinon');

describe('Unit', function () {
    describe('CatalogueProvider', function () {
        describe('constructor', function () {
            it("standard success", function () {
                // arrange/act
                var subjectDef = resolver.resolve('sdk/provider/catalogue.node');
                var subject = new subjectDef();

                // assert
                should.exist(subject);
            });
        });
    });
});