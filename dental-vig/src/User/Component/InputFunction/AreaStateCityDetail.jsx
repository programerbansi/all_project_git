import React, { useContext, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { UserValAuthContext } from "../Context/UserValContext";
import { getCityList, getCountryList, getStateAllList, getStateList } from '../../../redux/actions/UserEcommerceAction';
import '../../Css/Register.css'
import { getLoggedInUser } from "../../../services/LocalStorageUser";

export default function AreaStateCityDetail(props) {
    let user = getLoggedInUser();


    let address = props.obj;
    let stateList = useSelector((state) => state.UserEcommerceReducer.stateList);
    let cityList = useSelector((state) => state.UserEcommerceReducer.cityList);

    const dispatch = useDispatch();
    const val = useContext(UserValAuthContext);
    let listLoaded = false;

    useEffect(() => {
        if (!listLoaded) {
            dispatch(getStateList());   
            dispatch(getCityList(val.selectedState.id));
            listLoaded = true;
        }
    }, [dispatch, listLoaded, val])

    const updatedStates = stateList && stateList.map((state) => ({ label: state.name, value: state.id, name: state.name, ...state }));
    const updatedCities = cityList && cityList.map((city) => ({ label: city.name, value: city.id, name: city.name, ...city }));

    return (
        <>            
           
            <div className="col-6 m-0 w-100">
                <div className="form-group">
                    <label>State</label>
                    <Select
                        id={address.State}
                        name={address.State}
                        options={updatedStates}
                        value={address.values.State}
                        onChange={(value) => {
                            val.setSelectedState(value);
                            val.setSelectedCity({});
                            address.setFieldValue('State',value)
                            address.setFieldValue('City','')                            
                        }}
                        onBlur={address.handleBlur}
                    />
                    <div className="row"><span className="text-danger" style={{ marginLeft: '15px' }}>{address && address.touch?.State && address?.error?.State}</span></div>
                </div>
            </div>
            <div className="col-6 m-0 w-100">
                <div className="form-group">
                    <label>City</label>
                    <Select
                        id={address.City}
                        name={address.City}
                        options={updatedCities}
                        value={address.values.City}
                        onChange={(value) => {
                            val.setSelectedCity(value)
                            address.setFieldValue("City", value)
                        }}
                        onBlur={address.handleBlur}
                    />
                    <div className="row"><span className="text-danger" style={{ marginLeft: '15px' }}>{address && address.touch?.City && address?.error?.City}</span></div>
                </div>
            </div>
        </>
    );
}
