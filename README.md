# plexus-create

# Front End is built using Next.js with React and typescript
  - all front end files can be found in '/src' directory 
  - entry point is 'src/pages/_app.tsx'
  - Next.js creates routes based on file structure and file names. 
  *** Docs here: https://nextjs.org/docs ***
  - All pages (or views) that will have their own route reside in the 'pages' directory and
      their url paths reflect the file path to the file, starting from the 'pages' directory
    - Next.js looks for an index file as the point of entry under each sub directory
      - example:
        file path: 'root/src/pages/profile/index.tsx'
        url path: '/profile/'
  - Components that do not require their own url path are located under 'src/components' and
      divided into sub directories based on which page will be rendering them
  - State is being managed using context hooks, the contexts and their providers are in 'src/context'
  - The models directory contains interfaces to represent common objects we'll be using,  and can be imported as needed

  -- You can start the front end server simply by running 'yarn dev', or 'npm run dev' from the terminal --
    - next.js defaults to port 3000. Sor run the above command and go to localhost:3000 to view the app
    - next.js also comes with the following commands that can found in package.json
        - 'yarn build'
        - 'yarn next:start'
