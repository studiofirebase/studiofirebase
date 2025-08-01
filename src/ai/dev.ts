import { config } from 'dotenv';
config();

import '@/ai/flows/content-recommendations.ts';
import '@/ai/flows/twitter-feed-flow.ts';
import '@/ai/flows/paypal-flow.ts';
import '@/ai/flows/mercadopago-pix-flow.ts';
import '@/ai/flows/user-auth-flow.ts';
import '@/ai/flows/facebook-products-flow.ts';
import '@/ai/flows/instagram-feed-flow.ts';
import '@/ai/flows/instagram-shop-flow.ts';
import '@/ai/flows/admin-config-flow.ts';
import '@/ai/flows/upload-flow.ts';
