import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Spacer } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react';
import { Inter } from '@next/font/google'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {AiOutlineHome} from 'react-icons/ai'

const inter = Inter({ subsets: ['latin'] })

const BreadcrumbComp = () => {
    const { pathname } = useRouter();
    
    return (
        <>
            <Container maxW='80%' marginTop={'20px'}>
                <Flex>
                    <Spacer />
                    
                    <Breadcrumb fontWeight={'medium'} spacing='8px' separator={<ChevronRightIcon color='gray.500' />} className={inter.className}>
                        <BreadcrumbItem>
                            <BreadcrumbLink ><AiOutlineHome/></BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink >{pathname.split('/').at(-2)}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink>{pathname.split('/').at(-1)}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Flex>
            </Container>
        </>
    )
}

export default BreadcrumbComp
