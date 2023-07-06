import './App.css';
import {useMutation, useQuery} from '@apollo/client';
import React from 'react';
import {
  ADD_POST,
  DELETE_POST,
  GET_ALBUMS,
  GET_COMMENTS,
  GET_PHOTO,
  GET_POST,
  GET_TODO,
  UPDATE_POST
} from "./query/AlbumsQuery";



function App() {

  const { loading:loading_comments, error:error_comments, data:data_comments } = useQuery(GET_COMMENTS);
  const { loading:loading_albums, error:error_albums, data:data_albums } = useQuery(GET_ALBUMS);
  const { loading:loading_photo, error:error_photo, data:data_photo} = useQuery(GET_PHOTO);
  const { loading:loading_post, error:error_post, data:data_post} = useQuery(GET_POST);
  const { loading:loading_todo, error:error_todo, data:data_todo} = useQuery(GET_TODO);

  const [addPOST,{loading:addPost_loading,error:addPost_error,data:addPost_data}] = useMutation(ADD_POST);
  const [updatePOST,{loading:updatePost_loading,error:updatePost_error,data:updatePost_data}] = useMutation(UPDATE_POST);
  const [deletePOST,{loading,error ,data}] = useMutation(DELETE_POST);



  const  submitData = ()=>{
    addPOST({
      variables:
          {
            createPost: {
              title: "add a new title",
              body: "add a new body"
            }
          }
    }).then(data=>console.log(data.data.createPost));

    updatePOST({
      variables:{
        id:3,
        updatePost:{
          title:"updated title",
          body:"updated body"
        }
      }
    }).then(data=>console.log(data.data.updatePost));

    deletePOST({
      variables:{
        id:5
      }
    }).then(data=>console.log(data.data.deletePost));



  }


  if (loading_comments) return <p>Loading_Comments...</p>;
  if (error_comments) return <p>Error_Comments :(</p>;
  if (loading_albums) return <p>Loading_albums...</p>;
  if (error_albums) return <p>Error_albums :(</p>;
  if (loading_photo) return <p>Loading_photo...</p>;
  if (error_photo) return <p>Error_photo :(</p>;
  if (loading_post) return <p>Loading_photo...</p>;
  if (error_photo) return <p>Error_photo :(</p>;
  // console.log(data_comments);
  // console.log(data_albums);
  // console.log(data_photo);
  // console.log(data_post);
  // console.log(data_todo);
  return (
    <div className="App">
      {
      <button onClick={submitData}>submit</button>
      }
    </div>
  );
}

export default App;
