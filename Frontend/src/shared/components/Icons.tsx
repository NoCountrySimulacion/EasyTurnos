export const LoadingIcon = () => {
	return (
		<section className='w-full h-full flex justify-center'>
			<div className='w-10 h-10 border-4 border-dashed rounded-full animate-spin border-gray-800'></div>
			<p className='ml-4'>Cargando...</p>
		</section>
	)
}

export const HamburguerIcon = () => {
	return (
		<svg
			width='24'
			height='20'
			viewBox='0 0 20 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			cursor='pointer'
		>
			<path d='M19.9998 1H-0.000244141' stroke='black' strokeWidth='1.5'></path>{' '}
			<path d='M19.9998 8H-0.000244141' stroke='black' strokeWidth='1.5'></path>{' '}
			<path
				d='M19.9998 15H-0.000244141'
				stroke='black'
				strokeWidth='1.5'
			></path>
		</svg>
	)
}

export const ArrowRightNavbar = () => {
	return (
		<svg
			aria-hidden='true'
			focusable='false'
			width='9'
			height='16'
			viewBox='0 0 9 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			color='black'
		>
			<path
				d='M1.09961 1.6001L7.49961 8.0001L1.09961 14.4001'
				stroke='#7445C7'
				strokeWidth='2'
				strokeMiterlimit='10'
			></path>
		</svg>
	)
}
