const express = require("express");
const { header } = require("express/lib/request");
const PORT = process.env.PORT || 3001;
const path = require("path");
const app = express();

// This helps the serve static files from NodeJS
app.use(express.static(path.resolve(__dirname, "../client/build")))

app.get("/api", (req, res) => {
    res.json({ message: "Server is connected!" });
})

// Redirect bogus endpoints to Invoice React app 
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../cliend/build", "index.html"));
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
})