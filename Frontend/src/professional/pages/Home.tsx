/* eslint-disable quotes */
import { DateTime } from 'luxon'
import { AppointmentsList } from '../components/AppointmentsList'
import { WithoutAppointments } from '../components/WithoutAppointments'
import { Search } from '../components/Search'
import { useAuth } from '../../auth/hooks/useAuth'
import { useEffect, useState } from 'react'
import {
	getProfessional,
	getProfessionalAppointments
} from '../../services/api/appointment'
import {
	AppointmentList,
	Professional
} from '../../services/typescript/interface'

function Home(): React.ReactElement {
	const now = DateTime.now()
	const formattedDate = now.setLocale('es').toFormat("cccc, dd 'de' LLLL")
	const { user, decodedToken } = useAuth()

	const [appointmentList, setAppointmentList] =
		useState<AppointmentList | null>(null)
	// const [professional, setProfessional] = useState<Professional | null>(null)

	useEffect(() => {
		if (!decodedToken) return
		getProfessionalAppointments(decodedToken).then(newAppointments =>
			setAppointmentList(newAppointments)
		)
		// getProfessional(decodedToken).then(newProfessional =>
		// 	setProfessional(newProfessional)
		// )
	}, [])
	return (
		<section className=' h-full flex flex-col font-montserrat px-10 gap-6 '>
			<Search />
			<section className='flex flex-col items-start gap-[18px]'>
				<h1 className='text-[35px] font-bold leading-[56px]'>
					Bienvenido a tu espacio,{' '}
					<span className='capitalize'>{user?.firstName}.</span>
				</h1>
				<h2 className='text-[28px] font-bold leading-[56px]'>
					Hoy {formattedDate}.
				</h2>
			</section>
			{appointmentList?.data.length ? (
				<AppointmentsList appointmentList={appointmentList} />
			) : (
				<WithoutAppointments />
			)}
		</section>
	)
}

export default Home
