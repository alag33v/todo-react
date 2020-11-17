import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import AddItem from './AddItem/AddItem'
import classNames from 'classnames'
import remove from '../../assets/images/close.svg'
import './Sidebar.scss'

const Sidebar = ({lists, onAddTask, onRemove, activeItem, setActiveItem}) => {
  const history = useHistory()

  useEffect(() => {
    const listId = history.location.pathname.split('lists/')[1]
    if (lists) {
      const list = lists.find(list => list.id === Number(listId))
      setActiveItem(list)
    }
  })

  const onClickTitle = () => {
    setActiveItem()
    history.push(`/`)
  }

  const onClickItem = (item) => {
    setActiveItem(item)
    history.push(`/lists/${item.id}`)
  }

  const removeList = (item) => {
    if (window.confirm('Вы действительно хотите удалить задачу?')) {
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item.id)
      })
    }
  }

  return (
    <div className='todo__sidebar'>
      <h3 className='todo__sidebar-title' onClick={onClickTitle}>Все задачи</h3>
      <ul className='todo__sidebar-list'>
        {lists.map(item => {
          return (
            <li className={classNames('todo__sidebar-item', {active: activeItem && activeItem.id === item.id})}
                onClick={() => onClickItem(item)} key={item.id}>
              <span className='todo__sidebar-text'>{item.name}{item.tasks && ` (${item.tasks.length})`}</span>
              <img className='todo__sidebar-remove' onClick={() => removeList(item)} src={remove} alt='Remove task'/>
            </li>
          )
        })}
      </ul>
      <AddItem onAddTask={onAddTask}/>
    </div>
  )
}

export default Sidebar