
import Stripe from "stripe";
import dotenv from 'dotenv'
dotenv.config()

declare let process : {
  env: {
    STRIPE_SECRET: string
  }
}

export const stripe = new Stripe("sk_test_f4tt8qBUFUPjT2FMDSzsESoL00HR7MO6rc", {
  apiVersion: '2020-08-27',
  typescript: true
});
