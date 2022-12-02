import React, { useState } from "react"
import { useRouter } from "next/router"

const Header = () => {
  const router = useRouter()
  const urlpath = router.pathname
  return <div>
    Navbar
  </div>
}

export default Header
