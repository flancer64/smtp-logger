/**
 * Persistent DTO with metadata for the RDB entity: Out.
 * Implements metadata and utility methods for the entity.
 * @namespace Smtp_Log_RDb_Schema_Message
 */
export default class Smtp_Log_RDb_Schema_Message {

    constructor() {
        /**
         * @returns {Smtp_Log_RDb_Schema_Message.Dto}
         */
        this.createDto = function () {
            return new Dto();
        };

        /**
         * Returns the attribute map for the entity.
         *
         * @returns {typeof Smtp_Log_RDb_Schema_Message.ATTR}
         */
        this.getAttributes = () => ATTR;

        /**
         * Returns the entity's path in the DEM.
         *
         * @returns {string}
         */
        this.getEntityName = () => `${TABLE}`;

        /**
         * Returns the primary key attributes for the entity.
         *
         * @returns {Array<string>}
         */
        this.getPrimaryKey = () => [ATTR.ID];
    }
}

// VARS

/**
 * @type {string}
 */
const TABLE = 'message';

/**
 * The columns (the attribute names).
 * @memberOf Smtp_Log_RDb_Schema_Message
 */
const ATTR = {
    ID: 'id',
    ORIGIN: 'origin',
    RECIPIENT: 'recipient',
    SENDER: 'sender',
    SUBJECT: 'subject',
    TS: 'ts',
};
Object.freeze(ATTR);

// CLASSES

/**
 * @memberOf Smtp_Log_RDb_Schema_Message
 */
class Dto {
    /**
     * Internal ID for the record.
     * @type {number}
     */
    id;
    /**
     * The original content of the email.
     * @type {string}
     */
    origin;
    /**
     * @type {string}
     */
    recipient;
    /**
     * @type {string}
     */
    sender;
    /**
     * @type {string}
     */
    subject;
    /**
     * The timestamp.
     * @type {Date}
     */
    ts;
}


