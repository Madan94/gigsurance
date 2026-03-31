"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_js_1 = __importDefault(require("./app.js"));
const port = Number(process.env.PORT);
// Create HTTP server using Express app
const server = http_1.default.createServer(app_js_1.default);
// Start listening
server.listen(port, () => {
    console.log(`-> Server is running on port ${port}`);
});
// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${port} is already in use.`);
        console.error(`💡 Try one of the following:`);
        console.error(`   1. Kill the process using port ${port}: lsof -ti:${port} | xargs kill -9`);
        console.error(`   2. Use a different port by setting PORT environment variable`);
        console.error(`   3. Find and stop the other instance of this server`);
        process.exit(1);
    }
    else {
        console.error('❌ Server error:', err);
        process.exit(1);
    }
});
