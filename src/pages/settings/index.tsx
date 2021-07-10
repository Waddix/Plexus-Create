/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Fragment } from "react"
import { useRouter } from "next/router"

const Settings = (): JSX.Element => {
  const router = useRouter();

  // Redirects user to the profile page when trying to access the base settings page.

  useEffect(() => {
    router.push('/settings/profile')
  }, [])

  return (
    <Fragment>
    </Fragment>
  )
}

export default Settings