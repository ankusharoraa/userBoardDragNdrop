import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, Input, Button } from 'reactstrap';
import Column from "./Column";
import { DragDropContext } from 'react-beautiful-dnd';
const MainComponent = () => {
    const [editModal, setEditModal] = useState(false)
    const editToggle = () =>setEditModal(!editModal)
    const [editTask, setEditTask] = useState(false)
    const editToggleTask = () =>setEditTask(!editTask)
    const [modal, setModal] = useState(false);
    const [taskModal, setTaskModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [boxClicked, setBoxClicked] = useState()
    const taskToggle = (title) => {
        setBoxClicked(title)
        setTaskModal(!taskModal);
    }
    const [userNames, setUserNames] = useState()
    const [enteredValue, setEnteredValue] = useState([])
    const [task, setTasks] = useState([])
    const [multiple, setMultiple] = useState([])
    const [columns, setColumns] = useState({})
    // const [taskObject, setTaskObject] = useState({})
    const [initialData, setInitialData] = useState(
        {
            tasks: {
            },
            coloumns: {
            },
            columnOrder: []
        }
    )
    //Edit Task logic
    const editTaskFunc = (taskId,editedValue)=>{
        let newInitialData = { ...initialData }
        newInitialData.tasks[taskId].content = editedValue
        setInitialData(newInitialData)
        setEditTask(false)
    }
    //Edit Column logic
    const editColumn = (columniD,editedValue) => {
        let newInitialData = { ...initialData }
        newInitialData.coloumns[columniD].title = editedValue
        setInitialData(newInitialData)
        setEditModal(false)
    }
    // Delete coloumn logic
    const deleteColumn = (columnTitle) => {
        let newInitialData = { ...initialData }
        let indexOfId = newInitialData.columnOrder.indexOf(columnTitle);
        let getIndexForState = multiple.indexOf(columnTitle);
        multiple.splice(getIndexForState, 1)
        let newTasks = newInitialData.coloumns[columnTitle].taskIds.map(id => id.toString())
        for (let i = 0; i < newTasks.length; i++) {
            delete newInitialData.tasks[newTasks[i]] //delete the tasks object
        }
        let newColVal = { ...columns }
        delete newColVal[columnTitle]
        setColumns(newColVal)
        newInitialData.columnOrder.splice(indexOfId, 1)
        delete newInitialData.coloumns[columnTitle]
        setInitialData(newInitialData)
    }
    // Delete task logic
    const deleteTask = (id, columnTitle) => {
        let newInitialData = { ...initialData }
        let indexOfId = newInitialData.coloumns[columnTitle].taskIds.indexOf(id.toString());
        delete newInitialData.tasks[id];
        newInitialData.coloumns[columnTitle].taskIds.splice(indexOfId, 1)
        setInitialData(newInitialData)

    }
    const onDragStart = () => {
        document.body.style.transition = 'background-color 0.2s ease'
    }
    const onDragEnd = result => {
        const { destination, source, draggableId } = result;
        // console.table(destination)
        // console.table(source)
        // console.table(draggableId)
        const start = initialData.coloumns[source.droppableId];
        let finish
        if (destination !== null) {
            finish = initialData.coloumns[destination.droppableId];
        }
        // console.log(start.id)
        // console.log(finish)
        if (destination && destination.index !== source.index && start.id === finish.id) {
            const column = initialData.coloumns[source.droppableId]
            const newTaskIds = column.taskIds.map(task => task)
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
            let newInitialData = { ...initialData }
            newInitialData.coloumns[`${destination.droppableId}`].taskIds = newTaskIds
            setInitialData(newInitialData)
        }
        else if (destination && start.id !== finish.id) {
            const startTaskIds = start.taskIds.map(task => task);
            const finishtaskIds = finish.taskIds.map(task => task);
            startTaskIds.splice(source.index, 1);
            finishtaskIds.splice(destination.index, 0, draggableId)
            let newInitialData = { ...initialData }
            newInitialData.coloumns[`${start.id}`].taskIds = startTaskIds
            newInitialData.coloumns[`${finish.id}`].taskIds = finishtaskIds
            console.log(newInitialData)
            setInitialData(newInitialData)
        }


    }
    const onValueEntered = (e) => {
        if (e.target.id === 'userInput') {
            if (e.target.value !== '') {
                setUserNames(e.target.value)
            }
        }
        else
        {
            setEnteredValue(e.target.value)}
    }
    const saveDetails = (e) => {
        let randomNo = Math.floor(Math.random() * 100000 + 1)
        if (e.target.id === 'saveUser') {

            if (multiple.length === 0) {
                setMultiple([userNames + randomNo])
                let newCol = {
                    [userNames + randomNo]: {
                        id: userNames + randomNo,
                        title: userNames,
                        taskIds: []
                    }
                }
                setColumns(newCol)
            }
            else {

                setMultiple(multiple.concat(userNames + randomNo))
                let newCol = {
                    [userNames + randomNo]: {
                        id: userNames + randomNo,
                        title: userNames,
                        taskIds: []
                    }
                }
                let initialCol = { ...columns }
                Object.assign(initialCol, newCol)
                setColumns(initialCol)
            }

            setModal(false);
            setUserNames([])
        }
        else if (e.target.id === 'saveTask') {
            setTasks([enteredValue])
            setTaskModal(false);

        }
    }

    useEffect(() => {
        let newInitialData = { ...initialData }
        newInitialData.coloumns = columns
        newInitialData.columnOrder = [...multiple]
        setInitialData(newInitialData)
        // eslint-disable-next-line
    }, [multiple])

    useEffect(() => {

        if (task.length >= 1) {
            let newInitialData = { ...initialData }
            let randomNo = Math.floor(Math.random() * 100000 + 1)
            newInitialData.coloumns[boxClicked].taskIds.push(randomNo.toString())
            let newTask = {
                [randomNo]: {
                    id: randomNo,
                    content: enteredValue
                }
            }
            // let manyTasks = { ...taskObject }
            // Object.assign(manyTasks, newTask)

            Object.assign(newInitialData.tasks, newTask)
            setInitialData(newInitialData)
        }

        // eslint-disable-next-line
    }, [task])

    useEffect(() => {
        if (modal) {
            document.getElementById("userInput").focus()
        }
    }, [modal])

    useEffect(() => {
        if (taskModal === true) {
            document.getElementById("taskInput").focus()
        }
    }, [taskModal])

    useEffect(() => {
        console.log(columns)
        // eslint-disable-next-line
    }, [initialData])

    return (
        <>
            <div className='container addUser' onClick={toggle}>
                <button className='btn btn-primary'>Add User</button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader>Enter Username</ModalHeader>
                    <ModalBody>
                        <Input id='userInput' onChange={onValueEntered} value={userNames}></Input>
                        <div className='addUser'>
                            <Button id='saveUser' className='btn btn-warning' onClick={saveDetails}>Save</Button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>

            <div className='row'>
                <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    {initialData.columnOrder.map((columnId) => {
                        const columnsNew = initialData.coloumns[columnId];
                        const tasksNew = columnsNew.taskIds.map(
                            (task) => initialData.tasks[task]
                        );
                        return (
                            <div className='col-sm-2 col-7'>
                                <Column key={columnId.id} editTaskFunc = {editTaskFunc} editTask={editTask} editToggleTask = {editToggleTask} editToggle = {editToggle} editColumn={editColumn} editModal = {editModal} deleteColumn={deleteColumn} deleteTask={deleteTask} taskToggle={taskToggle} taskModal={taskModal} taskNew={tasksNew} saveDetails={saveDetails} onValueEntered={(e) => onValueEntered(e)} columns={columnsNew} initialData={initialData} />
                            </div>
                        )
                    }
                    )}
                </DragDropContext>
            </div>
        </>
    )
}
export default MainComponent;