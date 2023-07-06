import { MdCategory } from "react-icons/md"
import {TbBrandAirbnb} from 'react-icons/tb'
import {BiCategory} from 'react-icons/bi'
import { primary } from "./variables"
import { ALL_BRANDS, ALL_CATEGORIES, ALL_TYPES } from "./routes"

export const options = [
    {
        name: 'Categories',
        icon: <MdCategory color={primary} size='23px' style={{ marginTop: '3px' }} />,
        option: [{name:'All Categories',path:ALL_CATEGORIES}]
    },
    {
        name: 'Brands',
        icon: <TbBrandAirbnb color={primary} size='23px' style={{ marginTop: '3px' }} />,
        option: [{name:'All Brands',path:ALL_BRANDS}]
    },
    {
        name: 'Types',
        icon: <BiCategory color={primary} size='23px' style={{ marginTop: '3px' }} />,
        option: [{name:'All Types',path:ALL_TYPES}]
    },
]