import React from 'react'
import Header from './header'
import Sidebar from './sidebar'
function layout({children}) {
    return (
        <div id="layout-wrapper">
            <Header/>
            <Sidebar/>
            {children}
        </div>
    )
}

export default layout