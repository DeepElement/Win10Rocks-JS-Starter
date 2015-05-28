var ioc = require('./helper/ioc.node'),
    config = require('./helper/config.node');

// Copy Env variables into configuration store
config.set("configuration", window.process.env["configuration"] || "development");
config.set("path:app:baseDir", window.process.env["path:app:baseDir"] || "ms-appx:///");
config.set("path:ui:baseDir", window.process.env["path:ui:baseDir"] || "ms-appx:///");
config.set("path:common:baseDir", window.process.env["path:common:baseDir"] || "ms-appx:///");

// Assert framework required settings are present
config.assert("configuration");
//config.assert("path:app:baseDir");
//config.assert("path:ui:baseDir");
//config.assert("path:common:baseDir");

// Register container instances
ioc.register(require('./service/navigation.node'), "application");
ioc.register(require('./service/message.node'), "application");
//ioc.register(require('./command/relay.node'), "request");
