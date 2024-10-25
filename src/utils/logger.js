/**
 * Array of allowed log statuses.
 * @type {string[]}
 */
const allowedStatus = ['INFO', 'WARN', 'ERROR', 'SUCCESS'];

/**
 * Console colors associated with each log status.
 * @type {Object<string, string>}
 */
const colors = {
    'INFO': '\x1b[34m',    // Blue
    'WARN': '\x1b[33m',    // Yellow
    'ERROR': '\x1b[31m',   // Red
    'SUCCESS': '\x1b[32m'  // Green
};

/**
 * Prints a message to the console with a specified log status.
 *
 * @param {Object} options - Options for the log message.
 * @param {string} options.msg - The message to print.
 * @param {string} [options.status='INFO'] - The status of the log message. Must be one of the values in `allowedStatus`.
 * 
 * @throws {Error} If the provided status is not in `allowedStatus`.
 */
function printLog({ msg, status = 'INFO' }) {
    if (!allowedStatus.includes(status)) {
        console.error('Invalid status when trying to print log');
    }

    console.log(`${colors[status]}[${status}] ${msg}\x1b[0m`);
}

module.exports = { printLog };
