import { Project } from '../db/entities/Project';
import {Stripe} from 'stripe';
import {
  Resolver, Mutation, Arg, Int, Query
} from 'type-graphql';
import { stripe } from '../constants/stripe';



@Resolver()

export class StripeResolver {

  @Query(() => String)
  async createCheckoutSession(
    @Arg('amount', () => Int) amount : number,
    @Arg('id', () => Int) id: number
    ): Promise< null| string>{
    const project = await Project.findOne(id);
    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: 'donate',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      line_items: [
        {
          name: `Thanks for supporting ${project?.title}`,
          amount: amount * 100,
          currency: "usd",
          quantity: 1,
        }
      ],
      success_url: `http://localhost:3000/projects/${id}`,
      cancel_url: `http://localhost:3000/`,
    }
    const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
      params
    )
    return checkoutSession.url;
  }

  @Mutation(() => String)
  async createPaymentIntent(
  @Arg('stripeId', () => String)stripeId: string
  ): Promise<Stripe.Response<Stripe.PaymentIntent> | string>{
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
  async createStripeLink(
    @Arg('stripeId', () => String) stripeId: string
    ): Promise<Stripe.Response<Stripe.AccountLink> | string>{
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
