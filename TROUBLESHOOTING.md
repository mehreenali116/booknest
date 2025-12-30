# Troubleshooting Guide

## Browser Not Loading

### Step 1: Start the Development Server
```bash
npm run dev
```

You should see output like:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 2: Open Browser
- Copy the URL from the terminal (usually `http://localhost:5173`)
- Paste it in your browser
- If it doesn't load, check the browser console (F12) for errors

### Step 3: Common Issues

**Issue: Port already in use**
- Solution: Kill the process using port 5173 or use a different port:
  ```bash
  npm run dev -- --port 3000
  ```

**Issue: White/blank screen**
- Open browser DevTools (F12)
- Check Console tab for JavaScript errors
- Check Network tab to see if files are loading

**Issue: "Cannot find module" errors**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run: `npm install`
- Run: `npm run dev`

**Issue: localStorage errors**
- Open browser DevTools (F12)
- Go to Application tab > Local Storage
- Clear all localStorage data
- Refresh the page

### Step 4: Verify Installation
Make sure all dependencies are installed:
```bash
npm install
```

### Step 5: Check for Syntax Errors
If you see compilation errors in the terminal, fix them before the app will load.

