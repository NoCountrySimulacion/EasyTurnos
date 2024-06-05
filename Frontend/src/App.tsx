import AuthProvider from './auth/context/AuthProvider'
import AppRoutes from './routes/AppRoutes'
import 'leaflet/dist/leaflet.css'

export default function App(): JSX.Element {
	return (
		<AuthProvider>
			<AppRoutes />
		</AuthProvider>
	)
}
