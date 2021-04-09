import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import '../../styles.css';
import '../css/MyPostList.css'
import PostItem from './PostItem'

import { Row, Col, CardTitle, Badge,
Table, Alert, Button, Nav, NavItem, NavLink, TabContent,
TabPane, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import { getMyPosts, deletePost } from "../../utils/apicalls.js";

import AddPost from './AddPost';
import EditPost from './EditPost';

export default function MyPostList(props){

  const [posts, setPosts] = useState([]);
  const [edit, setEdit] = useState(<Alert color="warning">Seleccione editar un post de la lista</Alert>);
  const [activeTab, setActiveTab] = useState('1');
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const getPosts = () => {
      getMyPosts(sessionStorage.getItem('email')).then((posts) => {
          setPosts(posts);
      });
  }

  const toggleTab = (tab) => {
    if (activeTab !== tab)
      setActiveTab(tab);
  }

  const handleUpdateMyPosts = () => {
    getPosts();
  }

  const askForDelete = (post) => {
    setShowDeleteModal(
      <Modal isOpen="true" className={props.className}>
        <ModalHeader>Eliminar post</ModalHeader>
        <ModalBody>
          Se va a eliminar el post:<br/><small><strong>{post.message}</strong></small>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => deletePostSel(post)}>Eliminar</Button>{' '}
          <Button color="secondary" onClick={() => setShowDeleteModal(null)}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    );
  }

  const deletePostSel = (post) => {
    deletePost(post._id)
      .then((res) => checkDELETEPost(res));
  }

  const checkDELETEPost = (res) => {
    if (res === "OK"){
      setShowDeleteModal(null);
      setEdit(<Alert color="warning">Seleccione editar un post de la lista</Alert>);
      handleUpdateMyPosts();
    }
  }

  const handleShowEdit = (post) => {
    setActiveTab("2")
    setEdit(<EditPost post= {post} updateMyPosts = {handleUpdateMyPosts} />);
  }

  useEffect(() =>{
    getPosts();
  },[]);

  return(
    <div>
      {showDeleteModal}
      <Row>
        <Col xs="7">
          <CardTitle tag="center"><Alert color="primary"><strong>Mis Posts publicados </strong><Badge pill>{posts.length}</Badge></Alert></CardTitle>
          <Table>
            <tbody>
            { posts.map((post, index) => {
              return (
                <div className='edit_card_body'>
                  <div className='edit_buttons'>
                    <Button outline onClick={() => handleShowEdit(post)}><AiFillEdit /></Button>
                    {' '}
                    <Button outline onClick={() => askForDelete(post)}><AiFillDelete /></Button>
                  </div>
                  <PostItem post={post} indice={index}/>
                </div>
              )
            })}
            </tbody>
          </Table>
        </Col>
        <Col xs="5">
          <Nav tabs>
            <NavItem>
              <NavLink href="#" className={classnames({ active: activeTab === '1' })} onClick={() => toggleTab('1')}>
                Añadir
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" className={classnames({ active: activeTab === '2' })} onClick={() => toggleTab('2')}>
                Editar
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <AddPost updateMyPosts = {handleUpdateMyPosts}/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  {edit}
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </div>
  );
}