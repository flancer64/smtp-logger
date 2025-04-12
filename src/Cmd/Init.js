export default class Smtp_Log_Cmd_Init {
    /**
     * @param {Smtp_Log_App_Logger} logger
     * @param {Smtp_Log_RDb_Schema} schema
     */
    constructor(
        {
            Smtp_Log_App_Logger$: logger,
            Smtp_Log_RDb_Schema$: schema,
        }
    ) {
        //VARS

        // MAIN
        /**
         * @param {Smtp_Log_Dto_Config.Dto} cfg
         * @returns {Promise<void>}
         */
        this.exec = async function ({cfg}) {
            logger.info(`Initialize the database structure.`);
            await schema.create({cfg});
        };
    }
}

