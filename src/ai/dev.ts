import { config } from 'dotenv';
config();

import '@/ai/flows/content-recommendations.ts';
import '@/ai/flows/twitter-feed-flow.ts';
import '@/ai/flows/paypal-flow.ts';
import '@/ai/flows/mercadopago-pix-flow.ts';
import '@/ai/flows/user-auth-flow.ts';
