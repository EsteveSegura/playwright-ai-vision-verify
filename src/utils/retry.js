/**
 * Executes a function with retry logic in case of failure.
 *
 * @param {Function} fn - The asynchronous function to execute.
 * @param {number} [retries=3] - The number of retry attempts before throwing an error.
 * @returns {Promise<*>} The result of the function if it succeeds within the retry limit.
 * @throws {Error} Throws the last encountered error if all retries fail.
 */
async function retry(fn, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === retries - 1) {
                throw error;
            }
        }
    }
}

module.exports = { retry };