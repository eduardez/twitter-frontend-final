

import React, { useState } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import '../../styles.css';
import '../css/PostList.css'

import { AiFillHeart, AiOutlineRetweet } from 'react-icons/ai';
import { BsChat } from "react-icons/bs";

import { getDateInStrFormat } from "../../utils/utils.js";

export default function PostItem(props){
    const [corazones, setCor] = useState(props.post.corazon);
    const [isCorToggle, setCorToggle] = useState(false);
    const [isRtToggle, setRtToggle] = useState(false);
    const [retuits, setRt] = useState(props.post.retuit);

    const toggleClass = (elem_id) =>{
        var div_heart = document.getElementById(elem_id);
        div_heart.classList.toggle('activado');
        if(elem_id.includes('retuit')){
            if(!isRtToggle){
                setRt(parseInt(retuits)+1)
                setRtToggle(true)
            }else{
                setRt(parseInt(retuits)-1)
                setRtToggle(false)
            }
        }
        if(elem_id.includes('corazon')){
            if(!isCorToggle){
                setCor(parseInt(corazones)+1)
                setCorToggle(true)
            }else{
                setCor(parseInt(corazones)-1)
                setCorToggle(false)
            }
        }
    }
    
    return(
        <div>
            <Row>
            <Col>
                <Card>
                <CardBody>
                    <Row><Col><strong><img src={props.post.image} alt="Img"/> {props.post.user}</strong></Col></Row>
                    <Row>
                    <Col>
                        {props.post.message}
                    </Col>
                    </Row>
                    <Row>
                    <div className='fila_atributos'>
                        <div className='fila_numeros'>
                        <div className='elemento_atributo'>
                            <BsChat />
                        </div>

                        <div className='elemento_atributo retuit' id={'retuit_'+props.indice }  onClick={() => toggleClass(('retuit_'+props.indice))} >
                            <AiOutlineRetweet />
                            <small>{retuits}</small>
                        </div>
                        <div className='elemento_atributo corazon' id={'corazon_'+props.indice }  onClick={() => toggleClass(('corazon_'+props.indice))}>
                            <AiFillHeart />
                            <small>{corazones}</small>
                        </div>
                        </div>
                        <div className='fila_fecha'>
                        <small>{getDateInStrFormat(new Date(props.post.publicationdate))}</small>
                        </div>
                    </div>
                    </Row>
                </CardBody>
                </Card>
            </Col>
            </Row>
            <br/>
        </div>
        )
}