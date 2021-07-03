
import Stripe from "stripe";
import dotenv from 'dotenv'
dotenv.config()

declare const process : {
  env: {
    STRIPE_SECRET_KEY: string
  }
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
  typescript: true
});
