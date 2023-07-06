import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const SkeltonLoaderList2 = () => {
    return (
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-3">
            <div className="w-100 h-100" style={{ border: '1px solid #e8e8e8', borderRadius: '8px', padding: '10px' }}>
                < div className="img" >
                <Skeleton height={110} width='100%' />
                </div>
                <Skeleton count={1} />
                <hr />
                <Skeleton count={2} />
                <hr />
                <Skeleton count={1} />
            </div>
        </div >
    )
}

export const SkeltonLoaderList3 = () => {
    return (
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-3" >
            <div className="w-100 h-100" style={{ border: '1px solid #e8e8e8', borderRadius: '8px', padding: '10px' }}>
                < div className="img" >
                    <Skeleton height={110} width='100%' />
                </div>
                <Skeleton count={1} />
                <hr />
                <Skeleton count={2} />
                <hr />
                <Skeleton count={1} />
            </div>
        </div >
    )
}

export const SkeltonLoaderList1 = () => {
    return (
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-3" >
            <div className="row" style={{ border: '1px solid #e8e8e8', borderRadius: '8px', padding: '10px' }}>
                <div className="col-4 img">
                    <Skeleton height="90%" width='100%' />
                </div>
                <div className="col-8">
                    <Skeleton count={1} />
                    <hr />
                    <Skeleton count={2} />
                    <hr />
                    <Skeleton count={1} />
                </div>
            </div>
        </div >
    )
}

export const SimpleLoader = (open) => {
    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
    >
        <CircularProgress color="inherit" />
    </Backdrop>
}
