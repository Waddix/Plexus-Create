import * as React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function SplitScreen() {
  const [session] = useSession();
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}>
              Plexus
            </Text>
            <br />{' '}
            <Text color={'blue.400'} as={'span'}>
              Let's Create Some Shit
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            Share your vision. Find collaborators. Draw support.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Link href={session ? '/create-project' : 'api/auth/signin'}>
              <Button
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: useColorModeValue('orange.200', 'orange.700'),
                }}>
                Get Started
              </Button>
            </Link>

            <Link href='/projects'>
              <Button
                rounded={'full'}
                _hover={{
                  bg: useColorModeValue('orange.200', 'orange.700'),
                }}
              >
                Get inspiration
              </Button>
            </Link>

          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1543013309-0d1f4edeb868?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=723&q=80'
          }
        />
      </Flex>
    </Stack>
  );
}

// 'https://images.unsplash.com/photo-1468421870903-4df1664ac249?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1189&q=80'
// 'https://images.unsplash.com/photo-1543013309-0d1f4edeb868?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=723&q=80'
// 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'