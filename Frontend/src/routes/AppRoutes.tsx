import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../professional/pages/Home'
import Landing from '../landing/pages/Landing'
import LaoutLanding from '../layout/pages/LayoutLanding'
import Planes from '../landing/components/planos/Planes'
import ComoFunciona from '../landing/components/comoFunciona/ComoFunciona'
import Clientes from '../landing/components/clientes/Clientes'
import SignUpModal from '../auth/components/form/SingUpModal'
import LoginOptionsModal from '../auth/components/form/LoginOptionsModal'
import LoginModal from '../auth/components/form/LoginModal'
import Calendar from '../calendar/pages/Calendar'
import Clients from '../professional/pages/Clients'
import { AddClientForm } from '../professional/pages/AddClientForm'
import { UserViewInd } from '../professional/pages/UserViewInd'
import ProtectedRoutes from './ProtectedRoutes'
import { useAuth } from '../auth/hooks/useAuth'
import LayoutApp from '../layout/pages/LayoutApp'
import { HomeClient } from '../client/pages/Home'
import Professionals from '../client/pages/Professionals'
import { Appointments } from '../client/pages/Appointmets'
import { Profile } from '../layout/pages/Profile'
import { EditProfile } from '../professional/pages/EditProfile'
import { EditProfileClient } from '../professional/pages/EditProfileClient'
import { DataClient } from '../professional/components/DataClient'

export default function AppRoutes() {
	const { isUserSignedIn, decodedToken } = useAuth()
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<LaoutLanding />}>
					<Route
						path='/'
						element={
							isUserSignedIn() ? <Navigate to='/home' replace /> : <Landing />
						}
					/>
					<Route path='/comofunciona' element={<ComoFunciona />} />
					<Route path='/planes' element={<Planes />} />
					<Route path='/clientes' element={<Clientes />} />
					<Route path='/login' element={<LoginModal />} />
					<Route path='/loginOptions' element={<LoginOptionsModal />} />
					<Route path='/register' element={<SignUpModal />} />
				</Route>
				<Route element={<ProtectedRoutes canActivate={isUserSignedIn()} />}>
					<Route element={<LayoutApp />}>
						{decodedToken?.role === 'Professional' ? (
							<>
								<Route path='/home' element={<Home />} />
								<Route path='/professional/calendar' element={<Calendar />} />
								<Route path='/professional/clients' element={<Clients />} />
								<Route path='/professional/clients-views' element={<UserViewInd />} />
								<Route
									path='/professional/add-client'
									element={<AddClientForm />}
								/>
								<Route
									path='/professional/edit-profile-prof'
									element={<EditProfile />}
								/>
								<Route path='/profile' element={<Profile />} />
								<Route path='/professional/data-client/:clientId' element={<DataClient />} />
								<Route path='/professional/edit-profile-client' element={<EditProfileClient />} />
							</>
						) : (
							<>
								<Route path='/home' element={<HomeClient />} />
								<Route path='/professionals' element={<Professionals />} />
								<Route path='/my-appointments' element={<Appointments />} />
								<Route path='/calendar' element={<Calendar />} />
								<Route path='/profile' element={<Profile />} />

							</>
						)}
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
