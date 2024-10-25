/**
 * Import the OpenAI library.
 * @module OpenAILibrary
 */
const { OpenAI: OpenAILibrary } = require("openai");

/**
 * Class representing an OpenAI instance.
 */
class OpenAI {
    /**
     * @type {OpenAI}
     * @private
     * @static
     */
    static #instance;

    /**
     * Create an OpenAI instance.
     * @param {Object} options - Options for the OpenAI instance.
     * @param {string} [options.model="gpt-4o-mini"] - The model to be used for inferences.
     * @param {string} [options.apiKey=""] - The API key for OpenAI.
     * @private
     */
    constructor({ model = "gpt-4o-mini", apiKey = '' }) {
        if (OpenAI.#instance) {
            return OpenAI.#instance;
        }

        /**
         * @type {string}
         * @description The model used for OpenAI inferences.
         */
        this.model = model;

        /**
         * @type {string}
         * @description The API key for OpenAI.
         */
        this.apiKey = apiKey;

        /**
         * @type {Object}
         * @description The OpenAI library instance.
         */
        this.openai = this.#init();

        OpenAI.#instance = this;
    }

    /**
     * Gets the singleton instance of OpenAI.
     * @param {Object} options - Options for the OpenAI instance.
     * @param {string} [options.model="gpt-4o-mini"] - The model to be used for inferences.
     * @param {string} [options.apiKey=""] - The API key for OpenAI.
     * @returns {OpenAI} The singleton instance
     */
    static getInstance(options = {}) {
        if (!OpenAI.#instance) {
            OpenAI.#instance = new OpenAI(options);
        }
        return OpenAI.#instance;
    }

    /**
     * Initialize the OpenAI library instance.
     * @private
     * @returns {Object} - The initialized OpenAI library instance.
     */
    #init() {
        if(this.apiKey) {
            return new OpenAILibrary({ apiKey: this.apiKey });
        }

        return new OpenAILibrary();
    }

    /**
     * Generate text inference using a prompt.
     * @async
     * @param {Object} options - The options for the text inference.
     * @param {string} options.prompt - The prompt for the text generation.
     * @returns {Promise<string>} - The generated text response.
     */
    async textInference({ prompt }) {
        const response = await this.openai.chat.completions.create({
            model: this.model,
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: prompt },
                    ],
                },
            ],
        });

        return response.choices[0].message.content;
    }

    /**
     * Generate text with image inference using a prompt and an image.
     * @async
     * @param {Object} options - The options for the text and image inference.
     * @param {string} options.prompt - The prompt for the text generation.
     * @param {string} options.img - The image URL to be used in the prompt.
     * @returns {Promise<string>} - The generated text response.
     */
    async textWithImageInference({ prompt, img }) {
        const response = await this.openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: prompt },
                        { type: "image_url", image_url: { "url": img } },
                    ],
                },
            ],
        });

        return response.choices[0].message.content;
    }
}

/**
 * Export the OpenAI class.
 * @module OpenAI
 */
module.exports = OpenAI;