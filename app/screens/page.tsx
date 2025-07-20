import React from 'react'
import SavedScreens from '@/components/common/Screens/SavedScreens'
import DaisyNavbar from '@/components/common/Navbar/DaisyNavbar'

const page = () => {
  return (
    <div>
        <DaisyNavbar/>
        <div className="bg-base-200 rounded-xl shadow-inner">
            <SavedScreens />
        </div>
    </div>
  )
}

export default page
