# SIVI UI SDK Integration Guide

This guide explains how to set up and run the sample **webeditor-ui** (frontend) for experimenting with the SIVI UI SDK.

## 🚀 Getting Started

### 1️⃣ **Install Dependencies**

Run the following commands inside `webeditor-ui`:

```sh
# Install dependencies for the UI
cd ../webeditor-ui
yarn
```

---

### 2️⃣ **Update Frontend (`webeditor-ui`)**

- Open `index.html` and update the **SIVI script**:

```html
<script src="https://sdk.sivicloud.com/script.js?namespace=SIVI&apiKeyId={apiKey}"></script>
```

Replace:
- `{apiKey}` → Your actual API key  

**Start the UI locally**:
```sh
yarn dev
```

---

### **How SIVI UI SDK Works**

- After embedding the script, `window.SIVI` is available.
- The SDK provides methods like:
  - `open(params, containerId)`
  - `close()`
  - `events` (like `WIDGET_LOGIN`, `WIDGET_LOGGED_IN`, `EXTRACT`)
  - `removeEventListener(eventName, callback)`

#### **Open Method Example:**
```js
window.SIVI.open(
  {
    medium: 'custom',
    mediumType: 'custom',
    width: 800,
    height: 600,
    objective: 'promote-product'
  },
  'sivi-container' // Container ID where the iframe will load
);
```

### ✅ **Testing the Integration**

1. Open the **UI in the browser** (`http://localhost:5173`).  
2. Trigger the **SIVI UI SDK login**.  
3. Test design generation and token usage.  

---
This setup lets you **experiment with SIVI's UI SDK** in a real environment. 🚀  

For support, contact the SIVI team. Happy coding! 😊

