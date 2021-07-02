import {Stripe} from 'stripe';
import {
  Resolver, Mutation, Arg,
} from 'type-graphql';
import { stripe } from '../constants/stripe';

@Resolver()

export class StripeResolver {

  @Mutation(() => String)
  async createPaymentIntent(
  @Arg('stripeId', () => String)
   stripeId: string): Promise<Stripe.Response<Stripe.PaymentIntent> | string>{
    const intentParams: Stripe.PaymentIntentCreateParams = {
      payment_method_types: ['card'],
      amount: 1000,
      currency: 'usd',
      application_fee_amount: 123,
    }
    const paymentIntent = await stripe.paymentIntents.create(intentParams, {stripeAccount:stripeId})
    return paymentIntent.id
  }

  @Mutation(() => String)
  async createStripeLink(@Arg('stripeId', () => String) stripeId: string): Promise<Stripe.Response<Stripe.AccountLink> | string>{
    const params: Stripe.AccountLinkCreateParams = {
      account: stripeId,
      refresh_url: 'http://localhost:3000/api/auth/signin', // this has to point to page that calls this function 
      return_url: 'http://localhost:3000/projects', 
      type: 'account_onboarding',
    };
    const link = await stripe.accountLinks.create(params);
    console.log(link);
    return link.url;
  }

  @Mutation(() => String)
  async createStripeAccount(
    // @Arg('profileid', () => Int) id: number,
  ): Promise<Stripe.Response<Stripe.Account>| string> {
    const params: Stripe.AccountCreateParams = {
      type: 'standard',
    };
    const account = await stripe.accounts.create(params);
   
    return account.id;
  }
}
