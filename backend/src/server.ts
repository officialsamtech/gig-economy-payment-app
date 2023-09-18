import 'dotenv/config';
import App from './app';

// Import your controllers
import { IndexController } from '@/controllers/index';
import { BeneficiaryController } from '@/controllers/beneficiaries';
import { PayoutController } from '@/controllers/payouts';
import { WebhookEventController } from '@/controllers/webhook';

import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([
    IndexController,
    BeneficiaryController,
    PayoutController,
    WebhookEventController
]);

app.listen();

const PORT = process.env.PORT || 5000;
console.log(`Server is running on port ${PORT}`);
