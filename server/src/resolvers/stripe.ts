import Stripe from 'stripe';
import {
  Resolver, Mutation,
} from 'type-graphql';
import { stripe } from '../constants/stripe';

@Resolver()
// eslint-disable-next-line import/prefer-default-export
export class StripeResolver {
  // ** BASIC CRUD OPERATIONS ** \\

  // @Mutation(() => Post, { nullable: true })
  // async updatePost(
  //   @Arg('id', () => Int) id: number,
  //   @Arg('text', () => String, { nullable: true }) text: string,
  //   @Arg('type', () => String) type: string,
  // ): Promise<Post | null> {
  //   const post = await Post.findOne(id);
  //   if (!post) {
  //     return null;
  //   }
  //   // if the text isnt blank
  //   if (typeof text !== 'undefined' && typeof type !== 'undefined') {
  //     Post.update({ id }, { text, type })
  //   }
  //   return post;
  // }

  @Mutation(() => String)
  async createStripeAccount(
    // @Arg('id', () => Int) id: number,
  ): Promise<Stripe.Response<Stripe.Account>| string> {
    const params: Stripe.AccountCreateParams = {
      type: 'standard',
      capabilities: {
        card_payments: {requested: false},
        transfers: {requested: false},
      }
    };
    const account = await stripe.accounts.create(params);
   
    return account.id;
  }
}
