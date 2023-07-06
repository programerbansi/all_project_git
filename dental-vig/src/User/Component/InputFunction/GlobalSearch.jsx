import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
import TextField1 from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from "lodash";
import { UserValAuthContext } from '../Context/UserValContext';
import { useDispatch, useSelector } from 'react-redux';
import { getItemByAllType, getLocation } from '../../../redux/actions/UserEcommerceAction';
import { getLoggedInUser } from '../../../services/LocalStorageUser';
import {  useLocation, useNavigate } from 'react-router-dom';
import '../../Css/Header.css'
import makeStyles from "@material-ui/core/styles/makeStyles";
import GeoLocationDenied from '../Modal/GeoLocationDenied';

const useStyles = makeStyles({
    customTextField: {
        "& input::placeholder": {
            fontSize: "16px",
            color: "black",
        },
    }

});
const GlobalSearch = ({ options, label, getOptionLabel, id, name, defaultValue, select, current_loction, geolocation ,value,setSelectLoc,setSelectName}) => {
    const valContext = useContext(UserValAuthContext);
    const loggedUser = getLoggedInUser();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const [openRemoveAdModal, setOpenRemoveAdModal] = useState(false);
    const [updatedCurrentLoc, setUpdatedCurrentLoc] = useState('');
    const [Ulabel, setULabel] = useState(label);
    let currentLocations = useSelector((s) => s.UserEcommerceReducer.location)


    const request = debounce(value => {
        const formdata = new FormData();
        if (value?.length > 1 && value !== undefined) {

            formdata.append('name', value);
            if (name == "getItemByAllType") {
                dispatch(getItemByAllType(formdata));
            }
            else {

                dispatch(getLocation(formdata));
            }

        }
    }, 1000);

    const debouceRequest = useCallback(value => request(value), []);

    const handleInputChange = (txt, obj) => {
        if (!txt?.target?.value) {
            debouceRequest(txt)

        }
        else {
            debouceRequest(txt.target.value)
        }
    }

    const handleChange = (txt, obj) => {
        if (name == "getItemByAllType") {
            if (obj) {
                setSelectName(obj.name);
                valContext.setGSearchAllName(obj.name);
                valContext.setGSearchAllType(obj.type);
            }
            else {
                valContext.setGSearchAllType(null);
                valContext.setGSearchAllName("");
            }
        }
        else {
            if (obj) {
                if (obj.name == "Current Location") {
                    valContext.setClickCurrLoc(true);
                    if (geolocation && geolocation.loaded == false || geolocation && geolocation?.error?.code === 1) {
                        setOpenRemoveAdModal(true);
                        console.log(valContext.LocationState,"------****-******lat lon------********")

                        valContext.setDependentLocationState(valContext.LocationState);
                        valContext.setGeoLocationModel(true);           
                    }
                    else {                     
                        const formdata = new FormData();
                        formdata.append('name', current_loction);
                        dispatch(getLocation(formdata));
                        setUpdatedCurrentLoc(obj)                      
                    }
                }
                else {
                    setSelectLoc(obj.name);
                    valContext.setClickCurrLoc(false);
                    valContext.setGSearchType(obj.type);
                    valContext.setGSearchId(obj.id);
                    valContext.setGSearchName(obj.name);
                }
            }
            else {
                if (!loggedUser) {
                    valContext.setGSearchType(null);
                    valContext.setGSearchId("");
                    valContext.setGSearchName("");
                }
                else {
                    valContext.setGSearchType(null);
                    valContext.setGSearchId("");
                    valContext.setGSearchName("");                
                }
            }
        }
        if (location.pathname !== "/") {
            navigate("/")
        }
    }
    useEffect(() => {
        if (currentLocations?.length > 0 && updatedCurrentLoc?.name == 'Current Location') {
            valContext.setGSearchType(currentLocations[0]?.type);
            valContext.setGSearchId(currentLocations[0]?.id);
            valContext.setGSearchName(currentLocations[0]?.name);
            setUpdatedCurrentLoc('');
        }
    }, [updatedCurrentLoc, currentLocations])

    const handleFocus = () => {
        setULabel("");
    }
    let close = document.getElementsByClassName(
        "MuiAutocomplete-clearIndicator"
    )[0];
    useEffect(() => {
        close && close.addEventListener("click", () => {
            valContext.setClickCurrLoc(false);
            valContext?.setFilterCategoryId([])
            valContext?.setFilterRatings([])
            valContext?.setFilterTypeId([])
            valContext?.setFilterBrandId([])
        });
    }, [close])
    return (
        <>
            <Autocomplete
                id={id}
                options={options}
                onChange={(e, obj) => handleChange(e, obj)}
              
                sx={{ background: "#f5f5f5", textOverflow: 'ellipsis',borderRadius:'8px' }}
             
                  label={Ulabel == "Current Location" ? valContext.currLocation :Ulabel}
                getOptionLabel={getOptionLabel}
               
                onInputChange={(e) => { handleInputChange(e) }}
                renderInput={(params) => <TextField1  
                    classes={{ root: classes.customTextField }} {...params} placeholder={name == "getItemByAllType" ? Ulabel == "" ? label : "Search, Whatever you need..." : Ulabel == "" ? label : "Location..."} label={Ulabel} onFocus={handleFocus} />}
            />
            {
                openRemoveAdModal && <GeoLocationDenied openRemoveAdModal={openRemoveAdModal} setOpenRemoveAdModal={setOpenRemoveAdModal} />
            }
        </>
    )
}

export default memo(GlobalSearch)