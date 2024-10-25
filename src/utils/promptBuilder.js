/**
 * Generates a prompt for describing UI elements from a screenshot.
 *
 * @returns {string} The generated description prompt for detailed UI analysis.
 */
function describeFromScreenshotPrompt() {
    return `You are an expert in UI testing. Your task is to receive screenshots of web pages or components and provide a detailed analysis of their contents.

    1. Carefully examine the provided image to fully understand its contents and context.

    2. Write a comprehensive description of the image, ensuring to include the following details:
    2.1 Visual elements: icons, colors, shapes, buttons, text fields, images, etc.
    2.2 Layout and structure: positioning of elements, alignment, spacing, and overall visual hierarchy.
    2.3 Interactive elements: buttons, links, dropdowns, or other user interaction points.
    2.4 Lists and their order: bullet points, numbered lists, or any sequence of items presented.
    2.5 Colors and contrast: mention specific colors used, their placement, and any contrast-related considerations.
    2.6 Typography: fonts, sizes, styles, and readability of any text displayed.

    3. Ensure that your analysis is structured and easy to follow, highlighting all relevant UI-specific details clearly.`
}

/**
 * Generates a prompt for evaluating an assert statement based on a screenshot.
 *
 * @param {Object} options - Options for generating the assert prompt.
 * @param {string} options.assert - The assert statement to be evaluated.
 * @returns {string} The generated prompt for assessing UI assertions.
 */
function assertFromScreenshotPrompt({ assert }) {
    return `You are an expert in UI testing. Your task is to receive screenshots of web pages or components and evaluate whether the provided assert statement is correct or not.
    Carefully analyze the provided image and describe it in detail to ensure you fully understand its contents and context.
    Write a description of the image, including relevant visual elements, layout, and UI-specific details.

    After describing the image, analyze the given assert statement:
    ASSERT: ${assert}

    Use logical reasoning to determine if the assert holds true for the image. Clearly consider relevant visual elements, layout, and any UI-specific details.
    After completing your reasoning, separate your reasoning from the JSON result with a line containing --- and then provide the result in the following JSON format:

    If the assert is correct:
    {"assert": true}

    If the assert is incorrect:
    {"assert": false, "reason": "EXPLANATION OF WHAT WENT WRONG"}

    Ensure that your output always includes detailed reasoning before the JSON result, and that the JSON result is provided as the last line of your response.`
}

/**
 * Generates a prompt for evaluating an assert statement based on a screenshot and its description.
 *
 * @param {Object} options - Options for generating the assert prompt.
 * @param {string} options.description - Description of the screenshot to use in the assert evaluation.
 * @param {string} options.assert - The assert statement to be evaluated.
 * @returns {string} The generated prompt for assessing UI assertions using a description.
 */
function assertFromScreenshotDescriptionPrompt({ description, assert }) {
    return `You are an expert in UI testing. Your task is to receive screenshots of web pages or components and evaluate whether the provided assert statement is correct or not.
    
    Carefully analyze the provided image along with the given description:
    DESCRIPTION: ${description}
    
    Use the description to understand the context and details of the image.
    
    After reviewing the image and the description, analyze the given assert statement:
    ASSERT: ${assert}

    Use logical reasoning to determine if the assert holds true for the image. Clearly consider relevant visual elements, layout, and any UI-specific details.
    After completing your reasoning, separate your reasoning from the JSON result with a line containing --- and then provide the result in the following JSON format:
    
    If the assert is correct:
    {"assert": true}
    
    If the assert is incorrect:
    {"assert": false, "reason": "EXPLANATION OF WHAT WENT WRONG"}
    
    Ensure that your output always includes detailed reasoning before the JSON result, and that the JSON result is provided as the last line of your response.`
}

module.exports = {
    describeFromScreenshotPrompt,
    assertFromScreenshotDescriptionPrompt,
    assertFromScreenshotPrompt,
}