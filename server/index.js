require("dotenv").config();
const express = require("express");
const { header } = require("express/lib/request");
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require("path");
const mongoose = require("mongoose");
const app = express();

// Connecting Database
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => console.log("MongoDB Connection Established"));

// Defining MongoDB Schema
const invoiceSchema = new mongoose.Schema({
    invoiceDate: String,
    unitPrice: Number,
    quantity: Number,
    totalAmount: Number,
    status: String
})

const InvoiceData = new mongoose.model("InvoiceData", invoiceSchema);

app.use(cors());
// Parses Body in Request Header
app.use(bodyParser.json());
// This helps the serve static files from NodeJS
app.use(express.static(path.resolve(__dirname, "../client/build")))

// Test if server is connected 
app.get("/api", (req, res) => {
    res.json({ message: "Server is connected!" });
})

// Get All records from MongoDB
app.get("/api/data", (req, res) => {
    InvoiceData.find({}, (err, result) => {
        if (!err) {
            res.send({ records: result });
        } else {
            console.log(err);
        }
    })
})

// Create Invoice
app.post("/api/send", (req, res) => {
    console.log(`Processing Invoice`);
    // Creating and Saving Invoice
    const newInvoice = new InvoiceData(req.body.formData);
    newInvoice
        .save()
        .then(() => {
            const msg = `Invoice with ID : ${newInvoice._id} created!`;
            console.log(`${msg}\n`)
            res.json({newInvoice: newInvoice, message: msg});
        })
        .catch((err) => console.log(err));
})

// Delete Invoice
app.get("/api/delete/:invoiceId", (req, res) => {
    const invoiceId = req.params.invoiceId;
    InvoiceData.deleteOne({ _id: invoiceId })
        .then(() => {
            const msg = `Invoice ID : ${invoiceId} deletion successful`;
            console.log(msg + "\n");
            res.json({message: msg, deleted: true});
        })
        .catch((err) => console.log(err));
})

// Redirect bogus endpoints to Invoice React app 
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
})