import { User } from '../src/user/entities/user.entity';
import { BlogPost } from '../src/blogPost/entities/blogPost.entity';
import { Comment } from '../src/comment/entities/comment.entity';
import AppDataSource from '../src/database/data-source';

const mockUserData = [
  {
    username: 'John Doe',
    email: 'john.doe@example.com',
    hash: '$2b$07$KRiEiw5t/4GTs1If3MuWlOGIAtv/KHWp5Rmc8omcnF2isRCMOd/dC',
    salt: '$2b$07$KRiEiw5t/4GTs1If3MuWlO',
  },
  {
    username: 'Jane Smith',
    email: 'jane.smith@example.com',
    hash: '$2b$04$XktLxJwhdzVY5xKuY79FMOYS5SWOmBqOxkKy/yeVmLYwnjLRX0eb2',
    salt: '$2b$04$XktLxJwhdzVY5xKuY79FMO',
  },
];

const mockBlogPostData = [
  { userId: 1, content: 'tKOhaoQJcs3lc+gRoA==' },
  { userId: 2, content: 'tKOhaoQJcs3lc+gRoA==' },
  { userId: 1, content: 'tKOhaoQJcs3lc+gRoA==' },
  { userId: 2, content: 'tKOhaoQJcs3lc+gRoA==' },
  { userId: 1, content: 'tKOhaoQJcs3lc+gRoA==' },
  { userId: 2, content: 'tKOhaoQJcs3lc+gRoA==' },
  { userId: 1, content: 'tKOhaoQJcs3lc+gRoA==' },
  { userId: 2, content: 'tKOhaoQJcs3lc+gRoA==' },
];

const mockCommentData = [
  { content: 'n+qvfcUTOtige+gPtjmV53AcELS+Qw==', userId: 1, blogPostId: 1 },
  { content: 'lau2cpEOPNrpcw==', userId: 2, blogPostId: 1 },
  { content: 'n+qvfcUTOtige+gPtjmV53AcELS+Qw==', userId: 1, blogPostId: 2 },
  { content: 'lau2cpEOPNrpcw==', userId: 2, blogPostId: 2 },
  { content: 'n+qvfcUTOtige+gPtjmV53AcELS+Qw==', userId: 1, blogPostId: 3 },
  { content: 'lau2cpEOPNrpcw==', userId: 2, blogPostId: 3 },
  { content: 'n+qvfcUTOtige+gPtjmV53AcELS+Qw==', userId: 1, blogPostId: 4 },
  { content: 'lau2cpEOPNrpcw==', userId: 2, blogPostId: 4 },
  { content: 'n+qvfcUTOtige+gPtjmV53AcELS+Qw==', userId: 1, blogPostId: 5 },
  { content: 'lau2cpEOPNrpcw==', userId: 2, blogPostId: 5 },
  { content: 'n+qvfcUTOtige+gPtjmV53AcELS+Qw==', userId: 1, blogPostId: 6 },
  { content: 'lau2cpEOPNrpcw==', userId: 2, blogPostId: 6 },
  { content: 'n+qvfcUTOtige+gPtjmV53AcELS+Qw==', userId: 1, blogPostId: 7 },
  { content: 'lau2cpEOPNrpcw==', userId: 2, blogPostId: 7 },
  { content: 'n+qvfcUTOtige+gPtjmV53AcELS+Qw==', userId: 1, blogPostId: 8 },
  { content: 'lau2cpEOPNrpcw==', userId: 2, blogPostId: 8 },
];

AppDataSource.initialize().then(async (connection) => {
  const userRepository = connection.getRepository(User);
  const blogPostRepository = connection.getRepository(BlogPost);
  const commentRepository = connection.getRepository(Comment);

  const [users, posts, comments] = await Promise.all([
    userRepository.find(),
    blogPostRepository.find(),
    commentRepository.find(),
  ]);

  // We don't run seed data if database is already populated
  if ([...users, ...posts, ...comments].length > 0) {
    await connection.destroy();
    return;
  }

  // Seed mock user data
  for (const userData of mockUserData) {
    const user = new User();
    user.username = userData.username;
    user.email = userData.email;
    user.hash = userData.hash;
    user.salt = userData.salt;
    await userRepository.insert(user);
  }

  // Seed mock blog post data
  for (const blogPostData of mockBlogPostData) {
    const blogPost = new BlogPost();
    blogPost.content = blogPostData.content;
    blogPost.userId = blogPostData.userId;
    await blogPostRepository.insert(blogPost);
  }

  // Seed mock comment data
  for (const commentData of mockCommentData) {
    const comment = new Comment();
    comment.content = commentData.content;
    comment.userId = commentData.userId;
    comment.blogPostId = commentData.blogPostId;
    await commentRepository.insert(comment);
  }

  await connection.destroy();
});
