import AuthProvider from './auth/context/AuthProvider'
import { SearchProvider } from './layout/context/searchProvider'
import AppRoutes from './routes/AppRoutes'
import 'leaflet/dist/leaflet.css'

export default function App(): JSX.Element {
	return (
		<AuthProvider>
			<SearchProvider>
				<AppRoutes />
			</SearchProvider>
		</AuthProvider>
	)
}
