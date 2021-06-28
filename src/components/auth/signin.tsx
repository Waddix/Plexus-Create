// import React from 'React'
// import { providers, signIn, getSession } from 'next-auth'

// export default function SingIn({providers}) {
//   return (

//   )
// }

// SignIn.getInitialProps = async(context) => {
//   const {req, res} = context;
//   const session = await (getSession({req}));

//   if (session && res && session.accessToken) {
//     res.writeHead(302, {
//       Location: '/profile',
//     });
//     res.end();
//     return;
//   }

//   return {
//     session: undefined,
//     providers: await providers(context)
//   }
// }

export { }