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
ioc.register("navigationService", require('./service/navigation.node'), "application");
ioc.register("messageService", require('./service/message.node'), "application");
ioc.register("dataService", require('./service/data.node'), "application");
ioc.register("navigationProvider", require('./provider/navigation.node'), "request");
ioc.register("networkProvider", require('./provider/network.node'), "request");
ioc.register("storageProvider", require('./provider/storage.node'), "request");
ioc.register("catalogueProvider", require('./provider/catalogue.node'), "request");
ioc.register("lokiStorageProvider", require('./provider/loki-storage.node'), "request");
ioc.register("lokiCatalogueProvider", require('./provider/loki-catalogue.node'), "request");