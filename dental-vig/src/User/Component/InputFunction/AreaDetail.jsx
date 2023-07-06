import React, { useContext, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { UserValAuthContext } from "../Context/UserValContext";
import { USER_CITYLIST, getCityList, getCountryList, getDatas, getStateList } from '../../../redux/actions/UserEcommerceAction';
import '../../Css/Register.css'

export default function AreaDetail(props) {
    let address = props.obj;
    let stateList = useSelector((state) => state.UserEcommerceReducer.stateList);
    let cityList = useSelector((state) => state.UserEcommerceReducer.cityList);
    const dispatch = useDispatch();
    const val = useContext(UserValAuthContext);
    let listLoaded = false;
    useEffect(() => {
        if (!listLoaded) {        
            dispatch(getStateList());
            dispatch(getDatas(`cities/${val.selectedState.id}`,USER_CITYLIST));
            listLoaded = true;
        }
    }, [val.selectedState.id])

    const updatedStates = stateList && stateList.map((state) => ({ label: state.name, value: state.id, name: state.name, ...state }));
    const updatedCities = cityList && cityList.map((city) => ({ label: city.name, value: city.id, name: city.name, ...city }));


    return (
        <>
           
            <div className="col-6 m-0 w-100">
                <div className="form-group">
                    <label>State</label>
                    <Select
                        placeholder={'select state'}
                        id={address.state}
                        name={address.state}
                        options={updatedStates}
                        value={address.values.state}
                        onChange={(value) => {
                            val.setSelectedState(value);
                            val.setSelectedCity({});
                            address.setFieldValue('state', value)
                            address.setFieldValue('city', '')                          
                        }}
                        onBlur={address.handleBlur}
                    />
                    <div className="row"><span className="text-danger" style={{ marginLeft: '15px' }}>{address && address.touch?.state && address?.error?.state}</span></div>
                </div>
            </div>
            <div className="col-6 m-0 w-100">
                <div className="form-group">
                    <label>City</label>
                    <Select
                        placeholder={'select city'}
                        id={address.city}
                        name={address.city}
                        options={updatedCities}
                        value={address.values.city}
                        onChange={(value) => {
                            val.setSelectedCity(value)
                            address.setFieldValue("city", value)
                        }}
                        onBlur={address.handleBlur}
                    />
                    <div className="row"><span className="text-danger" style={{ marginLeft: '15px' }}>{address && address.touch?.city && address?.error?.city}</span></div>
                </div>
            </div>
        </>
    );
}
