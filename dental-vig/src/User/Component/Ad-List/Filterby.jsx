import React from 'react'
import CheckBoxField from '../InputFunction/CheckBoxField'
import Lable from '../InputFunction/Lable'
import Button from '../InputFunction/Button'

const Filterby = ({array,handleCheckbox,handleSubmit,handleClick,checkName,checkId,title}) => {
    return (
        <>
            <div className="col-md-6 col-lg-12">
                <div className="product-widget">
                    <h6 className="product-widget-title">{title}</h6>
                    <form className="product-widget-form">
                        <ul className="product-widget-list product-widget-scroll category-item">
                            {array && array.map((item, index) => {
                                return <li className='product-widget-item m-0 p-2' key={index} style={{ borderRadius: '8px' }}
                                >
                                    <CheckBoxField event={(e) => handleClick(item, e)} name={checkName} id={checkId} />
                                    <Lable event={() => handleCheckbox(item, (index))} className1="product-widget-label" className2="product-widget-text" className3="product-widget-number" name={item.name} number={item.num} />
                                </li>
                            })}
                        </ul>
                        <Button type="button" userEvent={'button'} event={handleSubmit} className="product-widget-btn" icon="fas fa-broom" name="Clear Filter" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Filterby