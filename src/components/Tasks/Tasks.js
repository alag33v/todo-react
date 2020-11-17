import axios from 'axios'
import AddTaskForm from './AddTaskForm'
import pen from '../../assets/images/pen.svg'
import check from '../../assets/images/check.svg'
import remove from '../../assets/images/close.svg'
import './Tasks.scss'

const Tasks = ({list, onEditTitle, addNewTask, onRemoveTask}) => {
  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name)
    if (newTitle) {
      onEditTitle(list.id, newTitle)
      axios.patch('http://localhost:3001/lists/' + list.id, {
        name: newTitle
      }).catch(() => {
        alert('Не удалось обновить название списка')
      })
    }
  }

  return (
    <div className='todo__tasks'>
      <div className='tasks'>
        <div className='tasks__title-wrapper'>
          <h2 className='tasks__title'>{list.name}</h2>
          <img className='tasks__title-img' onClick={editTitle} src={pen} alt="Pen"/>
        </div>
        <div className='tasks__items'>
          {!list.tasks.length && <h2 className='tasks__title-empty'>Задачи отсутсвутют</h2>}
          {list.tasks.map(task => {
            return (
              <div className='tasks__item' key={task.id}>
                <div className='checkbox'>
                  <input className='checkbox__input' type='checkbox' id={`task-${task.id}`}/>
                  <label className='checkbox__label' htmlFor={`task-${task.id}`}>
                    <img className='checkbox__image' src={check} alt='Check'/>
                  </label>
                </div>
                <div className='tasks__item-wrapper'>
                  <p className='tasks__item-text'>{task.text}</p>
                  <button className='tasks__item-btn' onClick={() => onRemoveTask(list.id, task.id)}>
                    <img className='tasks__item-image' src={remove} alt=""/>
                  </button>
                </div>
              </div>
            )
          })}
          <AddTaskForm list={list} addNewTask={addNewTask}/>
        </div>
      </div>
    </div>
  )
}

export default Tasks