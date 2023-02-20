import React from 'react'
import Image from 'next/image'
import getPosts  from '../pages/api/posts/getPosts'

async function BlogList() {
  const posts = await getPosts();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-10 gap-10 gap-y-16 pb-24">
      {posts.map((post) => (
          <div key={post} className="flex flex-col group cursor-pointer">
            <div
              className="relative w-full h-80 drop-shadow-xl
            group-hover:scale-105 transition-transform duration-150"
            >
              <Image
                className="object-cover object-left lg:object-center"
                alt={post.author.name}
                src={post.mainImage}
                fill
              />
              <div
                className="absolute bottom-0 w-full bg-opacity-20 bg-black backdrop-blur-lg
              rounded drop-shadow-lg text-white p-5 flex justify-between"
              >
                <div>
                  <p className="font-bold">{post.title}</p>
                  <p>
                    {new Date(post._createdAt).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-y-2">
                  {post.categories.map((category: { title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
                    <div className="bg-[#537FE7] text-center text-black px-3 py-1 rounded-full text-sm font-semibold">
                      {/* <p>{category.title}</p> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 flex-1">
              <p className="underline text-lg font-bold">{post.title}</p>
              <p className="line-clamp-2 text-gray-500">{post.description}</p>
            </div>

            <p className="mt-5 font-bold flex items-center group-hover:underline">
              Read Post
              <ArrowUpRightIcon className="ml-2 h-4 w-4" />
            </p>
          </div>
      ))}
    </div>
  );
}

export default BlogList