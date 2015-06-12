var classHelper = require('../helper/class.node'),
    ioc = require('../helper/ioc.node'),
    async = require('async'),
    feedSourceModel = require('../model/feed-source.node'),
    eventModel = require('../model/event.node');

var _constructor = function(options) {};

var members = {
    update: function(db, callback) {
         return this._hydrate(db, callback);
    },

    build: function(db, callback) {
        db.addCollection("events");
        db.addCollection("feedSources");
        db.addCollection("contributors");
        db.addCollection("media");
        return this._hydrate(db, callback);
    },

    _hydrate: function(db, callback) {
        var that = this;
        var catalogueProvider = ioc.get("catalogueProvider");
        async.waterfall([
                     function(cb) {
                         catalogueProvider.fetchFeedConfig({}, function(err, resp) {
                             if (err)
                                 return cb(err);

                             resp.events.forEach(function(e) {
                                 var feedSourceKeys = [];

                                 // create event feed sources
                                 e.feeds.forEach(function(f) {
                                     var item = db.getCollection("feedSources").findOne({
                                         key: f
                                     });
                                     if (!item) {
                                         item = db.getCollection("feedSources").insert(new feedSourceModel({
                                             key: f,
                                             address: f
                                         }));
                                     }
                                     feedSourceKeys.push(item.key);
                                 });

                                 // create event record
                                 var eventItem = db.getCollection("events").findOne({
                                     key: e.name
                                 });
                                 if (!eventItem)
                                     eventItem = db.getCollection("events").insert(new eventModel({
                                         key: e.name,
                                         name: e.name,
                                         feedSources: feedSourceKeys
                                     }));
                             });
                             return cb();
                         });
                     }
                 ],
                 function(err) {
                     that._hydrating = false;
                     return callback(err);
                 });
    }
};

module.exports = classHelper.define(_constructor, members);
