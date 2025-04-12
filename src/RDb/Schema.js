export default class Smtp_Log_RDb_Schema {
    /**
     * @param {Smtp_Log_App_Logger} logger
     * @param {Smtp_Log_App_Db} appDb
     * @param {Smtp_Log_RDb_Schema_Message} rdbOut
     */
    constructor(
        {
            Smtp_Log_App_Logger$: logger,
            Smtp_Log_App_Db$: appDb,
            Smtp_Log_RDb_Schema_Message$: rdbOut,
        }
    ) {
        /**
         *
         * @param {Smtp_Log_Dto_Config.Dto} cfg
         * @returns {Promise<void>}
         */
        this.create = async function ({cfg}) {
            await appDb.exec(cfg, async (knex) => {
                // create a new table
                const tableName = rdbOut.getEntityName();
                const ATTR = rdbOut.getAttributes();
                const exists = await knex.schema.hasTable(tableName);
                if (!exists) {
                    // Table and column names are controlled and safe (not from user input)
                    await knex.schema.createTable(tableName, (table) => {
                        table.increments(ATTR.ID).primary();
                        table.timestamp(ATTR.TS).defaultTo(knex.fn.now());
                        table.text(ATTR.SENDER);
                        table.text(ATTR.RECIPIENT);
                        table.text(ATTR.SUBJECT);
                        table.text(ATTR.ORIGIN);
                    });
                    logger.info(`The '${tableName}' table is created.`);
                } else {
                    logger.info(`The '${tableName}' table exists. Please, drop it manually.`);
                }
            });
        };
    }
}