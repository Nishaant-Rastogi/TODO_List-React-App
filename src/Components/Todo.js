import React, {useState, useEffect} from 'react'
import { FcTodoList } from "react-icons/fc";
import './style.css'
const Todo = () => {
    const getLocalStorage = ()=>{
        const lists = localStorage.getItem("my-todo-list");
        if(lists){
            return JSON.parse(lists);
        }else{
            return [];
        }
    }
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalStorage());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false)
    const addItem = ()=>{
        if(!inputData){
            alert("Empty List");
        }else if(inputData && toggleButton){
            setItems(
                items.map((currElement)=>{
                    if(currElement.id === isEditItem){
                        return {...currElement,name:inputData}
                    }
                    return currElement;
                })
            );
            setInputData([]);
            setIsEditItem(null);
            setToggleButton(false);
        }else{
            const newInputData = {
                id:new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, newInputData]);
            setInputData("");
        }
    }
    const deleteItem = (id)=>{
        const updatedItems = items.filter((currElement) =>{
            return currElement.id !== id;
        })
        setItems(updatedItems);
    }
    const removeAll = ()=>{
        setItems([]);
    }
    const editItem = (id)=>{
        const item_todo_edited = items.find((currElement) => {
            return currElement.id === id;
        });
        setInputData(item_todo_edited.name);
        setIsEditItem(id);
        setToggleButton(true);
    }
    useEffect(() => {
        localStorage.setItem("my-todo-list",JSON.stringify(items))
    }, [items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <FcTodoList className="todo-icon" />
                        <figcaption>Add Your List Here</figcaption>
                    </figure>
                    <div className="addItems">
                        <input className="form-control" type="text" placeholder="Add Items" value={inputData} onChange={(e)=>{
                            setInputData(e.target.value);
                        }}/>
                        {toggleButton ? <i className="far fa-edit add-btn" onClick={addItem}></i>
                                        :
                                        <i className="fa fa-plus add-btn" onClick={addItem}></i>}
                        
                    </div>

                    <div className="showItems">
                        {items.map((currElement, index) => {
                            return(<div className="eachItem" key={index}>
                            <h3>{currElement.name}</h3>
                            <div className="todo-btn">
                            <i className="far fa-edit add-btn" onClick={()=>{
                                editItem(currElement.id);
                            }}></i>
                            <i className="far fa-trash-alt add-btn" onClick={()=>{
                                deleteItem(currElement.id);
                            }}></i>
                            </div>
                        </div>);
                        })}
                    </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="REMOVE ALL" onClick={removeAll}>
                            <span>CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
