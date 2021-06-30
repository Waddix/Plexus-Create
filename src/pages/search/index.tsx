import { Input } from "@chakra-ui/react";
import React, { Fragment,useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <Fragment>
      <Input
        type="text"
        placeholder="Connect, Collaborate, Contribute"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && alert('search triggered!')}
      />
    </Fragment>
  )
}