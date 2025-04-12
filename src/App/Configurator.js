export default class Smtp_Log_App_Configurator {
    /**
     * @param {typeof import('minimist')} minimist
     * @param {typeof import('dotenv')} dotenv
     * @param {Smtp_Log_Dto_Config} dtoConfig
     * @param {typeof Smtp_Log_Enum_Command} CMD
     */
    constructor(
        {
            'node:minimist.default': minimist,
            'node:dotenv.default': dotenv,
            Smtp_Log_Dto_Config$: dtoConfig,
            Smtp_Log_Enum_Command$: CMD,
        }
    ) {
        // MAIN
        // Load environment variables from .env file
        dotenv.config();

        /**
         * Builds the configuration DTO by parsing CLI arguments.
         * It supports all DTO attributes related to application and Knex configuration.
         *
         * @returns {Smtp_Log_Dto_Config.Dto}
         */
        this.build = function () {

            // Parse command-line arguments using minimist
            const args = minimist(process.argv.slice(2));

            // Create a new DTO instance
            const res = dtoConfig.create();

            // Set the command from positional arguments or fallback to default command
            res.command = args._[0] || CMD.LOG;

            // Set database configuration parameters:
            // Use CLI parameters if provided, otherwise fallback to the corresponding environment variable.
            res.dbClient = args.dbClient || process.env.DB_CLIENT || 'better-sqlite3';
            res.dbFile = args.dbFile || process.env.DB_FILE;
            res.dbHost = args.dbHost || process.env.DB_HOST;
            res.dbName = args.dbName || process.env.DB_NAME;
            res.dbPass = args.dbPass || process.env.DB_PASS;
            res.dbPort = args.dbPort ? Number(args.dbPort) : (process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined);
            res.dbUser = args.dbUser || process.env.DB_USER;

            return res;
        };
    }
}
