import Layout from '../components /Layout';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

type Post = {
  title: string;
  content: string;
}

const BlogHome = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const {
    isLoading, isSuccess
  } = useQuery({
    queryKey: 'blog posts',
    queryFn: () => axios.get('/api/post'),
    onSuccess: (data) => { console.log(data); }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div>
        <h1>Blog Post</h1>
      </div>
      <div>
        <div>
          
          <button type="submit">Delete</button>
        </div>

      </div>
    </Layout>
  );
};

export default BlogHome;
