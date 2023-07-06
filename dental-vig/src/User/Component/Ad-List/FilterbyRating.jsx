import React from 'react'
import Button from '../InputFunction/Button';
import CheckBoxField from '../InputFunction/CheckBoxField'
const FilterbyRating = ({ filterState }) => {
    let props = filterState;
    const handleSubmit = () => {
        props.setFilterRatings([]);
        var items = document.getElementsByName('rating');
        for (var i = 0; i < items.length; i++) {
            if (items[i].type == 'checkbox')
                items[i].checked = false;
        }
    }

    const handleClick = (item, e) => {
        const checked = e.target.checked;
        if (checked) {
            props.setFilterRatings([...props?.filterRatings,item])
        }
        else {
            props.setFilterRatings(props.filterRatings.filter((rating) => { return rating !== item }))
        }
    }
    const handleCheckbox = (item, index) => {
        var items = document.getElementsByName('rating');
        for (var i = 0; i < items.length; i++) {
            if (items[i].type == 'checkbox' && i == index) {
                if (!items[i].checked) {
                    items[i].checked = true;
                    props.setFilterRatings([...props?.filterRatings,item])
                }
                else {
                    items[i].checked = false;
                    props.setFilterRatings(props.filterRatings.filter((rating) => { return rating !== item }))
                }
            }
        }
    }
    return (
        <>
            <div className="col-md-6 col-lg-12">
                <div className="product-widget">
                    <h6 className="product-widget-title">Filter by rating</h6>
                    <form className="product-widget-form">
                        <ul className="product-widget-list">
                            {
                                Array.from({ length: 5 }, (_, i) => i + 1).map((num, index) => <li key={index} className="product-widget-item">
                                    <CheckBoxField event={(e) => handleClick(num, e)} name={'rating'} id={'rating'} />
                                    <label className="product-widget-label" htmlFor="chcek4" onClick={() => handleCheckbox(num, index)}>
                                        <span className="product-widget-star">
                                            {
                                                Array.from({ length: 5 }, (_, i) => i + 1).map((star,i) => <i key={i} className={`${(num && star) <= index + 1 ? 'fas fa-star' : 'far fa-star'}`} />)
                                            }
                                        </span>                                    
                                    </label>
                                </li>)
                            }
                        </ul>
                        <Button type="button" userEvent={'button'} event={handleSubmit} className="product-widget-btn" icon="fas fa-broom" name="Clear Filter" />                   
                    </form>
                </div>
            </div>
        </>
    )
}

export default React.memo(FilterbyRating)