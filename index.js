'use strict';

module.exports = function(options) {
  options = options || {};
  return function(req, res, next) {
    if (options.enabled === false) {
      return next();
    }
    if (options.whitelist && Array.isArray(options.whitelist) && options.whitelist.indexOf(req.url)!==-1) {
      return next();
    }
    const headerVariableName = options.headerVariableName || 'x-gateway-token';
    const envVariableName = options.envVariableName || 'GATEWAY_TOKEN';
    const gatewayToken = process.env[envVariableName];
    if (gatewayToken && req.headers[headerVariableName] === gatewayToken) {
      return next();
    }
    return res.status(403).send('Forbidden');
  };
};
