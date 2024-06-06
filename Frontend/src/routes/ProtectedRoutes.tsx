import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoutes({
	canActivate,
	redirectPath = '/login'
}: {
	canActivate: boolean
	redirectPath?: string
}): JSX.Element {
	if (!canActivate) {
		return <Navigate to={redirectPath} replace />
	}
	return <Outlet />
}
