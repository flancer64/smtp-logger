export default class Smtp_Log_App_Db {
    /**
     * @param {typeof import('knex')} knex
     * @param {Smtp_Log_App_Logger} logger
     */
    constructor(
        {
            'node:knex.default': knex,
            Smtp_Log_App_Logger$: logger,
        }
    ) {
        /**
         * Executes the given asynchronous callback using a Knex database instance.
         * Ensures the database connection is closed even if an error occurs.
         *
         * @param {Smtp_Log_Dto_Config.Dto} cfg - The configuration object.
         * @param {function(import('knex').Knex): Promise<*>} callback - An asynchronous callback function that receives a Knex database instance.
         * @returns {Promise<*>} - The result of the callback function.
         */
        this.exec = async function (cfg, callback) {
            let res;
            let db;

            try {
                // Determine the database connection type
                if (
                    (cfg.dbClient === 'sqlite3' || cfg.dbClient === 'better-sqlite3') &&
                    cfg.dbFile
                ) {
                    db = knex({
                        client: cfg.dbClient,
                        connection: {
                            filename: cfg.dbFile,
                        },
                        useNullAsDefault: true,
                    });
                    logger.info(`Using SQLite DB file: ${cfg.dbFile}`);
                } else {
                    db = knex({
                        client: cfg.dbClient,
                        connection: {
                            host: cfg.dbHost,
                            database: cfg.dbName,
                            user: cfg.dbUser,
                            password: cfg.dbPass,
                            port: cfg.dbPort,
                        },
                    });
                    logger.info(
                        `Connecting to network DB at host: ${cfg.dbHost}, database: ${cfg.dbName}`
                    );
                }

                res = await callback(db);
            } catch (err) {
                logger.error(`Database operation failed: ${err.message}`);
                throw err;
            } finally {
                if (db) {
                    await db.destroy();
                    logger.info(`The DB connection is closed.`);
                }
            }

            return res;
        };
    }
}
