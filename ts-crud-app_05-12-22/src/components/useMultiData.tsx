import React, { useState } from 'react'

const useMultiData = () => {

    const [itemsArray,setItemsArray] = useState([
        { id: 1, title: 'LinkDrip - Public roadmap', date: '2022-09-26', label: [{ value: 'tip', color: 'info' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
        { id: 2, title: '5 Micro Saas ideas', date: '2022-09-24', label: [{ value: 'create in public', color: 'warning' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
        { id: 3, title: 'LinkDrip - Early access Deal', date: '2022-08-26', label: [{ value: 'tip', color: 'success' }, { value: 'random', color: 'blue' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
        { id: 4, title: 'LinkDrip - Early access Deal', date: '2022-09-26', label: [{ value: 'motivation', color: 'warning' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
        { id: 5, title: 'LinkDrip - Early access Deal', date: '2022-09-26', label: [{ value: 'tip', color: 'success' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
        { id: 6, title: 'LinkDrip - Early access Deal', date: '2022-07-27', label: [{ value: 'tip', color: 'dark' }, {value:'promotion',color:'primary'}], destination: 'Chakra Design system', link: 'Chakra Design system' },
        { id: 7, title: 'How to publish tiktok videos', date: '2022-09-26', label: [{ value: 'tip', color: 'primary' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
        { id: 8, title: 'LinkDrip - Public roadmap', date: '2022-09-26', label: [{ value: 'create', color: 'success' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
        { id: 9, title: 'LinkDrip - Public roadmap', date: '2022-06-17', label: [{ value: 'tip', color: 'info' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
        { id: 10, title: 'LinkDrip - Public roadmap', date: '2022-09-26', label: [{ value: 'coding qustions', color: 'dark' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
        ])
  return itemsArray
}

export default useMultiData