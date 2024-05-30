import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../layout/pages/Home'
import Landing from '../landing/pages/Landing'
import Laout from '../layout/pages/Laout'
import Planos from '../landing/components/planos/Planos'
import ComoFunciona from '../landing/components/comoFunciona/ComoFunciona'
import Clientes from '../landing/components/clientes/Clientes'
import SignUpModal from '../auth/components/form/SingUpModal'
import LoginOptionsModal from '../auth/components/form/LoginOptionsModal'
import LoginModal from '../auth/components/form/LoginModal'

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Laout />}>
					<Route path='/' element={<Landing />} />
					<Route path='/comofunciona' element={<ComoFunciona />} />
					<Route path='/planos' element={<Planos />} />
					<Route path='/clientes' element={<Clientes />} />
					<Route path='/login' element={<LoginModal />} />

					<Route path='/loginOptions' element={<LoginOptionsModal />} />
					<Route path='/register' element={<SignUpModal />} />
				</Route>
				<Route path='/home' element={<Home />} />
			</Routes>
		</BrowserRouter>
	)
}
