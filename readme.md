# Author Royalty API

## Overview

This project is a REST API for a simplified author royalty system. It calculates author earnings based on book sales, tracks current balances, and allows authors to request withdrawals with proper validation rules.

---

## Tech Stack

**Node.js with Express**

I used Node.js with Express because it is lightweight, easy to structure for REST APIs, and allows clear implementation of business logic with minimal setup.

**In-Memory Storage**

The assignment allowed in-memory storage or SQLite. I chose in-memory arrays to keep the implementation simple and focused on correctness of calculations and validations.

---

## Features Implemented

- Calculation of total earnings from book sales
- Real-time calculation of current balance
- Detailed author view with book-level royalty breakdown
- Sales history sorted by newest first
- Withdrawal request handling with strict validation rules
- Proper HTTP status codes and structured error responses
- CORS enabled to allow cross-origin access for testing
- Deployed using Render (free tier)

---

## Validation Rules Enforced

- Minimum withdrawal amount is ₹500
- Withdrawal amount cannot exceed current balance
- Author must exist before processing any request
- Correct HTTP status codes are returned (200, 201, 400, 404)

---

## Assumptions

- Data is stored in memory and resets when the server restarts
- All withdrawals remain in "pending" status
- No authentication was required as per assignment scope
- No update or delete functionality for withdrawals was required

---

## Time Spent

Approximately 1–2 hours including development, testing with Postman, and deployment.

---

## Deployed API

https://author-royalty-api-7jf0.onrender.com