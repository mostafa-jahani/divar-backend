const autoBind = require('auto-bind');

module.exports = class Service {
    constructor() {
        autoBind(this);
    }
}