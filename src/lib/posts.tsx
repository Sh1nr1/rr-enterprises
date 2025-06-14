import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Define the type for your post metadata (frontmatter)
export interface PostMetadata {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  slug: string; // Add slug here
}

// Define the type for a complete post (metadata + content)
export interface BlogPostData {
  metadata: PostMetadata;
  content: string; // HTML content after parsing markdown
}

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getSortedPostsData(): Promise<PostMetadata[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Destructure `slug` out of `matterResult.data` (if it exists in frontmatter)
    // and collect the rest of the properties into `restOfFrontmatter`.
    
    const { slug: _frontmatterSlug, ...restOfFrontmatter } = matterResult.data as PostMetadata;

    // Combine the data with the slug, ensuring the filename-derived slug is used
    return {
      slug, // This is the canonical slug from the filename
      ...restOfFrontmatter, // Spread all other metadata properties from frontmatter
    };
  });
  // Sort posts by date (descending)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(slug: string): Promise<BlogPostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Destructure `slug` out of `matterResult.data` (if it exists in frontmatter)
  // and collect the rest of the properties into `restOfFrontmatter`.
  
  const { slug: _frontmatterSlug, ...restOfFrontmatter } = matterResult.data as PostMetadata;

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the slug and contentHtml
  return {
    metadata: {
      slug, // This is the canonical slug passed as an argument
      ...restOfFrontmatter, // Spread all other metadata properties from frontmatter
    },
    content: contentHtml,
  };
}