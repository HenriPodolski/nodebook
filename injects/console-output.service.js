class ConsoleOutputService {

    constructor() {
        this.logs = [];
        this.counters = {};
        this.timers = {};
        this.oldConsole = {};
    }

    addToLog(log) {
        if (log.out instanceof Array) {
            log.out.forEach((out) => {
                this.logs.push({type: log.type, out});
            });
        } else {
            this.logs.push(log);
        }
    }

    assert(condition, message) {
        if (!condition) {
            const out = message;
            const type = 'assert';
            this.addToLog({type, out});
            return out;
        }
    }

    clear() {
        this.counters = {};
        this.timers = {};
        this.logs = [];
    }

    count(label = 'default') {
        if (!this.counters[label]) {
            this.counters[label] = 1;
        } else {
            this.counters[label]++;
        }

        const out = this.counters[label];
        const type = 'count';
        this.addToLog({type, out});
        return out;
    }

    debug(...args) {
        const out = args;
        const type = 'debug';
        this.addToLog({type, out});
        return out;
    }

    dir(...args) {
        const out = args;
        const type = 'dir';
        this.addToLog({type, out});
        return out;
    }

    dirxml(...args) {
        const out = args;
        const type = 'dirxml';
        this.addToLog({type, out});
        return out;
    }

    error(...args) {
        const out = args;
        const type = 'error';
        this.addToLog({type, out});
        return out;
    }

    noop() {}

    group() {
        return this.noop();
    }

    groupCollapsed() {
        return this.noop();
    }

    groupEnd() {
        return this.noop();
    }

    info(...args) {
        const out = args;
        const type = 'info';
        this.addToLog({type, out});
        return out;
    }

    log(...args) {
        const out = args;
        const type = 'log';
        this.addToLog({type, out});
        return out;
    }

    table(...args) {
        const out = args;
        const type = 'table';
        this.addToLog({type, out});
        return out;
    }

    time(label = 'default') {
        this.timers[label] = Date.now();
    }

    timeEnd(label = 'default') {
        if (this.timers[label]) {
            const time = Date.now() - this.timers[label];
            delete this.timers[label];
            const out = time;
            const type = 'time';
            this.addToLog({type, out});
            return out;
        }

        return this.noop();
    }

    trace() {
        return this.noop();
    }

    warn(...args) {
        const out = args;
        const type = 'warn';
        this.addToLog({type, out});
        return out;
    }

    hook() {
        this.oldConsole = Object.assign({}, console);

        console.assert = this.assert.bind(this);
        console.clear = this.clear.bind(this);
        console.count = this.count.bind(this);
        console.debug = this.debug.bind(this);
        console.dir = this.dir.bind(this);
        console.dirxml = this.dirxml.bind(this);
        console.error = this.error.bind(this);
        console.group = this.group.bind(this);
        console.groupCollapsed = this.groupCollapsed.bind(this);
        console.groupEnd = this.groupEnd.bind(this);
        console.info = this.info.bind(this);
        console.log = this.log.bind(this);
        console.table = this.table.bind(this);
        console.time = this.time.bind(this);
        console.timeEnd = this.timeEnd.bind(this);
        console.trace = this.trace.bind(this);
        console.warn = this.warn.bind(this);
    }

    expose() {
        return JSON.parse(JSON.stringify(this.logs));
    }

    unhook() {
        this.clear();

        console.assert = this.oldConsole.assert;
        console.clear = this.oldConsole.clear;
        console.count = this.oldConsole.count;
        console.debug = this.oldConsole.debug;
        console.dir = this.oldConsole.dir;
        console.dirxml = this.oldConsole.dirxml;
        console.error = this.oldConsole.error;
        console.group = this.oldConsole.group;
        console.groupCollapsed = this.oldConsole.groupCollapsed;
        console.groupEnd = this.oldConsole.groupEnd;
        console.info = this.oldConsole.info;
        console.log = this.oldConsole.log;
        console.table = this.oldConsole.table;
        console.time = this.oldConsole.time;
        console.timeEnd = this.oldConsole.timeEnd;
        console.trace = this.oldConsole.trace;
        console.warn = this.oldConsole.warn;
    }
}

module.exports = ConsoleOutputService;
