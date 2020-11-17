import {useState} from 'react'
import axios from 'axios'
import plus from '../../assets/images/plus.svg'
import './Tasks.scss'

const AddTaskForm = ({list, addNewTask}) => {
  const [visibleForm, setVisibleForm] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm)
    setInputValue('')
  }

  const addTask = () => {
    const obj = {
      "listId": list.id,
      "text": inputValue,
      "completed": false
    }
    setIsLoading(true)
    axios.post('http://localhost:3001/tasks', obj).then(({data}) => {
      addNewTask(list.id, data)
      toggleFormVisible()
    }).catch(() => {
      alert('Ошибка при добавлении задачи')
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <div className='tasks__form'>
      {!visibleForm ?
        <div className="tasks__form-new" onClick={toggleFormVisible}>
          <img className='tasks__form-image' src={plus} alt=""/>
          <span className='tasks__form-text'>Новая задача</span>
        </div>
        :
        <form className='form'>
          <div className="form__btn-wrapper">
            <button className='form__btn form__btn-add' onClick={addTask} type='button'>
              {isLoading ? 'Добавление...' : 'Добавить задачу'}
            </button>
            <button className='form__btn form__btn-del' onClick={toggleFormVisible} type='button'>Отмена</button>
          </div>
          <input className='form__text' type='text' onChange={e => setInputValue(e.target.value)}
                 placeholder='Текст задачи' value={inputValue}/>
        </form>
      }
    </div>
  )
}

export default AddTaskForm