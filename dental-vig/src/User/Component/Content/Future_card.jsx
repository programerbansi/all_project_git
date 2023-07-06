import React from 'react'
import Slider from "react-slick";

const Future_card = ({ image }) => {
    return (
        <>
            <div className="feature-card"><a href="#" className="feature-img">
                {image}
            </a>
                <div className="cross-inline-badge feature-badge"><span>featured</span><i className="fas fa-book-open" /></div><button type="button" className="feature-wish"><i className="fas fa-heart" /></button>
                <div className="feature-content">
                    <ol className="breadcrumb feature-category">
                        <li><span className="flat-badge rent">rent</span></li>
                        <li className="breadcrumb-item"><a href="#">automobile</a></li>
                        <li className="breadcrumb-item active" aria-current="page">private car</li>
                    </ol>
                    <h3 className="feature-title"><a href="ad-details-left.html">Unde eveniet ducimus nostrum
                        maiores soluta temporibus ipsum dolor sit amet.</a></h3>
                    <div className="feature-meta"><span className="feature-price">$1200<small>/Monthly</small></span><span className="feature-time"><i className="fas fa-clock" />56 minute ago</span></div>
                </div>
            </div>

        </>
    )
}

export default Future_card