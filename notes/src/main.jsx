import ReactDom from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDom.createRoot(document.getElementById('root')).render(
	<Router>
		<App />
	</Router>,
)
