import Stripe from 'stripe';
import {
  Resolver, Mutation, Arg,
} from 'type-graphql';
import { stripe } from '../constants/stripe';

@Resolver()

export class StripeResolver {

  @Mutation(() => String)
  async createStripeLink(@Arg('stripeId', () => String) stripeId: string): Promise<Stripe.Response<Stripe.AccountLink> | string>{
    const params: Stripe.AccountLinkCreateParams = {
      account: stripeId,
      refresh_url: 'http://localhost:3000/api/auth/signin',
      return_url: 'http://localhost:3000/projects/1',
      type: 'account_onboarding',
    };
    const link = await stripe.accountLinks.create(params);
    console.log(link);
    return link.url;
  }

  @Mutation(() => String)
  async createStripeAccount(
    // @Arg('id', () => Int) id: number,
  ): Promise<Stripe.Response<Stripe.Account>| string> {
    const params: Stripe.AccountCreateParams = {
      type: 'standard',
    };
    const account = await stripe.accounts.create(params);
   
    return account.id;
  }
}
