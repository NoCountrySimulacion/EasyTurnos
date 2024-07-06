import { useNavigate } from 'react-router-dom'

export function ClientButton({ clientId }: { clientId: string }): JSX.Element {
	const navigate = useNavigate()
	const handleClick = () => {
		console.log('El id del cliente:', clientId)
		navigate(`/professional/data-client/${clientId}`)
	}

	return (
		<button
			className=' bg-green-600 transition duration-300 ease-in-out text-white flex items-center justify-center h-[38px] w-[98px] rounded-md text-[13px] leading-5 font-bold hover:bg-[#37b95e]'
			onClick={handleClick}
		>
			<span>Ver cliente</span>
		</button>
	)
}
