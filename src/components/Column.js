import React, { useState } from 'react'
import Tasks from './Tasks';
import { Droppable } from 'react-beautiful-dnd'
import { Modal, ModalHeader, ModalBody, Input, Button } from 'reactstrap';
const Column = (props) => {


    const [modalDel, setModalDel] = useState(false); // Delete Column Modal

    
    const toggle = () => setModalDel(!modalDel); // toggle for del column Modal
    
    const [editColumnValue,setEditColumnValue] = useState('')
    const onEditColumnValue = (e) => setEditColumnValue(e.target.value)

    return (

        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '400px', width: '245px' }}>
            <div className='row'>
                <code style={{ color: 'yellow', marginBottom: '2px' }} className='col-md-10 d-flex justify-content-center'><b>{(props.columns.title).toUpperCase()}</b></code><i onClick={props.editToggle} className="fa fa-edit"></i></div>
            <Droppable droppableId={props.columns.id}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}
                        style={{
                            backgroundColor: snapshot.isDraggingOver ? 'rgb(8, 36, 22)' : '#282c34',
                            border: '3px solid white', borderRadius: '20px', transition: 'background-color 0.5s ease',
                            flexGrow: '1'
                        }}>
                        <i onClick={toggle} style={{ marginRight: '8px' }} className='fa fa-times d-flex justify-content-end'></i>
                        {props.taskNew.map((task, index) => {
                            return (
                                <div>
                                    <Tasks editTaskFunc ={props.editTaskFunc} editTask={props.editTask} 
                                    editToggleTask = {props.editToggleTask} deleteTask={props.deleteTask} 
                                    initialData={props.initialData} key={task.id.toString()} 
                                    task={task} index={index} columnId={props.columns.id} />
                                </div>
                            )
                        })}
                        {provided.placeholder}
                        <button onClick={() => props.taskToggle(props.columns.id)} style={{
                            border: '1px solid gold', borderRadius: '20px',
                            marginTop: '5px', marginBottom: '10px', width: '100%'
                        }} className='btn btn-dark'>Add task</button>
                    </div>
                )}

            </Droppable>

            <Modal isOpen={props.taskModal} toggle={props.taskToggle}>
                <ModalHeader>Enter Task</ModalHeader>
                <ModalBody>
                    <Input onChange={props.onValueEntered}></Input>
                    <div className='addUser'>
                        <Button id='saveTask' className='btn btn-warning' onClick={props.saveDetails}>Save</Button>
                    </div>
                </ModalBody>
            </Modal>

            <Modal isOpen={modalDel} toggle={toggle}>
                <ModalHeader>Do you want to delete this column?</ModalHeader>
                <ModalBody className='d-flex justify-content-end'>
                    <div>
                        <Button style={{ width: '90px' }} onClick={() => props.deleteColumn(props.columns.id)} color='danger'>Yes</Button>
                        <Button style={{ marginLeft: '10px', width: '90px' }} color='warning' onClick={toggle}>No</Button></div>
                </ModalBody>
            </Modal>

            <Modal isOpen={props.editModal} toggle={props.editToggle}>
                <ModalHeader>Give this column a different username..</ModalHeader>
                <ModalBody className='d-flex justify-content-end'>
                    <Input onChange={onEditColumnValue}></Input>
                    <div className='addUser'>
                        <Button style={{ width: '90px', marginLeft: '10px' }}
                         onClick={() => props.editColumn(props.columns.id,editColumnValue)} color='danger'>Save</Button>
                        <Button style={{ marginLeft: '10px', width: '90px' }} color='warning' 
                        onClick={props.editToggle}>Cancel</Button></div>
                </ModalBody>
            </Modal>
        </div>

    );
}

export default Column;