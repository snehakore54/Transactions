// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let transactions = [];
let runningBalance = 0;

app.get('/api/transactions', (req, res) => {
    res.json({ transactions, runningBalance });
});

app.post('/api/transactions', (req, res) => {
    const { type, amount, description, date } = req.body;
    const transaction = { type, amount: parseFloat(amount), description, date };
    transactions.push(transaction);
    runningBalance += type === 'Credit' ? parseFloat(amount) : -parseFloat(amount);
    res.status(201).json(transaction);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
/*
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let transactions = [];
let runningBalance = 0;

app.get('/api/transactions', (req, res) => {
    res.json({ transactions, runningBalance });
});

app.post('/api/transactions', (req, res) => {
    const { type, amount, description, date } = req.body;
    const transactionAmount = parseFloat(amount);
    transactions.push({ type, amount: transactionAmount, description, date });
    runningBalance += type === 'Credit' ? transactionAmount : -transactionAmount;
    res.status(201).send();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
*/