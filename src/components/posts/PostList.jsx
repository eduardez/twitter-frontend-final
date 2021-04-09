import React, { useState, useEffect } from 'react';
import { CardTitle, Badge, Table, Alert } from 'reactstrap';
import '../../styles.css';
import '../css/PostList.css'
import PostItem from './PostItem'

import { getAllPosts } from "../../utils/apicalls.js";

export default function PostList(props){

  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    getAllPosts().then((posts) => {
      setPosts(posts);
    });
  }

  const toggleClass = (elem_id, new_class) =>{
    var div_heart = document.getElementById(elem_id);
    div_heart.classList.toggle('activado');
  }
  
  useEffect(() =>{
    getPosts();
  },[]);

  return (
    <div>
    <CardTitle tag="center"><Alert color="primary"><strong>Posts publicados </strong><Badge pill>{posts.length}</Badge></Alert></CardTitle>
    <Table>
      <tbody>
        { posts.map((post, index) => {
          return <PostItem post={post} indice={index}/>
          })}
        </tbody>
      </Table>
    </div>
    );
}