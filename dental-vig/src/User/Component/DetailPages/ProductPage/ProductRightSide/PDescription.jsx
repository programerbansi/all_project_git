import React from 'react'

function PDescription({description}) {

    return (
        <>
            <div className="common-card">
                <div className="card-header">
                    <h5 className="card-title">description</h5>
                </div>
                <p className="ad-details-desc">{description}</p>
            </div>
        </>
    )
}

export default React.memo(PDescription)