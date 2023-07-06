import Button from '../InputFunction/Button';
import React, { useContext, useState, useCallback } from 'react';
import { useFormik } from 'formik';
import '../../Css/InputRange.css';
import { UserValAuthContext } from '../Context/UserValContext';
import { debounce } from "lodash";


const FilterbyPrice = () => {
    const contextVal = useContext(UserValAuthContext);
    const [val, setVal] = useState({ min: 10, max: 100000000 });
    const [flag, setFlag] = useState(false);
    const [minPrice, setMinPrice] = useState(10);
    const [maxPrice, setMaxPrice] = useState(100000000);

    const request = debounce(value => {
        setVal({ min: value.min, max: value.max })
        contextVal.setPriceRange([value.min, value.max]);
    }, 500);

    const debouceRequest = useCallback(value => request(value), []);

    const { values, handleSubmit ,resetForm} = useFormik({
        initialValues: { range: val },
        onSubmit: (values, { resetForm }) => {
            setFlag(true)
            resetForm({ values: '' });
        }
    })

    const handlePriceRange = () => {
        debouceRequest({ min: minPrice, max: maxPrice });
    }
    const handleClearFilter = () =>{
        setMinPrice(10);
        setMaxPrice(100000000);
        debouceRequest({ min: 10, max: 100000000 });
    }
    return (
        <>
            <div className="col-md-6 col-lg-12">
                <div className="product-widget">
                    <h6 className="product-widget-title">Filter by Price</h6>
                    <form className="product-widget-form" onSubmit={handleSubmit}>                     
                        <div className="product-widget-form">
                            <div className="product-widget-group">
                                <input type="number" min={10} max={100000000} value={minPrice} placeholder="min - 10" onChange={(e) => {
                                    setMinPrice(e.target.value);
                                }} />
                                <input type="number" placeholder="max - 1B" min={10} value={maxPrice} max={100000000} onChange={(e) => {
                                    setMaxPrice(e.target.value)
                                }} />
                            </div>
                            <div className="d-flex justify-content-between w-100">
                                <Button name="search" icon="fas fa-search" event={handlePriceRange} className="product-widget-btn mx-1" type="submit" id={'btn-price'} />
                                <Button type="button" userEvent={'button'} event={handleClearFilter} className="product-widget-btn  mx-1" icon="fas fa-broom" name="Clear" id='clear-filter'/>
                            </div>
                        </div>
                     </form>
                </div>
            </div>
        </>
    )
}

export default React.memo(FilterbyPrice)