import React from 'react'
import LeftAds from '../Advertisement/LeftAds'
import RightAds from '../Advertisement/RightAds'
import AddPostTabs from './AddPostTabs'

const Dashboard = ({left_ads,right_ads}) => {
    return (
        <div style={{backgroundColor:"#f0f0f0"}}>
            <AddPostTabs />
            <section className="dashboard-part pt-5">
                <div className='container-fluid'>

                    <div className='row'>

                        <div className='col'>
                            <LeftAds left_ads={left_ads} />
                        </div>
                        {/* <div className='col-8'> */}
                        <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="account-card alert fade show">
                                <div className="account-title">
                                    <h3>Newsletter</h3><button data-dismiss="alert">close</button>
                                </div>
                                <div className="dash-content">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore enim illum quos sed
                                        dolore iusto necessitatibus ut voluptatibus repellat Eaque molestiae cum laborum nobis
                                        quidem vel modi ab quam ipsum eligendi excepturi reiciendis aspernatur veniam ex.
                                        Debitis excepturi atque. Ducimus dignissimos. Illo ut dolorem in vel blanditiis facere
                                        aliquid ipsum.</p>
                                </div>
                            </div>
                            <div className="account-card alert fade show">
                                <div className="account-title">
                                    <h3>Reviews</h3><button data-dismiss="alert">close</button>
                                </div>
                                <div className="dash-review-widget">
                                    <h4>(4) Unread Review</h4><select className="custom-select">
                                        <option selected>Unread Review</option>
                                        <option value={1}>All Review</option>
                                        <option value={2}>5 Star Review</option>
                                        <option value={3}>4 Star Review</option>
                                        <option value={3}>3 Star Review</option>
                                        <option value={3}>2 Star Review</option>
                                        <option value={3}>1 Star Review</option>
                                    </select>
                                </div>
                                <ul className="review-list">
                                    <li className="review-item">
                                        <div className="review-user">
                                            <div className="review-head">
                                                <div className="review-profile"><a href="#" className="review-avatar"><img src="images/avatar/03.jpg" alt="review" /></a>
                                                    <div className="review-meta">
                                                        <h6><a href="#">miron mahmud -</a><span>June 02, 2020</span></h6>
                                                        <ul>
                                                            <li><i className="fas fa-star active" /></li>
                                                            <li><i className="fas fa-star active" /></li>
                                                            <li><i className="fas fa-star active" /></li>
                                                            <li><i className="fas fa-star active" /></li>
                                                            <li><i className="fas fa-star active" /></li>
                                                            <li>
                                                                <h5>- for delivery system</h5>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="review-widget"><button className="review-dots-btn"><i className="fas fa-ellipsis-v" /></button>
                                                    <ul className="review-widget-list">
                                                        <li><a href="#"><i className="fas fa-trash-alt" />Delete</a></li>
                                                        <li><a href="#"><i className="fas fa-flag" />Report</a></li>
                                                        <li><a href="#"><i className="fas fa-shield-alt" />Block</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <p className="review-desc">Lorem ipsum, dolor sit amet consectetur adipisicing elit Non
                                                quibusdam harum ipsum dolor cumque quas magni voluptatibus cupiditate minima
                                                quis.</p>
                                        </div>
                                    </li>
                                    <li className="review-item">
                                        <div className="review-user">
                                            <div className="review-head">
                                                <div className="review-profile"><a href="#" className="review-avatar"><img src="images/avatar/02.jpg" alt="review" /></a>
                                                    <div className="review-meta">
                                                        <h6><a href="#">labonno khan -</a><span>June 02, 2020</span></h6>
                                                        <ul>
                                                            <li><i className="fas fa-star active" /></li>
                                                            <li><i className="fas fa-star active" /></li>
                                                            <li><i className="fas fa-star active" /></li>
                                                            <li><i className="fas fa-star active" /></li>
                                                            <li><i className="fas fa-star" /></li>
                                                            <li>
                                                                <h5>- for product quality</h5>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="review-widget"><button className="review-dots-btn"><i className="fas fa-ellipsis-v" /></button>
                                                    <ul className="review-widget-list">
                                                        <li><a href="#"><i className="fas fa-trash-alt" />Delete</a></li>
                                                        <li><a href="#"><i className="fas fa-flag" />Report</a></li>
                                                        <li><a href="#"><i className="fas fa-shield-alt" />Block</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <p className="review-desc">Lorem ipsum, dolor sit amet consectetur adipisicing elit Non
                                                quibusdam harum ipsum dolor cumque quas magni voluptatibus cupiditate minima
                                                quis.</p>
                                        </div>
                                        <div className="review-author">
                                            <div className="review-head">
                                                <div className="review-profile"><a href="#" className="review-avatar"><img src="images/avatar/04.jpg" alt="review" /></a>
                                                    <div className="review-meta">
                                                        <h6><a href="#">Miron Mahmud</a></h6>
                                                        <h6>Author - <span>June 02, 2020</span></h6>
                                                    </div>
                                                </div>
                                                <div className="review-widget"><button className="review-dots-btn"><i className="fas fa-ellipsis-v" /></button>
                                                    <ul className="review-widget-list">
                                                        <li><a href="#"><i className="fas fa-edit" />Edit</a></li>
                                                        <li><a href="#"><i className="fas fa-trash-alt" />Delete</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <p className="review-desc">Lorem ipsum, dolor sit amet consectetur adipisicing elit Non
                                                quibusdam harum ipsum dolor cumque quas magni voluptatibus cupiditate minima.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                                <ul className="pagination">
                                    <li className="page-item"><a className="page-link" href="#"><i className="fas fa-long-arrow-alt-left" /></a></li>
                                    <li className="page-item"><a className="page-link active" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">...</li>
                                    <li className="page-item"><a className="page-link" href="#">67</a></li>
                                    <li className="page-item"><a className="page-link" href="#"><i className="fas fa-long-arrow-alt-right" /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="account-card alert fade show">
                                <div className="account-title">
                                    <h3>Membership</h3><button data-dismiss="alert">close</button>
                                </div>
                                <ul className="account-card-list">
                                    <li>
                                        <h5>Status</h5>
                                        <p>Premium</p>
                                    </li>
                                    <li>
                                        <h5>Joined</h5>
                                        <p>February 02, 2021</p>
                                    </li>
                                    <li>
                                        <h5>Spand</h5>
                                        <p>4,587</p>
                                    </li>
                                    <li>
                                        <h5>Earn</h5>
                                        <p>97,325</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="account-card alert fade show">
                                <div className="account-title">
                                    <h3>Current Info</h3><button data-dismiss="alert">close</button>
                                </div>
                                <ul className="account-card-list">
                                    <li>
                                        <h5>Active Ads</h5>
                                        <h6>3</h6>
                                    </li>
                                    <li>
                                        <h5>Booking Ads</h5>
                                        <h6>0</h6>
                                    </li>
                                    <li>
                                        <h5>Rental Ads</h5>
                                        <h6>1</h6>
                                    </li>
                                    <li>
                                        <h5>Sales Ads</h5>
                                        <h6>2</h6>
                                    </li>
                                </ul>
                            </div>
                            <div className="account-card alert fade show">
                                <div className="account-title">
                                    <h3>Fun fact</h3><button data-dismiss="alert">close</button>
                                </div>
                                <div className="account-card-content">
                                    <p>Your last ad running was 3 days ago and only have 5 hours left until your last ad
                                        expires.</p>
                                </div>
                            </div>
                            <div className="account-card alert fade show">
                                <div className="account-title">
                                    <h3>Resources</h3><button data-dismiss="alert">close</button>
                                </div>
                                <ul className="account-card-link">
                                    <li><a href="#"><i className="fas fa-dot-circle" /><span>Asset Use Guidelines</span></a></li>
                                    <li><a href="#"><i className="fas fa-dot-circle" /><span>Authoring Tutorial</span></a></li>
                                    <li><a href="#"><i className="fas fa-dot-circle" /><span>Knowledgebase</span></a></li>
                                    <li><a href="#"><i className="fas fa-dot-circle" /><span>Watermarks</span></a></li>
                                    <li><a href="#"><i className="fas fa-dot-circle" /><span>Selling Tips</span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
                        </div>
                        <div className='col'>
                            <RightAds right_ads={right_ads} />
                        </div>

                    </div>
                </div>
              
            </section>
        </div>
    )
}

export default Dashboard
