var classHelper = require('../helper/class.node'),
    main = require('../main.node'),
    async = require('async');

var messageService = function (options) {
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

    register: function () {
        var _context = NBCU.Class.args.apply(this, arguments);

        var messagePayload = _context.data;
        if (!Array.isArray(messagePayload)) {
            messagePayload = [messagePayload];
        }

        var existingRecord = this._findRecordByMessageCriteria(messagePayload);
        if (!existingRecord) {
            existingRecord = {
                messages: messagePayload,
                callbacks: [],
                ordered: _context.options.ordered || false
            };
            this._registry.push(existingRecord);
        }

        if (existingRecord.callbacks.indexOf(_context.callback) == -1)
            existingRecord.callbacks.push(_context.callback);
    },

    unregister: function (messageType, delegate) {
        var _context = NBCU.Class.args.apply(this, arguments);

        var messagePayload = _context.data;
        if (!Array.isArray(messagePayload)) {
            messagePayload = [messagePayload];
        }

        var existingRecord = this._findRecordByMessageCriteria(messagePayload);
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
            _self._registry.forEach(function (r) {
                if (r.messages.length > 1 && _self._messageStack.contains(r.messages, r.ordered)) {
                    r.callbacks.forEach(function (c) {
                        callbackPayload.push(c);
                    });
                }
            });

            async.each(
                callbackPayload,
                function (item, item_callback) {
                    item(messageType, args || {});
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
}

var staticMembers = {

}

module.exports = classHelper.derive(require('./base.node'), messageService, members, staticMembers);