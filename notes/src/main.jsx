// import ReactDom from 'react-dom/client'
// import { BrowserRouter as Router } from 'react-router-dom'
// import App from './App'
// import './index.css'

// ReactDom.createRoot(document.getElementById('root')).render(
// 	<Router>
// 		<App />
// 	</Router>,
// )

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'

import App from './App'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<App />
	</QueryClientProvider>,
)
