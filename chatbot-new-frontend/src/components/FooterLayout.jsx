import React from 'react'
import Link from 'next/link'

function FooterLayout() {
  return (
    <footer className="py-10 pt-16 bg-red-50 sm:pt-20 text-center text-[#242124] px-6">
    <p className="text-lg sm:text-xl font-semibold">CultureVo</p>
    <p className="text-sm sm:text-base mt-2">
      Your AI companion who understands you culturally and emotionally.
    </p>  {/* Footer tagline */}
    <hr className="w-3/4 border-t-2 border-gray-300 mx-auto my-4" />
    <Link href="/privacy-policy" className="underline">Privacy Policy</Link> &nbsp;&nbsp;&nbsp;&nbsp;
    <Link href="/terms-and-conditions" className="underline">Terms and Conditions</Link> {/* Link to terms and conditions page */}
    <p className="text-xs sm:text-sm">
      ©2024 CultureVo AI. All rights reserved. {/* Copyright notice */}
    </p>
  </footer>
  )
}

export default FooterLayout