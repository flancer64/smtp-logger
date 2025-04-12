export default class Smtp_Log_Cmd_Log {
    /**
     * @param {typeof import('mailparser')} mailparser
     * @param {Smtp_Log_App_Logger} logger
     * @param {Smtp_Log_App_Db} appDb
     * @param {Smtp_Log_RDb_Schema_Message} rdbOut
     */
    constructor(
        {
            'node:mailparser': mailparser,
            Smtp_Log_App_Logger$: logger,
            Smtp_Log_App_Db$: appDb,
            Smtp_Log_RDb_Schema_Message$: rdbOut,
        }
    ) {
        //VARS
        const {simpleParser} = mailparser;
        const TABLE = rdbOut.getEntityName();
        const ATTR = rdbOut.getAttributes();

        // MAIN
        /**
         * Executes the insert operation and logs the primary key (id) of the new record.
         *
         * @param {Smtp_Log_Dto_Config.Dto} cfg - The configuration object.
         * @param {string} input - The raw email input.
         * @returns {Promise<void>}
         */
        this.exec = async function ({cfg, input}) {
            await appDb.exec(cfg, async (knex) => {
                logger.info(`Store the email.`);
                const parsed = await simpleParser(input);
                const dto = rdbOut.createDto();
                dto.origin = input;
                dto.recipient = parsed.to.text;
                dto.sender = parsed.from.text;
                dto.subject = parsed.subject;
                dto.ts = new Date();

                // Insert the record and get the key according to the DB client
                let result;
                if (cfg.dbClient === 'pg' || cfg.dbClient === 'pg-native') {
                    // For PostgreSQL, use .returning('id') to get the primary key.
                    result = await knex(TABLE).insert(dto).returning(ATTR.ID);
                } else {
                    // For other DBs (e.g., SQLite, MySQL) the insert returns an array with the inserted id.
                    result = await knex(TABLE).insert(dto);
                }

                // Extract the id from the result
                let insertedId;
                if (Array.isArray(result) && result.length > 0) {
                    if (typeof result[0] === 'object' && result[0] !== null && ATTR.ID in result[0]) {
                        insertedId = result[0][ATTR.ID];
                    } else {
                        insertedId = result[0];
                    }
                }

                logger.info(`The email is stored as #${insertedId}.`);
            });
        };

    }
}

