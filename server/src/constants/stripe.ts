
import Stripe from "stripe";
import dotenv from 'dotenv'
dotenv.config()

declare let process : {
  env: {
    STRIPE_SECRET: string
  }
}

export const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: '2020-08-27',
  typescript: true
});
