const login = `
mutation Mutation($credentials: Credentials!) {
  login(credentials: $credentials) {
    token
    message
    user {
      id
      user_name
      email
      profilePicture
      bannerPicture
      bio
    }
  }
} `;
const register = `mutation Register($user: UserInput!) {
  register(user: $user) {
    token
    message
    user {
      id
      user_name
      email
      profilePicture
      bannerPicture
      bio
    }
  } 
}`;
const getUsers = `query Query {
  users {
    id
    user_name
    email
    profilePicture
    bannerPicture
    bio
  }
}`;
const getUserById = `query Query($userByIdId: ID!) {
  userById(id: $userByIdId) {
    id
    user_name
    email
    profilePicture
    bannerPicture
    bio
  }
}`;
const updateUser = `mutation Mutation($user: UserModify!) {
  updateUser(user: $user) {
    message
    user {
      id
      user_name
      email
      profilePicture
      bannerPicture
      bio
    }
  }
}`;
const deleteUser = `mutation Mutation {
  deleteUser {
    token
    message
    user {
      id
      user_name
      email
      profilePicture
      bannerPicture
      bio
    }
  }
}`;
const deleteUserAsAdmin = `mutation Mutation($deleteUserAsAdminId: ID!) {
  deleteUserAsAdmin(id: $deleteUserAsAdminId) {
    token
    message
    user {
      id
      user_name
      email
      profilePicture
      bannerPicture
      bio
    }
  }
}`;
//still issues with this one
const updateUserAsAdmin = `mutation Mutation($updateUserAsAdminId: ID!, $user: UserModify!) {
  updateUserAsAdmin(id: $updateUserAsAdminId, user: $user) {
    token
    message
    user {
      id
      user_name
      email
      profilePicture
      bannerPicture
      bio
    }
  }
}`;
const checkToken = `
query Query {
  checkToken {
    token
    message
    user {
      id
      user_name
      email
      profilePicture
      bannerPicture
      bio
    }
  }
}`;
const getAllPosts = `
query Query {
  posts {
    id
    text
    user {
      id
      user_name
      email
      profilePicture
      bannerPicture
      bio
    }
    image
    dateAdded
  }
}`;
const postById = `query Query($postByIdId: ID!) {
  postById(id: $postByIdId) {
    id
    text
    user {
      id
      user_name
      email
      profilePicture
      bannerPicture
      bio
    }
    image
    dateAdded
  }
}`;
const getPostsByUserId = `query Query($userId: ID!) {
  postsByUser(userId: $userId) {
    id
    text
    user {
      id
      user_name
      email
      profilePicture
      bannerPicture
      bio
    }
    image
    dateAdded
  }
}`;
const createPost = `mutation Mutation($text: String!, $image: String) {
  createPost(text: $text, image: $image) {
    id
    text
    user {
      id
      user_name
      email
      profilePicture
      bannerPicture
      bio
    }
    image
    dateAdded
  }
}`;
// issues still with this one
const updatePost = `mutation Mutation($updatePostId: ID!, $post: PostModify!) {
  updatePost(id: $updatePostId, post: $post) {
    id
    text
    user {
      id
      user_name
      email
      profilePicture
      bannerPicture
      bio
    }
    image
    dateAdded
  }
}`;
const deletePost = `mutation DeletePost($deletePostId: ID!) {
  deletePost(id: $deletePostId) {
    id
    text
    user {
      id
      user_name
      email
      profilePicture
      bannerPicture
      bio
    }
    image
    dateAdded
  }
}`;
const deletePostAsAdmin = `mutation DeletePost($deletePostAsAdminId: ID!) {
  deletePostAsAdmin(id: $deletePostAsAdminId) {
    id
    text
    user {
      id
      user_name
      email
      profilePicture
      bannerPicture
      bio
    }
    image
    dateAdded
  }
}`;
const updatePostAsAdmin = `mutation DeletePost($updatePostAsAdminId: ID!, $post: PostModify!) {
  updatePostAsAdmin(id: $updatePostAsAdminId, post: $post) {
    id
    user_name
    email
    profilePicture
    bannerPicture
    bio
  }
}`;
export {
  login,
  register,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  deleteUserAsAdmin,
  updateUserAsAdmin,
  checkToken,
  getAllPosts,
  postById,
  getPostsByUserId,
  createPost,
  updatePost,
  deletePost,
  deletePostAsAdmin,
  updatePostAsAdmin,
};
