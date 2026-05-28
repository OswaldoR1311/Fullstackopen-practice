const Notification = ({ message, status }) => {
  if (!message) {
    return null
  }

  return (
    <div
      className={`notification ${status === 'success' ? 'success' : 'error'}`}
    >
      {message}
    </div>
  )
}

export default Notification
