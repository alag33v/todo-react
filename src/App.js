import {useState, useEffect} from 'react'
import axios from 'axios'
import Sidebar from './components/Sidebar/Sidebar'
import Tasks from './components/Tasks/Tasks'
import './index.scss'
import {Route} from 'react-router-dom'

function App() {
  const [lists, setList] = useState(null)
  const [activeItem, setActiveItem] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_embed=tasks').then(({data}) => {
      setList(data)
    })
  }, [])

  const onAddTask = obj => {
    const addNewTask = [...lists, obj]
    setList(addNewTask)
  }

  const addNewTask = (listId, taskObj) => {
    const newTask = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj]
      }
      return item
    })
    setList(newTask)
  }

  const onEditTitle = (id, title) => {
    const newTitle = lists.map(item => {
      if (item.id === id) {
        item.name = title
      }
      return item
    })
    setList(newTitle)
  }

  const onRemove = (id) => {
    const newList = lists.filter(item => item.id !== id)
    setList(newList)
  }

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm('Вы действительно хотите удалить задачу')) {
      lists.map(item => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter(task => task.id !== taskId)
        }
        return item
      })
      setList(addNewTask)
      axios.delete('http://localhost:3001/tasks/' + taskId).catch(() => {
        alert('Не удалось задачу')
      })
    }
  }

  return (
    <div className='container'>
      <div className='todo'>
        {lists && <Sidebar lists={lists} onAddTask={onAddTask} onRemove={onRemove} activeItem={activeItem}
                           setActiveItem={setActiveItem}/>}
        <div className="todo__wrapper">
          <Route exact path='/'>
            {lists && lists.map(list => (
              <Tasks list={list} addNewTask={addNewTask} onEditTitle={onEditTitle}
                     onRemoveTask={onRemoveTask} key={list.id}/>
            ))}
          </Route>
        </div>
        <Route path='/lists/:id'>
          {lists && activeItem &&
          <Tasks list={activeItem} addNewTask={addNewTask} onEditTitle={onEditTitle}
                 onRemoveTask={onRemoveTask}/>}
        </Route>
      </div>
    </div>
  );
}

export default App