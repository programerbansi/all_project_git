import React from "react";
import { gql } from '@apollo/client';

export const GET_ALBUMS = gql`
query {
  album(id: 1) {
    id
    title
    user {
      id
      name
    }
    photos {
      data {
        id
        title
        url
        thumbnailUrl
        album {
          id
          title
        }
      }
    }
  }
}     
`;

export const GET_COMMENTS_PAGE = gql`
query {
  comments {
    data {
      id
      name
      email
      post {
        title
        id
        comments {
          data {
            name
            email
            body
          }
        }
      }
    }
  }
}`;

export const GET_COMMENTS = gql`
query {
  comment(id: 1) {
    id
    name
    email
    body
    post {
      id
      title
      body
      user {
        id
        name
        username
        email
        phone
        website
        company {
          name
          catchPhrase
          bs
        }
      }
      comments {
        data {
          name
          email
          body
          post {
            user {
              name
              email
            }
          }
        }
      }
    }
  }
}
`;


export const GET_PHOTO = gql`
query {
  photos(options: { slice: { start: 0, end: 5 } }) {
    data {
      id
      title
      album {
        id
        title
        user {
          name
          email
        }
      }
    }
  }
}
`;

export const GET_POST = gql`
query {
  posts(
    options: {
      paginate: { page: 2, limit: 20 }
      sort: { order: ASC, field: "id" }
    }
  ) {
    data {
      id
      title
      user {
        name
        email
      }
    }
  }
}`;

export const GET_TODO = gql`
query {
  todos(options: { search: { q: "2" } }) {
    data {
      title
      id
    }
  }
}`;




export  const ADD_POST = gql`
mutation createPost($createPost : CreatePostInput!) {
    createPost(input: $createPost) {
        id
        title
        body
    }
}`;


export const UPDATE_POST = gql`
mutation updatePost($id:ID!,$updatePost :UpdatePostInput!) {
    updatePost(input: $updatePost,id:$id) {
        id
        title
        body
    }
}
`;


export const DELETE_POST = gql`
    mutation deletePost($id:ID!){
    deletePost(id:$id)

}`;
