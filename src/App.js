import React, {Component, useState} from 'react';
import './App.css';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";

const item = {
  id: v4(),
  name: "Clean the house"
}

const item2 = {
  id: v4(),
  name: "make notes"
}

const item1 = {
  id: v4(),
  name: "study 3 hrs"
}
const item3 = {
  id: v4(),
  name: "do exercise"
}


function App() {
  const [text, setText] = useState("")
  const [state, setState] = useState({
    "todo": {
      title: "Todo",
      items: [item, item2]
    },
    "in-progress": {
      title: "In Progress",
      items: [item1]
    },
    "done": {
      title: "Completed",
      items: [item3]
    }
  })

  const handleDragEnd = ({destination, source}) => {
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    // Creating a copy of item before removing it from state
    const itemCopy = {...state[source.droppableId].items[source.index]}

    setState(prev => {
      prev = {...prev}
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1)


      // Adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
    })
  }

  const addItem = () => {
    setState(prev => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [
            {
              id: v4(),
              name: text
            },
            ...prev.todo.items
          ]
        }
      }
    })

    setText("")
  }

  return (
    <div className="App">
      <div>
        <input type="text" value= "Description:clean the house."onChange={(e) => setText(e.target.value)}/>
        <input type="text" value="status: todo" onChange={(e) => setText(e.target.value)}/>
        <input type="text" value="time:16:00" onChange={(e) => setText(e.target.value)}/>
        <input type="text" value= "Description:study 3 hrs."onChange={(e) => setText(e.target.value)}/>
        <input type="text" value="status: in progress" onChange={(e) => setText(e.target.value)}/>
        <input type="text" value="time:13:00" onChange={(e) => setText(e.target.value)}/>
        <input type="text" value= "Description:do exercise."onChange={(e) => setText(e.target.value)}/>
        <input type="text" value="status: completed" onChange={(e) => setText(e.target.value)}/>
        <input type="text" value="time:09:00" onChange={(e) => setText(e.target.value)}/>
        <input type="text" value= "Description:make notes."onChange={(e) => setText(e.target.value)}/>
        <input type="text" value="status: todo" onChange={(e) => setText(e.target.value)}/>
        <input type="text" value="time:16:00" onChange={(e) => setText(e.target.value)}/>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        <button onClick={addItem}>Add</button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return(
            <div key={key} className={"column"}>
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    >
                      {data.items.map((el, index) => {
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided, snapshot) => {
                              console.log(snapshot)
                              return(
                                <div
                                  className={`item ${snapshot.isDragging && "dragging"}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {el.name}
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  )
 
}

 


export default App;
