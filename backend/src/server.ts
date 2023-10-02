import 'dotenv/config';
import App from '@/app';
import { IndexController } from '@/controllers/index';


import validateEnv from '@/utils/validateEnvs'; // Utility to validate environment variables

// Validate environment variables before starting the app
validateEnv();

const app = new App([
    IndexController
]);

// Start the application
app.listen();

// Additional listening logic from the "current" version
const PORT = process.env.PORT || 5000;
console.log(`Server is running on port ${PORT}`);