import React, { useEffect, Fragment } from "react"
import { useRouter } from "next/router"

const Settings = () => {
  const router = useRouter();

  // Redirects user to the profile page when trying to access the base settings page.

  useEffect((): JSX.Element => {
    router.push('/settings/profile')
  }, [])

  return(
    <Fragment>
    </Fragment>
  )
}

export default Settings