# Rapyd Gig Economy Payment App

## Description

This project serves as a backend API for a gig economy payment application. It leverages the Rapyd Disburse API to handle various payment-related functionalities such as creating beneficiaries, initiating payouts, and more. The API is designed to be robust, secure, and easily extendable.

## Table of Contents

- [Rapyd Gig Economy Payment App](#rapyd-gig-economy-payment-app)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Webhooks](#webhooks)
  - [Contributing](#contributing)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/yourrepository.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file and populate it with the necessary environment variables (see `.env.example` for reference).

4. Run the application:
    ```bash
    npm run dev
    ```

## Usage

To interact with the API, you can use tools like Postman or CURL. The API is hosted at `http://localhost:5000/api`.

## API Endpoints

- **Create Beneficiary**: `POST /api/beneficiaries`
- **Get Beneficiary**: `GET /api/beneficiaries/:id`
- **Create Payout**: `POST /api/payouts`
- **Get Payout**: `GET /api/payouts/:id`
- **Complete Payout**: `POST /api/payouts/complete/:id/:amount`



## Webhooks

The application uses webhooks to receive real-time updates from the Rapyd platform. To set up webhooks, follow the instructions in the [Rapyd documentation](https://docs.rapyd.net).


## Contributing

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

