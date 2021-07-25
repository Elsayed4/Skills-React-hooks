import './App.css';
import React, { useState,useEffect } from 'react';
import List from './List';
import Alert from './Alert';


const gitLocal = () =>{
  let list = localStorage.getItem('list');
  if(list)
  return JSON.parse(localStorage.getItem('list'))
  else return [];
}

function App() {
  const [name ,setname] = useState('');
  const [list ,setlist] = useState(gitLocal);
  const [isEditing ,setisEditing] = useState(false);
  const [editId ,seteditId] = useState(null);
  const [alert ,setalert] = useState({show:false,
    msg:'',type:''});
  
  const handleSubmit = (e) => {
   e.preventDefault();

  if(!name){
    showAlert(true,"danger","Please Enter A value")
}

  else if(name && isEditing){
  setlist(
    list.map((item) => {
      if(item.id == editId){
        return {...item,title:name}
      }else{
        return item;
      }
    })
  )
  seteditId(null);
  setisEditing(false);
  setname('');
  }

 else{
  showAlert(true,"success","new item added")
  const newItem = {id: new Date().getTime().toString() ,title:name}
 setlist([...list,newItem]);
 setname('');
  }
}

const showAlert =(show=false,type='',msg='')=>{
 setalert({show,type,msg});
}

const clearList = () =>{
  showAlert(true,"danger","List Is Empty")
  setlist([]);
}

const removeItem = (id) =>{
  showAlert(true,"danger","item removed");
  setlist(list.filter((item) => item.id !== id));
}

const editItem = (id) =>{
  const spesficItem = list.find((item) => item.id === id);
  setisEditing(true);
  seteditId(id);
  setname(spesficItem.title);
}

useEffect(()=>{
  localStorage.setItem('list',JSON.stringify(list));
},[list])

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
         {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
         <h3>Skills</h3>
         <div className="form-control">
           <input type="text" className="grocery" placeholder="e.g eggs" value={name}
           onChange={(e)=> setname(e.target.value)}/>
           <button type="submit" className="submit-btn">
             {isEditing ? "edit" : "submit"}
           </button>
         </div>
      </form>
     {
       list.length > 0 &&       <div className="grocery-container">
       <List items={list} removeItem = {removeItem} editItem={editItem}/>
       <button className="clear-btn" onClick={clearList}>
         clear item
       </button>
     </div>
     }      
    </section>
  );
}
export default App;