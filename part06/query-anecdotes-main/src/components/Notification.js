import { useContext } from 'react'
import NotifContext from '../NotifContext'

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotifContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notification === '') return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
