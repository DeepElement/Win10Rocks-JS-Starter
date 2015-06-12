var main = require('../main.node'),
    ioc = require('../helper/ioc.node'),
    async = require('async'),
    base = require('./base.node'),
    classHelper = require('../helper/class.node'),
    loki = require('lokijs'),
    util = require('util');

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
        base.prototype.load.call(this, function () {
            async.waterfall([
                function (cb) {
                    that._lokiAdapter = ioc.get("lokiStorageProvider");
                    that._db = new loki(that._lokiDBKey, { adapter: that._lokiAdapter });
                    that._db.loadDatabase(require('../model/mapping.node'),
                        function (resp) {
                            if (resp === 'Database not found')
                                that._db.saveDatabase();
                            return cb();
                        });
                },
                function (cb) {
                    // Run the first iteration of data hydration
                    that._hydrate(true, cb);
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

    _hydrate: function (isStartup, callback) {
        var that = this;
        if (!that._hydrating) {
            that._hydrating = true;
            async.waterfall([
                function (cb) {
                    that._catalogueProvider.fetchFeedConfig({}, function (err, resp) {
                        if (err)
                            return cb(err);

                        that._db.addCollection("events");
                        that._db.addCollection("contributors");
                        that._db.addCollection("media");

                        // create events
                        resp.events.forEach(function (e) {
                            var item = that.eventCollection.findOne({ key: e.key });
                            if (!item)
                                that.eventCollection.insert(e);
                        });
                        return cb();
                    });
                }
            ],
                function (err) {
                    that._hydrating = false;
                    return callback(err);
                });
        }
        else
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

    unload: function (done) {
        var that = this;
        if (that._hydrationTimer)
            that.clearTimeout(that._hydrationTimer);
        if (that._db)
            that._db.saveDatabase();
        return done();
    }
};

module.exports = classHelper.derive(require('./base.node'), _constructor, members);
