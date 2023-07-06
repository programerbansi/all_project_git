import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Table, Thead, Tbody,  Tr, Th, Td, TableContainer, IconButton,  Container, Center, Card, CardHeader, CardBody, Link, Badge,  } from '@chakra-ui/react'
import { EditIcon, CopyIcon, CalendarIcon, ArrowLeftIcon, ChevronRightIcon, ArrowRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import { useState ,useEffect} from 'react';

export default function Home() {

  interface EnumServiceItem {
    id: number; title:string; date: string; label : Array<{
      value: string;
      color: string;
    }>, destination : string; link : string;
}

// interface EnumServiceItems extends Array<EnumServiceItem>{}

  const array : EnumServiceItem[] = [
    { id: 1, title: 'LinkDrip - Public roadmap', date: '2022-09-26', label: [{ value: 'tip', color: 'green' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 2, title: '5 Micro Saas ideas', date: '2022-09-24', label: [{ value: 'create in public', color: 'gray' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 3, title: 'LinkDrip - Early access Deal', date: '2022-08-26', label: [{ value: 'tip', color: 'green' }, { value: 'random', color: 'blue' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 4, title: 'LinkDrip - Early access Deal', date: '2022-09-26', label: [{ value: 'motivation', color: 'yellow' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 5, title: 'LinkDrip - Early access Deal', date: '2022-09-26', label: [{ value: 'tip', color: 'green' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 6, title: 'LinkDrip - Early access Deal', date: '2022-07-27', label: [{ value: 'tip', color: 'green' }, {value:'promotion',color:'green'}], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 7, title: 'How to publish tiktok videos', date: '2022-09-26', label: [{ value: 'tip', color: 'green' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 8, title: 'LinkDrip - Public roadmap', date: '2022-09-26', label: [{ value: 'create', color: 'teal' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 9, title: 'LinkDrip - Public roadmap', date: '2022-06-17', label: [{ value: 'tip', color: 'green' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 10, title: 'LinkDrip - Public roadmap', date: '2022-09-26', label: [{ value: 'coding qustions', color: 'orange' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 11, title: 'LinkDrip - Public roadmap', date: '2022-09-26', label: [{ value: 'tip', color: 'green' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 12, title: 'LinkDrip - Public roadmap', date: '2022-05-25', label: [{ value: 'random', color: 'blue' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 13, title: 'LinkDrip - Public roadmap', date: '2022-09-26', label: [{ value: 'tip', color: 'green' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 14, title: 'LinkDrip - Public roadmap', date: '2022-4-04', label: [{ value: 'tip', color: 'green' }, { value: 'random', color: 'blue' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 15, title: 'LinkDrip - Public roadmap', date: '2022-09-26', label: [{ value: 'tip', color: 'green' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 16, title: 'LinkDrip - Public roadmap', date: '2022-09-26', label: [{ value: 'random', color: 'blue' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 17, title: 'LinkDrip - Public roadmap', date: '2022-02-28', label: [{ value: 'motivation', color: 'yellow' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 18, title: 'LinkDrip - Public roadmap', date: '2022-09-26', label: [{ value: 'tip', color: 'green' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 19, title: 'LinkDrip - Public roadmap', date: '2022-10-26', label: [{ value: 'tip', color: 'green' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 20, title: 'LinkDrip - Public roadmap', date: '2022-09-10', label: [{ value: 'create in public', color: 'gray' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 21, title: 'LinkDrip - Public roadmap', date: '2022-09-26', label: [{ value: 'tip', color: 'green' }, { value: 'create', color: 'teal' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 22, title: 'LinkDrip - Public roadmap', date: '2022-09-26', label: [{ value: 'tip', color: 'green' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 23, title: 'LinkDrip - Public roadmap', date: '2022-09-26', label: [{ value: 'motivation', color: 'yellow' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 24, title: 'LinkDrip - Public roadmap', date: '2022-03-12', label: [{ value: 'tip', color: 'green' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 25, title: 'LinkDrip - Public roadmap', date: '2022-02-11', label: [{ value: 'coding qustions', color: 'orange' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 26, title: 'LinkDrip - Public roadmap', date: '2022-04-26', label: [{ value: 'tip', color: 'green' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
    { id: 27, title: 'LinkDrip - Public roadmap', date: '2022-09-03', label: [{ value: 'create', color: 'teal' }, { value: 'tips', color: 'pink' }], destination: 'Chakra Design system', link: 'Chakra Design system' },
  ]

  const [currentPage, setcurrentPage] = useState<number>(1);
  const [data, setData] = useState(array);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const [pageNumberLimit, setpageNumberLimit] = useState<number>(Number(itemsPerPage));
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState<number>(Number(itemsPerPage));
  const [minPageNumberLimit, setminPageNumberLimit] = useState<number>(0);

  const indexOfLastItem = currentPage * Number(itemsPerPage);
  const indexOfFirstItem = indexOfLastItem - Number(itemsPerPage);
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const [totalItems, setTotalItems] = useState<number>(array.length);
  const [totalPage, setTotalPage] = useState(Math.ceil(totalItems / Number(itemsPerPage)))

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };


  const handleFirstPage = () => {
    setcurrentPage(1);
    setmaxPageNumberLimit(Number(itemsPerPage));
    setminPageNumberLimit(0);
  }
  const handleLastPage = () => {
    setcurrentPage(totalPage)
  }

  const handleCheckbox = (index: Number) => {
    let checkbox = document.getElementById('check') as HTMLInputElement
    if (checkbox?.checked)
    {
      checkbox.checked = false
    }

    let box = document.getElementById(`check${index}`) as HTMLInputElement;
    let row = document.getElementById(`row${index}`) as HTMLInputElement;
    if (box?.checked && row) {
      row.style.backgroundColor = 'rgb(242 249 255)'
    }
    else {
      if (row) row.style.backgroundColor = 'white';
    }
  }

  useEffect(()=>{handleAllSelect()},[currentPage])

  const handleAllSelect = () => {
    let checkbox = document.getElementById('check') as HTMLInputElement
    currentItems?.map((item) => {
      let box = document.getElementById(`check${item.id}`) as HTMLInputElement;
      let row = document.getElementById(`row${item.id}`) as HTMLInputElement;
      if (box && row) {
        if (checkbox?.checked) {
          box.checked = true;
          row.style.backgroundColor = 'rgb(242 249 255)'
        }
        else {
          box.checked = false;
          row.style.backgroundColor = 'white'
        }
      }
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center>
        <Container maxW='container.lg' color='#262626'>
          <Card height={'550px'} marginTop='50px'>
            <CardBody height={'100%'}>
              <TableContainer height={'100%'} width='100%' scrollBehavior='smooth'>
                <Table size='lg'>
                  <Thead>
                    <Tr>
                      <Th>
                        <input id={`check`} onClick={() => handleAllSelect()} type='checkbox'/>
                      </Th>
                      <Th>Title</Th>
                      <Th>Date</Th>
                      <Th>Label</Th>
                      <Th>Destination</Th>
                      <Th>Link</Th>
                      <Th isNumeric>...</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      currentItems?.map((d, index) => <Tr key={index} id={`row${d.id}`} >
                        <Td>
                          <input type={'checkbox'} id={`check${d.id}`} onClick={() => handleCheckbox(d.id)}/>
                        </Td>
                        <Td>{d.title}</Td>
                        <Td>{d.date}</Td>
                        <Td>{d.label.map((label, i) => <Badge key={i} m={'1'} colorScheme={label.color} className={styles.badge}>{label.value}</Badge>)}</Td>
                        <Td><Link href='https://chakra-ui.com'  color='#2d8eff'>{d.destination}</Link></Td>
                        <Td><Link href='https://chakra-ui.com'  color='#2d8eff'>{d.link}</Link></Td>
                        <Td>
                          <EditIcon w={4} h={4} m={1}/>
                          <CalendarIcon w={4} h={4} m={1} />
                          <CopyIcon w={4} h={4} m={1} />
                          ...
                        </Td>
                      </Tr>)
                    }
                    <Tr>
                      <Td width={'30px'}>
                        {indexOfFirstItem + 1} - {indexOfLastItem} of {totalItems}
                      </Td>
                      <Td px={0}>
                        <IconButton variant='ghost' onClick={() => handleFirstPage()} aria-label='aerrow left icon' disabled={currentPage > 1 ? false : true} icon={<ArrowLeftIcon />}/>
                        <IconButton variant='ghost' onClick={() => handlePrevbtn()} aria-label='left icon' disabled={currentPage > 1 ? false : true} icon={<ChevronLeftIcon />} />
                        <IconButton variant='ghost' onClick={() => handleNextbtn()} aria-label='aerrow right icon' disabled={currentPage < totalPage ? false : true} icon={<ChevronRightIcon />} />
                        <IconButton variant='ghost' onClick={() => handleLastPage()} aria-label='right icon' disabled={currentPage < totalPage ? false : true} icon={<ArrowRightIcon />} />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </Container>
      </Center>
    </div>
  )
}
