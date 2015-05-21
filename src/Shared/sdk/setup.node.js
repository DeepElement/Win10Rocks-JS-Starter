﻿var ioc = require('./helper/ioc.node'),
    config = require('./helper/config.node');

// Register container instances
ioc.register(require('./service/navigation.node'), "application");
ioc.register(require('./service/message.node'), "application");
//ioc.register(require('./provider/logging.node'), "request");
//ioc.register(require('./view-model/home.node', 'request'));
//ioc.register(require('./view-model/login.node', 'request'));
//ioc.register(require('./view-model/settings.node', 'request'));
//ioc.register(require('./view-model/splash.node', 'request'));


//config.set("behaviors:viewLoadTimeout", 10000);