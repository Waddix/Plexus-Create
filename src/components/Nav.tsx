import { Fragment } from 'react';
import Link from 'next/link';

function NavBar() {
  return (
    <Fragment>
      <Link href='/projects'>Projects</Link>
      <Link href='/'>Home</Link>
      <Link href='/profile'>Profile</Link>
    </Fragment>
  )
}

export default NavBar;