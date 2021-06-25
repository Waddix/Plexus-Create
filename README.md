# Plexus Create

## Overview
Plexus Create is a application designed to connect content creators of all backgrounds together in one central network. Creators can sign up and create a profile with their contact information and their social media information start campaigns to crowdfund and gather support for their projects or ideas. Users may also list their skills and proficiencies on their profile to fulfill open positions needed on current projects...

# Built in devtools
## GraphQL Server
To start the server run:
yarn start:dev

To access GraphQL Playground GUI and schema visit http://localhost:8080/graphql in your browser.

Access the Docs and Schema tabs on the GraphQL Playground GUI for more information on the Resolvers and Queries used in the application.

# Configuration

## The Environment Variable
### Next Auth Database Connection, Oauth Credentials
To use Next Auth you will need to add your databse url into the env.local along with your oauth credentials and a randomly generated secret (the longer the better).

See `env.local.example` to see the layout.

>Alternatively you can comment out the database option in `/src/pages/api[...nextauth].ts` to save sessions and users in memory. This isn't recommended, however, as the rest of the app relies on tables created by Next Auth.