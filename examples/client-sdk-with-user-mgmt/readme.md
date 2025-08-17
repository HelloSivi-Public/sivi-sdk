# SIVI UI SDK Integration Guide

This guide explains how to set up and run the sample **maileditor-server** (backend) and **maileditor-ui** (frontend) for experimenting with the SIVI UI SDK.

## 🚀 Getting Started

### 1️⃣ **Install Dependencies**

Run the following commands inside both `maileditor-server` and `maileditor-ui`:

```sh
# Install dependencies for the server
cd maileditor-server
yarn

# Install dependencies for the UI
cd ../maileditor-ui
yarn
```

---

### 2️⃣ **Update Frontend (`maileditor-ui`)**

- Open `index.html` and update the **SIVI script**:

```html
<script src="https://[enterprise].sivicloud.com/script.js?namespace=SIVI&apiKeyId={apiKey}"></script>
```

Replace:
- `[enterprise]` → Your enterprise domain  
- `{apiKey}` → Your actual API key  

**Start the UI locally**:
```sh
yarn dev
```

---

### 3️⃣ **Update Backend (`maileditor-server`)**

- Inside `maileditor-server`, update the **`.env` file** with your credentials:  

```env
SIVI_API_KEY=<your_sivi_api_key>
```

- Provide a **valid** `abstractUserId` in the `login-sivi` API.

**Start the server**:
```sh
yarn dev
```

---

### 4️⃣ **How SIVI UI SDK Works**

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

#### **Event Handling:**
When `WIDGET_LOGIN` is triggered, the enterprise server must call `sivi-server` with `apiKey` and `abstractUserId` to retrieve the access & refresh tokens.

---

### ✅ **Testing the Integration**

1. Open the **UI in the browser** (`http://localhost:5173`).  
2. Trigger the **SIVI UI SDK login**.  
3. Check if the `WIDGET_LOGIN` event is received.  
4. Ensure the **backend fetches access & refresh tokens** from the SIVI Server.  
5. Test design generation and token usage.  

---

### 🔥 **Expected Behavior**

- The UI should display the SIVI widget.
- When logging in, `WIDGET_LOGIN` should call your server.
- The backend should return valid **access & refresh tokens**.
- Once logged in, `WIDGET_LOGGED_IN` should trigger and store tokens.

This setup lets you **experiment with SIVI's UI SDK and token handling** in a real environment. 🚀  

For support, contact the SIVI team. Happy coding! 😊

