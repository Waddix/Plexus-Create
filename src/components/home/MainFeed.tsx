import { ReactElement, useContext } from 'react'
import { ProductCtx } from "../../context/projectsContext"

function MainFeed(): React.ReactElement {
  const { projects } = useContext(ProductCtx);
  return (
   
  )
}

export default MainFeed;