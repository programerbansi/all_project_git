import React from 'react'

const EmptyData = () => {
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className=' d-flex justify-content-center'>
                            <img src="/images/dental-vig-images/My-Ads/no-publications.webp" alt="image" />
                        </div>
                        <h4 className='text-center mb-2 pt-4' style={{ color: 'rgb(161 161 161)' }}>No orders found</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmptyData