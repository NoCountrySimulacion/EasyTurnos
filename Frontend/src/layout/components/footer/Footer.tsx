import Logo from '../navbar/Logo'
import {
	FacebookLogoSocial,
	InstagramLogoSocial,
	WhatsappLogoSocial,
	YoutubeLogoSocial
} from './icons/SocialIcons'

export default function Footer(): JSX.Element {
	return (
		<footer className='w-full h-[235.69px] pb-[20.69px] bg-[#EDC199;] justify-center items-center inline-flex border-b max-sm:h-[500px] '>
			<div className='grow shrink basis-0 self-stretch bg-[#faefe0] flex-col  items-center '>
				<div className='flex h-[100px] justify-between items-center pt-5 max-sm:flex-col max-sm:h-[400px] max-sm:pb-10'>
					<div className=' flex flex-col w-1/3 mt-2 items-center font-baloo'>
						<Logo />
						<span className='mt-2'>Documentación</span>
						<span>Termimos y condiciones</span>
					</div>
					<div className='flex items-center justify-center gap-2 w-1/3 cursor-pointer'>
						<InstagramLogoSocial />
						<FacebookLogoSocial />
						<WhatsappLogoSocial />
						<YoutubeLogoSocial />
					</div>
					<address
						id='contacto'
						className=' flex flex-col justify-center items-center w-1/3'
					>
						<span className='min-w-[120px]'>+34 627 531265</span>
						<span className='min-w-[130px]'>+54 341 6679525</span>
						<span>contacto@turnosonline.app</span>
					</address>
				</div>
				<div className='text-center pt-5 font-baloo'>
					<p className=''>Turnos Online 2024 ©</p>
					<span>Developed by </span>
					<span>S15-22-t-csharp-react</span>
				</div>
			</div>
		</footer>
	)
}
