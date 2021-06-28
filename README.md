# plexus-create

# Overview

Plexus Create is a application designed to connect content creators of all backgrounds together in one central network. Creators can sign up and create a profile with their contact information and their social media information start campaigns to crowdfund and gather support for their projects or ideas. Users may also list their skills and proficiencies on their profile to fulfill open positions needed on current projects...

# Built in devtools

## GraphQL Server

The apollo-server-express middleware is used to create the GraphQL endpoint used in the backend of the application.
While in development mode the GraphQL Playground GUI is accessible:

To start the server run:
`yarn start:dev`

To access GraphQL Playground GUI and schema visit http://localhost:8080/graphql in your browser.

Access the Docs and Schema tabs on the GraphQL Playground GUI for more information on the Resolvers and Queries used in the application.

# Configuration

## The Environment Variable

### Next Auth Database Connection, Oauth Credentials

To use Next Auth you will need to add your databse url into the env.local along with your oauth credentials and a randomly generated secret (the longer the better).

See `env.example` to see the layout.

> Alternatively you can comment out the database option in `/src/pages/api[...nextauth].ts` to save sessions and users in memory. This isn't recommended, however, as the rest of the app relies on tables created by Next Auth.

## The Directory

### Front End

- all front end files can be found in '/src' directory
- entry point is 'src/pages/\_app.tsx'
- Next.js creates routes based on file structure and file names.
  > **Docs here: https://nextjs.org/docs**
- All pages (or views) that will have their own route reside in the 'pages' directory and their url paths reflect the file path to the file, starting from the 'pages' directory
  - Next.js looks for an index file as the point of entry under each sub directory
    - example:
      file path: 'root/src/pages/profile/index.tsx'
      url path: '/profile/'

### Components

- Components that do not require their own url path are located under 'src/components' and
  divided into sub directories based on which page will be rendering them
- State is being managed using context hooks, the contexts and their providers are in 'src/context'
- The models directory contains interfaces to represent common objects we'll be using, and can be imported as needed

# Requirements

1.  PostgresSQL
2.  Yarn

# How to start the app

1. Start your posgres server and create the plex-us database in postgres
2. `Yarn install` the dependencies
3. `Yarn build` will build the app using Next's webpack
4. `Yarn Start` will start the backend of the application
   > Next defaults to port 3000. The app should be accessible on http://localhost:3000
