import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Modal, ModalHeader, ModalBody, Button,Input } from 'reactstrap';
const Tasks = (props) => {
    // const [initialData,setInitialData] = useState(props.initialData)
    const [modalDel, setModalDel] = useState(false);
    const toggle = () => {
        setModalDel(!modalDel);
    }
    const [editTaskValue,setEditTaskValue] = useState('')
    const onEditTaskValue = (e) => setEditTaskValue(e.target.value)
    return (
        <>
            <Draggable draggableId={props.task.id.toString()} index={props.index}>
                {(provided, snapshot) => (
                    <div className="form"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}>
                        <div style={{ border: '1px solid lightgrey', padding: '8px', margin: '12px', borderRadius: '5px', backgroundColor: `${snapshot.isDragging ? 'lightgreen' : '#282c34'}`, transition: 'background-color 0.2s ease' }}>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-8'>
                                        <p>{props.task.content}</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <button className='btn btn-warning' onClick = {props.editToggleTask}><i className="fa fa-edit"></i></button>
                                        <button onClick={toggle} className='btn btn-danger'><i className='fa fa-trash'></i></button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )}

            </Draggable>
            <Modal isOpen={modalDel} toggle={toggle}>
                <ModalHeader>Do you want to delete this task?</ModalHeader>
                <ModalBody className='d-flex justify-content-end'>
                    <Button style={{ width: '90px' }} onClick={() => props.deleteTask(props.task.id, props.columnId)} color='danger'>Yes</Button>
                    <Button style={{ marginLeft: '10px', width: '90px' }} color='warning' onClick={toggle}>No</Button>
                </ModalBody>
            </Modal>

            <Modal isOpen={props.editTask} toggle={props.editToggleTask}>
                <ModalHeader>Give this task a different task name..</ModalHeader>
                <ModalBody className='d-flex justify-content-end'>
                    <Input onChange={onEditTaskValue}></Input>
                    <div className='addUser'>
                        <Button style={{ width: '90px', marginLeft: '10px' }}
                         onClick={() => props.editTaskFunc(props.task.id.toString(),editTaskValue)} color='danger'>Save</Button>
                        <Button style={{ marginLeft: '10px', width: '90px' }} color='warning' 
                        onClick={props.editToggleTask}>Cancel</Button></div>
                </ModalBody>
            </Modal>

        </>
    );
}

export default Tasks;