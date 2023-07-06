// import React from 'react'
// import { ReactSearchAutocomplete } from 'react-search-autocomplete'
// import { GET_SEARCH_LIST, GET_SEARCH_LIST_ARRAY, getData } from '../../../redux/action/Action'
// import { useCallback } from 'react'
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router'
// import { getLoggedInUser } from '../../../services/UserLocalStorage'
// import { debounce } from "lodash";
// import { useContext } from 'react'
// import { useState } from 'react'
// import { UserValAuthContext } from '../context/UserAuthProvider'
// import Autocomplete from 'react-autocomplete'
// const SearchAutoComplete = ({ }) => {
//     const val = useContext(UserValAuthContext);
//     const dispatch = useDispatch();
//     const loggedUser = getLoggedInUser();
//     const [searchData, setsearchData] = useState();
//     const suggestions = [
//         { id: 100, text: "Aluminium extracts" },
//         { id: 101, text: "Copper extracts" }
//     ];
//     const [searchTerm, setSearchTerm] = useState("");
//     const items = suggestions.filter((item) =>
//         item.text.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     const handleOnClear = () => {
//         val?.setClear(true)
//         val?.setsearchArray([])
//     }
//     const handleOnSearch = (string, results) => {
//         if (string) {
//             val?.setClear(false)
//             dispatch(getData({ search: "result", title: string }, `/user/search-globle/${loggedUser?.id}`, GET_SEARCH_LIST))
//         }
//         else {
//             val?.setClear(true)
//             val?.setsearchArray([])
//         }
//     }
//     const handleOnSelect = (item) => {
//         dispatch(getData({ search: "", title: item.name }, `/user/search-globle/${loggedUser?.id}`, GET_SEARCH_LIST_ARRAY))
//     }
//     const formatResult = (item) => {
//         console.log(item, "------------item---------------")
//         return (
//             <>
//                 <span key={item.key} style={{ display: 'block', textAlign: 'left' }} >{item?.name}</span>
//             </>
//         )
//     }
//     const searchList = useSelector((state) => state.Reducer.searchList);
//     useEffect(() => {
//         setsearchData(searchList)
//     }, [searchList])
//     console.log(searchList, "------------search list-----------")

//     return (
//         <>
//             <Autocomplete
//                 getItemValue={(item) => item.text}
//                 renderMenu={(items) =>
//                     items.length > 0 ? <div children={items} /> : <div>No results found</div>
//                 }
//                 items={items}
//                 renderItem={(item, isHighlighted) => {
//                     return <div> {item.text} </div>;
//                 }}
//                 value={searchTerm}
//                 onChange={(e, newValue) => {
//                     setSearchTerm(e.target.value);
//                 }}
//                 onSelect={(text) => setSearchTerm(text)}
//                 inputProps={{ placeholder: "start typing" }}
//             />
//             <ReactSearchAutocomplete
//                 items={searchList}
//                 onSearch={handleOnSearch}
//                 onSelect={handleOnSelect}
//                 onClear={handleOnClear}
//                 inputDebounce={1000}
//                 autoFocus
//                 formatResult={(item) => { formatResult(item) }}
//                 styling={{
//                     height: "35px",
//                     borderRadius: "4px",
//                     boxShadow: "none",
//                     backgroundColor: "rgb(247 247 247)"
//                 }}
//             />
//         </>
//     )
// }

// export default SearchAutoComplete
import React, { useContext, useEffect, useState } from 'react';
import { GET_SEARCH_LIST, GET_SEARCH_LIST_ARRAY, getData, getDataSearch } from '../../../redux/action/Action';
import { getLoggedInUser } from '../../../services/UserLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { UserValAuthContext } from '../context/UserAuthProvider';
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { debounce } from "lodash";
import { useCallback } from 'react';
import { useRef } from 'react';
import Spinner from 'react-bootstrap/Spinner';
const SearchAutoComplete = ({ setLoading }) => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [seraching,setSeraching]=useState(false);
    const dropdownRef = useRef(null);
    const val = useContext(UserValAuthContext);
    const dispatch = useDispatch();
    const loggedUser = getLoggedInUser();
    const searchList = useSelector((state) => state.Reducer.searchList);
    useEffect(() => {
        setOptions(searchList);
    }, [searchList])
    const request = debounce(value => {
        if (value) { setSeraching(true);dispatch(getDataSearch({ search: "result", title: value }, `/user/search-globle/${loggedUser?.id}`, GET_SEARCH_LIST,setSeraching)) }
    }, 500)

    const debouceRequest = useCallback(value => request(value), []);
    const handleSearchInputChange = (event) => {
        const { value } = event.target;
        if (value.length > 1) {
            debouceRequest(value);
        }
        else {
            setSearchValue(''); setSelectedOption(''); setOptions(''); val?.setsearchArray([]);
        }
        setSearchValue(value);
        setIsDropdownOpen(true);
    };
    const handleOptionSelect = (option) => {
        setLoading(true)
        dispatch(getData({ search: "", title: option.name }, `/user/search-globle/${loggedUser?.id}`, GET_SEARCH_LIST_ARRAY))
        setSelectedOption(option.name);
        setSearchValue(option.name);
        setIsDropdownOpen(false);
    };

    const handleInputPaste = (event) => {
        const pasteData = event?.clipboardData?.getData('text');

        dispatch(getData({ search: "result", title: pasteData }, `/user/search-globle/${loggedUser?.id}`, GET_SEARCH_LIST))

        setSearchValue(pasteData);
    };
   
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false); 
            setSearchValue(''); setSelectedOption(''); setOptions(''); val?.setsearchArray([]);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div>

            <div className='position-relative'>
                <input
                    className='form-control rounded-0 padding-x-4'
                    type="text"
                    value={searchValue}
                    onChange={handleSearchInputChange}
                    onClick={() => setIsDropdownOpen(true)}
                    onPaste={() => { handleInputPaste(); setSearchValue('') }}
                />
                <span className="position-absolute top-0 start-0 pt-2 ps-2 fs-6"><BsSearch /></span>
                {seraching ? <div className='position-absolute top-0 end-0 p-2 text-secondary'> <Spinner animation="border" size="sm" /></div>:null}
                {selectedOption ? <button className='position-absolute top-0 end-0 bg-transparent border-0 fs-5' onClick={() => { setSearchValue(''); setSelectedOption(''); setOptions(''); val?.setsearchArray([]); }}><AiOutlineClose /></button> : null}
                {isDropdownOpen &&
                    <ul ref={dropdownRef} className='shadow border list-unstyled position-absolute bg-white top-3 w-100 pointer' style={{ zIndex: 1 }}>
                        {options && options.map((option) => (
                            <li className='p-2 border-bottom search-list-hover' key={option.id} onClick={() => handleOptionSelect(option)} >
                                <span className="fs-6"><BsSearch /> <span className='ms-1'>{option.name}</span></span>
                            </li>
                          
                        ))}
                        {!options && <li className='p-2 border-bottom '>No Result Found</li>}
                    </ul>}
            </div>

        </div>
    );
};

export default SearchAutoComplete;
