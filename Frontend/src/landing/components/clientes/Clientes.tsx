// src/pages/Clientes.tsx
import React from 'react'
import Map from './Map'
import { FaShareAlt } from 'react-icons/fa'
import { CgMaximize } from 'react-icons/cg'
import { FaUsers } from 'react-icons/fa'

const Clientes: React.FC = () => {
	return (
		<div className='flex flex-col items-center py-12'>
			<h2 className='text-5xl font-montserrat font-semibold mb-4'>
				Nuestros Clientes
			</h2>
			<p className='text-center mb-12'>
				Te invitamos a que explores todos los profesionales, centros de
				estética, médicos, peluqueros, etc. que decidieron automatizar su agenda
				y que HOY son clientes de Tu Reserva Online.
			</p>
			<div className='w-full px-20'>
				<div className='w-full bg-[#444] h-12 flex justify-between items-center px-4 text-white'>
					<div className='flex gap-2 items-center'>
						<FaUsers className='text-2xl' />
						<div className='flex flex-col'>
							<span className='text-sm'>Clientes Easy Trnos</span>
							<small className='text-xs'>Tu reserva Online</small>
						</div>
					</div>
					<div className='flex gap-2'>
						<FaShareAlt />
						<CgMaximize />
					</div>
				</div>
				<Map />
			</div>
		</div>
	)
}

export default Clientes
