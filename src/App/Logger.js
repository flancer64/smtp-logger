/**
 * The app level wrapper for the console logger.
 */
export default class Smtp_Log_App_Logger {
    info(...args) {
        console.info(...args);
    }

    warn(...args) {
        console.warn(...args);
    }

    error(...args) {
        console.error(...args);
    }

    debug(...args) {
        console.debug(...args);
    }

    log(...args) {
        console.log(...args);
    }
}
