// src/app/blog/[slug]/page.tsx
// NO 'use client' HERE! This is a Server Component.

import { getPostData, getSortedPostsData, PostMetadata } from '@/lib/posts';
import { BlogPostClient } from './blog-page-client'; // Import the new Client Component

// Define the props type for your page component
interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Function to generate static paths for all blog posts
// This runs on the server at build time (SSG)
export async function generateStaticParams() {
  const posts = await getSortedPostsData(); // Get all posts metadata
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Main page component - this is an Async Server Component
const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = params;

  // Fetch the specific blog post data on the server
  const { metadata: blogPostMetadata, content: blogContentHtml } = await getPostData(slug);

  // Fetch related posts data on the server
  const allPosts = await getSortedPostsData();
  const relatedPosts = allPosts
    .filter((post) => post.slug !== slug) // Exclude current post
    .slice(0, 3); // Get top 3 related posts

  // Render the Client Component, passing all fetched data as props
  return (
    <BlogPostClient
      blogPost={{ ...blogPostMetadata, content: blogContentHtml }} // Combine metadata and HTML content
      relatedPosts={relatedPosts}
    />
  );
};

export default BlogPostPage;