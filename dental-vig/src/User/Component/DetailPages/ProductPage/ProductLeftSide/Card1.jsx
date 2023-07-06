import React from 'react';
const Card1 = ({price,negotiable_price}) => {
    return (
        <>
            <div className="common-card price">
                <h3>₹ {new Intl.NumberFormat('en-IN').format(price)}<span>{negotiable_price == 1? "Negotiable" : "Fixed"}</span></h3><i className="fas fa-tag" />
            </div>
        </>
    )
}

export default React.memo(Card1) 