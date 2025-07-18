const express = require("express");

const app = express();

app.use(express.json());

let consecutiveWithdraws = 0
let consecutiveDeposits = 0
let amountMemory = 0

app.post('/event', (req, res) => {
    const { type, amount, user_id, t } = req.body;
    const amountNumber = Number(amount)
    const alerts_codes = []

    if(type === 'deposit' && amountMemory < amountNumber){
        amountMemory = amountNumber
        consecutiveDeposits += 1
    }else{
        consecutiveDeposits = 0
    }

    if(type === 'withdraw'){
        consecutiveWithdraws += 1
    }else{
        consecutiveWithdraws = 0
    }

    if(type === 'withdraw' && amountNumber > 100){
        alerts_codes.push(1100)
    }
    if(consecutiveWithdraws >= 3 && type === 'withdraw'){
        alerts_codes.push(30)
    }
    
    if(consecutiveDeposits === 3){
        alerts_codes.push(300)
    }
    
    if(amountNumber < 200 && type === 'deposit' && t < 30){
        alerts_codes.push(123)
    }
        
    const response = {
        alert: alerts_codes.length > 0,
        alerts_codes,
        user_id,
    };

    res.json(response);
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
