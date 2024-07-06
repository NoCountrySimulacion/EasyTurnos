import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedRoutesProps {
	canActivate: boolean
	redirectPath?: string
}

export default function ProtectedRoutes({
	canActivate,
	redirectPath = '/login'
}: ProtectedRoutesProps): JSX.Element {
	if (!canActivate) {
		console.log('no puede entrar',canActivate)
		return <Navigate to={redirectPath} replace />
	}
	return <Outlet />  
}
