import { useSession } from 'next-auth/react';
// import { useState } from 'react';
// import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons';
// import Link from 'next/link';
// import Router from 'next/router';
import { useForm, Resolver } from 'react-hook-form';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Link as ChakraLink,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import Layout from '@/components /Layout';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import axios from 'axios';

type SrcProps = {
  src: string | null | undefined;
};

type FormValues = {
  title: string;
  content: string;
};

const schema = yup
  .object({
    title: yup.string().required(),
    content: yup.string().required(),
  })
  .required();

const Post = () => {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  // const [title, setTitle] = useState<string>();
  // const [content, setContent] = useState<string>();
  // const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const mutation = useMutation({
    mutationKey: 'create-blog-post',
    mutationFn: (data: FormValues) => axios.post('/api/post', data),
    onSuccess: () => console.log('blog created'),
    onError: (error: any) => console.log(error),
  });

  // SET CHAKRA COLOR
  const color = useColorModeValue('gray.50', 'gray.800');
  const color2 = useColorModeValue('white', 'gray.700');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const submitData = async (data: FormValues) => {
    mutation.mutate(data);
  };

  if (!session) {
    return (
      <Layout>
        <Flex minH={'100vh'} align={'center'} justify={'center'} bg={color}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign in to your account</Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                to create posts <ChakraLink color={'blue.400'}></ChakraLink>{' '}
                🫱🏽‍🫲🏾
              </Text>
            </Stack>
          </Stack>
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Stack spacing={8} mx={'auto'}>
        <form onSubmit={handleSubmit(submitData)}>
          <input type="text" {...register('title')} id="" placeholder="title" />
          <div>{errors.title && <span>{errors.title.message}</span>}</div>
          <br />
          <textarea {...register('content')} placeholder="content"></textarea>
          <div>
            {errors.content ? <span>{errors.content.message}</span> : null}
          </div>
          <button>Submit</button>
        </form>
      </Stack>
    </Layout>
  );
};

export default Post;
