import { useDisclosure } from '@chakra-ui/react'
import Head from 'next/head'
import Header from '../app/header-sidebar/Header'
import Sidebar from '../app/header-sidebar/Sidebar'

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="next app - admin pa nel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header onOpen={onOpen}/>
      <Sidebar onClose={onClose} isOpen={isOpen}/>
    </>
  )
}
