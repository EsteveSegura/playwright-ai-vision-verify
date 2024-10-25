const OpenAI = require('./utils/openAi');

const { descriptionsCache } = require('./utils/cache');
const { printLog } = require('./utils/logger');
const { retry } = require('./utils/retry');
const {
    describeFromScreenshotPrompt,
    assertFromScreenshotDescriptionPrompt,
    assertFromScreenshotPrompt
 } = require('./utils/promptBuilder');

// Helper function to take a screenshot of an element
// and return it as a base64 URL data.
async function _takeScreenshot({ receivedElement }) {
    printLog({ msg: `Taking screenshot to: ${receivedElement}` });
    const screenshot = await receivedElement.screenshot()
    const screenshotBase64UrlData = `data:image/png;base64,${screenshot.toString('base64')}`;

    return screenshotBase64UrlData;
}

module.exports = {
    extendExpect: (expect, config) => {
        // Use API key from config if is present
        let instanceOpenAI = null
        if (config.openAI && config.openAI.apiKey) {
            instanceOpenAI = OpenAI.getInstance({ apiKey: config.openAI.apiKey });
        } else {
            instanceOpenAI = OpenAI.getInstance();
        }

        expect.extend({
            async verifyWithVisionAI(receivedElement, ...args) {
                // Check if the selector was cached
                // If the selector was not cached, we will
                printLog({ msg: `Checking cache`, status: 'INFO' });
                const currentSelector = receivedElement._selector;
                if (!descriptionsCache.get(currentSelector)) {
                    printLog({ msg: `Element not cached, running description`, status: 'INFO' });
                    
                    const screenshotBase64UrlData = await _takeScreenshot({ receivedElement });
                    const promptScreenshotDescription = describeFromScreenshotPrompt();
                    const descriptionFromScreenshotInference = await instanceOpenAI.textWithImageInference({ prompt: promptScreenshotDescription, img: screenshotBase64UrlData })
                    
                    descriptionsCache.set(currentSelector, descriptionFromScreenshotInference);
                }
                
                // Get the description from the cache
                // and run the inference with the screenshot description
                printLog({ msg: `Running assertion from cached descripcion`, status: 'INFO' });
                const descriptionFromScreenshot = descriptionsCache.get(currentSelector);
                const promptScreenshotDescriptionAssert = assertFromScreenshotDescriptionPrompt({
                    description: descriptionFromScreenshot,
                    assert: args[0]
                });
                let result = await retry(async () => {
                    const resultInference = await instanceOpenAI.textInference({ prompt: promptScreenshotDescriptionAssert })
                    return JSON.parse(resultInference.split('---')[1].trim());
                }, 3);

                // If result.assert is false, lets retry but lets send the
                // screenshot with the specific assert
                if (!result.assert) {
                    printLog({ msg: `Assert went wrong, trying with sending screenshot`, status: 'WARN' });
                    const screenshotBase64UrlData = await _takeScreenshot({ receivedElement });
                    const promptScreenshotAssert = assertFromScreenshotPrompt({ assert: args[0] });
                    result = await retry(async () => {
                        const resultInference = await instanceOpenAI.textWithImageInference({ prompt: promptScreenshotAssert, img: screenshotBase64UrlData })
                        return JSON.parse(resultInference.split('---')[1].trim());
                    }, 3);
                }

                if (result.assert) {
                    printLog({ msg: `AI assertion passed: ${args[0]}`, status: 'SUCCESS' });
                    return { message: () => `PASS`, pass: true };
                } else {
                    printLog({ msg: `AI assertion failed: ${args[0]} AI Feedback: ${result.reason} `, status: 'ERROR' });
                    return { message: () => result.reason, pass: false };
                }
            }
        });
    }
}