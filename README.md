# Transaction Alert System

A simple transaction alert system that monitors transactions and triggers alerts based on specific patterns.

## Setup

1. Install dependencies:
```bash
npm install express
```

2. Start the server:
```bash
node index.js
```

The server will start on http://localhost:3000

## API Endpoints

### POST /event

Sends a transaction event to the system.

#### Request Body
```json
{
    "type": "withdraw/deposit",
    "amount": "100.00",
    "user_id": 1,
    "t": 1  // Optional: transaction counter
}
```

#### Response
```json
{
    "alert": true/false,
    "alerts_codes": [array of alert codes],
    "user_id": [user_id]
}
```

## Alert Codes

- 1100: Withdraw amount over 100
- 30: 3 consecutive withdraws
- 300: 3 consecutive increasing deposits
- 123: Accumulative deposit amount over 200 in 30 seconds

## Example Usage

```bash
# Withdraw over 100
curl -X POST http://localhost:3000/event \
  -H "Content-Type: application/json" \
  -d '{"type": "withdraw", "amount": "150.00", "user_id": 1}'

# Deposit within 30 seconds window
# Send multiple deposits within 30 seconds to trigger alert 123
curl -X POST http://localhost:3000/event \
  -H "Content-Type: application/json" \
  -d '{"type": "deposit", "amount": "100.00", "user_id": 1}'
```
