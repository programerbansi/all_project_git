import React from 'react'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'
import AdminContent from './AdminContent'
import AdminFooter from './AdminFooter'
import AdminStater from './AdminStater'

const AdminHome = () => {
    return (
        <>
            <div className="wrapper">
                <AdminHeader />
                <AdminSidebar />
                <div className="content-wrapper" >
                    <AdminStater />
                    <AdminContent />                   
                </div>
                <AdminFooter />
                <aside className="control-sidebar control-sidebar-dark">
                </aside>
            </div>

        </>
    )
}

export default AdminHome