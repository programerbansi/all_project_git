import React from 'react'
import { useState } from 'react';
import Select from 'react-select'
import { status_filter_opt} from '../../../user/component/json/arrayJson';
import { storeStatus } from '../../../services/UserLocalStorage';
const FilterStatus = ({state,getFilterStatus}) => {
    const [selectedOption, setSelectedOption] = useState(state ? { value: state, label: state == "Redy" ? "Invoice Ready/Make Payment" : state == 'Other' ? "Others":state == "PhotoDoc" ? "Needs More Documents/Needs More Photos":state}:{ value: 'Pending', label: 'Pending' });
    function handleSelect(data) {
        setSelectedOption(data.value)
        storeStatus(data.value);
        getFilterStatus(data.value)  
    }
    return (
        <>
            <Select
                defaultValue={selectedOption}
                onChange={handleSelect}
                options={status_filter_opt}
                className='w-25'
            />
        </>
    )
}

export default FilterStatus