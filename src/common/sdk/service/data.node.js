var main = require('../main.node'),
    ioc = require('../helper/ioc.node'),
    async = require('async'),
    base = require('./base.node'),
    classHelper = require('../helper/class.node'),
    loki = require('lokijs'),
    util = require('util'),
    feedSourceModel = require('../model/feed-source.node'),
    eventModel = require('../model/event.node');

var _constructor = function (options) {
    this._lokiDBKey = "bdf6a7de-f243-4d42-8e91-e5c974b53051";
    this._hydrating = false;
    this._hydrationInterval = 5000;
    this._hydrationTimer = null;
};

var members = {
    load: function (done) {
        var that = this;
        that._catalogueProvider = ioc.get("catalogueProvider");
        that._lokiCatalogueProvider = ioc.get("lokiCatalogueProvider");
        base.prototype.load.call(this, function () {
            async.waterfall([
                function (cb) {
                    that._lokiAdapter = ioc.get("lokiStorageProvider");
                    that._db = new loki(that._lokiDBKey, {
                        adapter: that._lokiAdapter
                    });
                    that._loadDatabase(cb);
                },
                function (cb) {
                    // Run the first iteration of data hydration
                    that._lokiCatalogueProvider.build(that._db, cb);
                }
            ],
                function (err) {
                    if (err)
                        return done(err);

                    // schedule the hydrator
                    that._hydrationTimer = that.setInterval(function () {
                        that._hydrate(false, function () { });
                    }, 5000);

                    return done();
                });
        });
    },

    _loadDatabase: function (callback) {
        var that = this;
        if (that._db) {
            that._db.loadDatabase(require('../model/mapping.node'),
                function (resp) {
                    if (resp === 'Database not found')
                        that._db.saveDatabase();
                    return callback();
                });
        }
        else
            return callback();
    },

    _hydrate: function (isStartup, callback) {
        var that = this;
        if (!that._hydrating) {
            that._hydrating = true;
            that._lokiCatalogueProvider.update(that._db,
                function (err) {
                    that._hydrating = false;
                    return callback(err);
                });
        } else
            return callback();
    },

    contributorCollection: {
        get: function () {
            return this._db.getCollection("contributors");
        }
    },

    eventCollection: {
        get: function () {
            return this._db.getCollection("events");
        }
    },

    mediaCollection: {
        get: function () {
            return this._db.getCollection("media");
        }
    },

    feedSourceCollection: {
        get: function () {
            return this._db.getCollection("feedSources");
        }
    },

    pause: function (done) {
        var that = this;
        base.prototype.pause.call(this, function () {
            if (that._db)
                that._db.saveDatabase(done);
            else
                return done();
        });
    },

    resume: function (done) {
        var that = this;
        base.prototype.resume.call(this, function () {
            if (that._db)
                that._loadDatabase(done);
            else
                return done();
        });
    },

    unload: function (done) {
        var that = this;
        base.prototype.unload.call(this, function () {
            if (that._hydrationTimer)
                that.clearTimeout(that._hydrationTimer);
            if (that._db)
                that._db.saveDatabase();
            return done();
        });
    }
};

module.exports = classHelper.derive(require('./base.node'), _constructor, members);
