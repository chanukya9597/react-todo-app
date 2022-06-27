import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import './ToDoList.css';

export default function ToDoList() {
    const [item, setItem] = useState("");
	const [newItem, setNewItem] = useState([]);
    const handleInputChange = (event) => {
        setItem(event.target.value);
    }
    const handleAddItem = () => {
        let currentItem = {itemName:item,status:'active'}
        setNewItem((prev)=>{
			return [...prev, currentItem]
		});
		
		setItem("");
    }
    const handleResetItems = () => {
        setNewItem([]);
    }
    const closeTask = (val,index) => {
        const allItems = newItem;
        const activeItems = allItems.filter(item=>item.itemName!==val.itemName);
        activeItems.push({itemName:val.itemName,status:'deleted'});
        setNewItem(activeItems);
    }
    return (
        <div>
            <div className="childOne">
                <input type="text" value={item} placeholder="Add a task" onChange={(e)=>handleInputChange(e)} onKeyDown={(e)=>{
                    if (e.key === 'Enter') {
                        handleAddItem();
                    }
                }}/>
                <ul className="textFont">
                    {
                        newItem.map((val,index) => {
                            return <li onClick={()=>closeTask(val,index)} style={{backgroundColor:val.status==='active'?'green':'red'}}> {val.itemName} </li>;
                        })
                    }
                </ul>
            </div>
            <div className="childTwo">
                <Button className="delBtn" onClick={(e)=>handleResetItems()}>
                    Reset
                </Button>
            </div>
        </div>
    );
}
