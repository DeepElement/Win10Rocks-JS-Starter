var main = require('../main.node'),
    async = require('async'),
    classHelper = require('../helper/class.node');

var _constructor = function (options) {
    this._registry = [];
    this._messageStack = [];
}

var members = {
    _findRecordByMessageCriteria: function (criteria) {
        for (var i = 0; i <= this._registry.length - 1; i++) {
            if (this._registry[i].messages.contains(criteria, true) && this._registry[i].messages.length == criteria.length)
                return this._registry[i];
        };
        return null;
    },

    register: function (messageTypes, callback, ordered) {
        if(!Array.isArray(messageTypes))
            messageTypes = [messageTypes];
        
        
        var existingRecord = this._findRecordByMessageCriteria(messageTypes);
        if (!existingRecord) {
            existingRecord = {
                messages: messageTypes,
                callbacks: [],
                ordered: ordered || false
            };
            this._registry.push(existingRecord);
        }

        if (existingRecord.callbacks.indexOf(callback) == -1)
            existingRecord.callbacks.push(callback);
    },
    
    isRegistered : function(messageTypes){
        if(!Array.isArray(messageTypes))
            messageTypes = [messageTypes];
        
        var existingRecord = this._findRecordByMessageCriteria(messageTypes);
        return existingRecord != null;
    },

    unregister: function (messageTypes, delegate) {
        if(!Array.isArray(messageTypes))
            messageTypes = [messageTypes];
        
        var existingRecord = this._findRecordByMessageCriteria(messageTypes);
        if (existingRecord && existingRecord.callbacks.indexOf(delegate) != -1)
            existingRecord.callbacks.splice(existingRecord.callbacks.indexOf(delegate), 1);

        if (existingRecord && existingRecord.callbacks.length == 0)
            this._registry.splice(this._registry.indexOf(existingRecord), 1);
    },

    send: function (messageType, args) {
        var _self = this;
        if (!_self.pendingDispose) {
            _self._messageStack.push(messageType);

            var _context = args;
            if (args && args.viewKey)
                _context = args.viewKey;

            _self.dispatchEvent("send", {
                type: messageType,
                args: args
            });

            var callbackPayload = [];

            // match the exact message
            var existingRecord = _self._findRecordByMessageCriteria([messageType]);
            if (existingRecord && existingRecord.callbacks.length > 0) {
                existingRecord.callbacks.forEach(function (c) {
                    callbackPayload.push(c);
                });
            }

            // match combinations
            var combinationContext;
            _self._registry.forEach(function (r) {
                if (r.messages.length > 1 && _self._messageStack.contains(r.messages, r.ordered)) {
                    combinationContext = r.messages;
                    r.callbacks.forEach(function (c) {
                        callbackPayload.push(c);
                    });
                }
            });

            async.each(
                callbackPayload,
                function (item, item_callback) {
                    if(args)
                        item(messageType, args);
                    else
                        item(messageType);
                        
                    item_callback();
                },
                function () {
                    // AOP Broadcast
                    main.getAllComponentInstances().forEach(function (component) {
                        if (component["on" + messageType])
                            component["on" + messageType](messageType, args);
                    });
                });
        }
    }
};

module.exports = classHelper.derive(require('./base.node'), _constructor, members);