import {useState} from 'react'
import axios from 'axios'
import close from '../../../assets/images/close.svg'
import './AddItem.scss'

const AddItem = ({onAddTask}) => {
  const [popup, setPopup] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onClose = () => {
    setPopup(false)
    setInputValue('')
  }

  const showPopup = () => setPopup(!popup)
  const changeValue = e => setInputValue(e.target.value)

  const addItem = () => {
    if (!inputValue) {
      alert('Вы не можете добавить пустую задачу')
      return
    }
    setIsLoading(true)
    axios.post('http://localhost:3001/lists', {
      "name": inputValue
    }).then(({data}) => {
      onAddTask({...data})
      onClose()
      setIsLoading(false)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <>
      <div className='sidebar__btn' onClick={showPopup}>Добавить задачу</div>

      {popup &&
      <div className='popup'>
        <input className='popup__input' type='text' placeholder='Название задачи'
               onChange={changeValue} value={inputValue}/>
        <button className='popup__btn' onClick={addItem}>
          {isLoading ? 'Добавление...' : 'Добавить'}
        </button>
        <img className='popup__close' onClick={onClose} src={close} alt='Close pop-up'/>
      </div>}
    </>
  )
}

export default AddItem