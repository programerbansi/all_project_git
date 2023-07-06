import pick from '../assets/pick.svg'
import fill from '../assets/fill.svg'
import document from '../assets/document.svg'
import { GiRotaryPhone } from "react-icons/gi";
import { MdEmail, MdOutlineLocationOn } from "react-icons/md";
import { TfiWorld } from "react-icons/tfi";


export const primary = ' #005DBF'

export const template_options = [
    {name:'template1',image:<img src={require('../assets/template1.webp')} alt="image" className='template-image' />,id:1},
    {name:'template2',image:<img src={require('../assets/template2.webp')} alt="image" className='template-image' />,id:2},
    {name:'template3',image:<img src={require('../assets/template3.webp')} alt="image" className='template-image' />,id:3},
]

export const process_options = [
    {name:'image1',image:<img src={pick} style={{height:'255px',width:'200px'}} alt="image" />, heading:'Pick a CV template.',text:'Choose a sleek design and layout to get started.',id:1},
    {name:'image2',image:<img src={fill}  style={{height:'255px',width:'200px'}} alt="image" />,heading:'Fill in the blanks.',text:'Type in a few words. Let the Zety CV wizard fill the rest.',id:2},
    {name:'image3',image:<img src={document} style={{height:'255px',width:'200px'}} alt="image"/>,heading:'Customize your document.',text:'Make it truly yours. Uniqueness in a few clicks.',id:3},
]

export const details = [
    { icon: <GiRotaryPhone />, value: "+91 9265148451" },
    { icon: <MdEmail />, value: "hello@reallygreatsite.com" },
    { icon: <MdOutlineLocationOn />, value: "123 Anywhere St., Any City" },
    { icon: <TfiWorld />, value: "reallygreatsite.com" },
  ]; 
