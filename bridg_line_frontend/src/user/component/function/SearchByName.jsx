import React, { useState } from 'react';
import { useContext } from 'react';
import { AdminValAuthContext } from '../../../admin/context/AdminAuthProvider';

function SearchByName({ list }) {
    const [inputValue, setInputValue] = useState('');
    const val = useContext(AdminValAuthContext);
    const handleInputChange = (event) => {
        const typedValue = event.target.value;
       
        setInputValue(typedValue);
        const filtered = list.filter(item =>
            `${item.firstname} ${item.lastname}`.toLowerCase().includes(typedValue.toLowerCase()) || item.firstname.toLowerCase().includes(typedValue.toLowerCase()) || item.lastname.toLowerCase().includes(typedValue.toLowerCase())
        );
        if(typedValue)
        {
            val?.setFilteredArray(filtered);
        }
        else
        {
            val?.setFilteredArray([]);
        }
    };
    return (
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search by name..."
                className='form-control '
            />
    );
}

export default SearchByName;