const express = require("express");
const { header } = require("express/lib/request");
const PORT = process.env.PORT || 3001;
const path = require("path");
const app = express();

// Sample Data
const sample_data = [
    {
        invoiceId: "0001",
        invoiceDate: "28th May 2022",
        unitPrice: 100,
        quantity: 10,
        totalAmount: 1000,
        status: "Pending"
    },
    {
        invoiceId: "0002",
        invoiceDate: "28th May 2022",
        unitPrice: 50,
        quantity: 10,
        totalAmount: 500,
        status: "Pending"
    },
    {
        invoiceId: "0003",
        invoiceDate: "28th May 2022",
        unitPrice: 10,
        quantity: 99,
        totalAmount: 990,
        status: "Pending"
    }
]

// This helps the serve static files from NodeJS
app.use(express.static(path.resolve(__dirname, "../client/build")))

// Test if server is connected 
app.get("/api", (req, res) => {
    res.json({ message: "Server is connected!" });
})

app.get("/api/data", (req, res) => {
    res.json({
        records: sample_data
    })
})

// Redirect bogus endpoints to Invoice React app 
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
})