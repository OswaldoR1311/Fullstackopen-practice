import { Alert } from '@mui/material'

const Notification = ({ notification }) => {
	return (
		<Alert style={{ marginTop: 10, marginBottom: 10 }}>
			{notification.text}
		</Alert>
	)
}

export default Notification
