import { useState } from 'react';
import React from 'react';

export default function Player( {initialName, symbol, isActive} ) {
  
  const [playerName , setPlayerName] = useState(initialName);
  const [isEditing , setIsEditing] = useState(false);

  let editablePlayerName = <span className='player-name'>{playerName}</span>
  let buttonCaption = isEditing ? 'Save' : 'Edit';

  function handleEditClick(){
    //* ->  setIsEditing(!isEditing);
    //mal codificado , no es recomendado porque se buggead la interfaz/frontend  
    //el estado que le doy a React no se  seteando modificando el propio estado que tengo en un momento
    // sino que se debe crear un nuevo estado forzando / usando una arrow function se fuerza a que crea 
    // un estado nuevo /una referencia en memoria nueva
    setIsEditing((isEditing) => !isEditing);
  }

  //función para cambiar el estado 
  function handleChange(e){
    setPlayerName(e.target.value);
  }

  if(isEditing){
    editablePlayerName = (
      <input type='text' required value={playerName} onChange={handleChange}/>
    );
  };
  
  return (
    <li className= {isActive ? 'active' : 'undefined'}>
      <span className='player'> 
        {editablePlayerName}
        <span className='player-symbol'>{symbol} </span>
      </span>
      <button onClick= {handleEditClick}>{buttonCaption}</button>
    </li>    
  );
}


/**
 * export default function Player({ initialName, symbol, isActive }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  // let btnCaption = 'Edit';

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    // btnCaption = 'Save';
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
 *
 */


