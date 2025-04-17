/**
 * DTO for the DB server configuration.
 * @namespace Smtp_Log_Dto_Config
 */
export default class Smtp_Log_Dto_Config {
    /**
     * @param {typeof Smtp_Log_Enum_Command} CMD
     */
    constructor(
        {
            Smtp_Log_Enum_Command$: CMD,
        }
    ) {
        /**
         * Create a new DTO and populate it with initialization data.
         * @param {Smtp_Log_Dto_Config.Dto} [data]
         * @returns {Smtp_Log_Dto_Config.Dto}
         */
        this.create = function (data) {
            // Initialize DTO with default values
            const res = Object.assign(new Dto(), data);
            // Cast the attributes
            res.dbClient = data?.dbClient ?? 'better-sqlite3';
            res.command = data?.command ?? CMD.LOG;
            res.dbFile = data?.dbFile ?? './var/data.sqlite3';
            return res;
        };
    }
}

// CLASSES
/**
 * Configuration DTO for the application.
 * All properties starting with "db" relate to the Knex configuration used by the app.
 *
 * @memberOf Smtp_Log_Dto_Config
 */
class Dto {
    /**
     * The command to execute.
     * @see Smtp_Log_Enum_Command
     * @type {string}
     */
    command;

    /**
     * The database client for Knex.
     * Allowed values: "pg", "pg-native", "sqlite3", "better-sqlite3", "mysql", "mysql2", "oracledb", "tedious".
     * @type {string}
     */
    dbClient;

    /**
     * The full path to the SQLite database file.
     * @type {string}
     */
    dbFile;

    /**
     * The hostname or IP address for the database connection (used for non-SQLite clients).
     * @type {string}
     */
    dbHost;

    /**
     * The name of the database (used for non-SQLite clients).
     * @type {string}
     */
    dbName;

    /**
     * The password for the database connection (used for non-SQLite clients).
     * @type {string}
     */
    dbPass;

    /**
     * The port number for the database connection (used for non-SQLite clients).
     * @type {number}
     */
    dbPort;

    /**
     * The username for the database connection (used for non-SQLite clients).
     * @type {string}
     */
    dbUser;
}




