# Playwright AI Visual Verify 🔍

Enhance your Playwright tests with AI-powered visual verification using OpenAI

[![npm version](https://badge.fury.io/js/playwright-ai-visual-verify.svg)](https://www.npmjs.com/package/playwright-ai-visual-verify)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Quick Start

### 1. Install

```bash
npm install playwright-ai-visual-verify
```

### 2. Setup

In your `playwright.config.js`:

```javascript
import { defineConfig } from '@playwright/test';
import { expect } from '@playwright/test';
import { extendExpect } from 'playwright-ai-visual-verify';


extendExpect(expect, {
    openAI: {
        apiKey: 'OPEN_AI_KEY',
    }
});

export default defineConfig({
  // Your config here
});

// ...
```

### 3. Use

```javascript
import { test, expect } from '@playwright/test';

test('verify page content', async ({ page }) => {
  await page.goto('https://your-site.com');
  
  // Verify elements using AI
  await expect(page.locator('h1')).verifyWithVisionAI('Should be a large heading displaying "Welcome"');
    
  await expect(page.locator('.nav-menu')).verifyWithVisionAI('Should be a navigation menu with 5 items');
});
```

## 🎯 Features

- 🤖 **AI-Powered Verification**: Uses OpenAI to understand and verify visual elements
- 🎨 **Visual Content Analysis**: Validates layouts, text, images, and UI elements
- 🔄 **Smart Retries**: Automatically retries verifications for reliability
- 💨 **Performance Optimized**: Caches descriptions for faster subsequent runs

## 📝 Example Assertions

```javascript
// Text content
await expect(element).verifyWithVisionAI('Has the text "Login"');

// Visual appearance
await expect(button).verifyWithVisionAI('Is a blue button with rounded corners');

// Complex layouts
await expect(navbar).verifyWithVisionAI('Contains a logo on the left and 4 navigation links');

// State verification
await expect(modal).verifyWithVisionAI('Should be visible and centered on the screen');
```

## ⚙️ Environment Setup

There are two possible scenarios

### Environment variables

Set your OpenAI API key, by running in your terminal the following command:

```bash
export OPENAI_API_KEY=your_api_key_here
```

### Providing an API key explicitly

In your `playwright.config.js`:

```diff
import { defineConfig } from '@playwright/test';
import { expect } from '@playwright/test';
import { extendExpect } from 'playwright-ai-visual-verify';


extendExpect(expect, {
+  openAI: {
+    apiKey: 'OPEN_AI_KEY',
+  }
})

export default defineConfig({
  // Your config here
});

// ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [Esteve Segura Esteve a.k.a GiR]

---

<p align="center">Made with ❤️ for the Playwright community</p>
