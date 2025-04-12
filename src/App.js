export default class Smtp_Log_App {
    /**
     * @param {Smtp_Log_App_Configurator} configurator
     * @param {Smtp_Log_Cmd_Init} cmdInit
     * @param {Smtp_Log_Cmd_Log} cmdLog
     * @param {typeof Smtp_Log_Enum_Command} CMD
     */
    constructor(
        {
            Smtp_Log_App_Configurator$: configurator,
            Smtp_Log_Cmd_Init$: cmdInit,
            Smtp_Log_Cmd_Log$: cmdLog,
            Smtp_Log_Enum_Command$: CMD,
        }
    ) {
        // FUNCS
        /**
         * Function to read data from stdin.
         * @returns {Promise<string>}
         */
        async function readStdin() {
            // Check if the input is coming from a TTY (interactive terminal)
            if (process.stdin.isTTY) {
                // No piped input detected, so return null or an empty string
                return null;
            }
            return new Promise((resolve, reject) => {
                let data = '';
                process.stdin.setEncoding('utf8');
                process.stdin.on('data', chunk => {
                    data += chunk;
                });
                process.stdin.on('end', () => resolve(data));
                process.stdin.on('error', (error) => reject(error));
            });
        }

        // MAIN
        process.on('SIGINT', () => {
            console.log('Received SIGINT. Exiting...');
            process.exit(0);
        });
        process.on('uncaughtException', (err) => {
            console.error('Uncaught Exception:', err);
            process.exit(1);
        });

        this.run = async function () {
            const cfg = configurator.build();
            switch (cfg.command) {
                case CMD.INIT_DB:
                    await cmdInit.exec({cfg});
                    break;
                case CMD.LOG:
                default:
                    const input = await readStdin();
                    if (input) await cmdLog.exec({cfg, input});
            }
        };
    }
}