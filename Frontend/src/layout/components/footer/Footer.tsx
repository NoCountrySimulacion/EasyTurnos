import Logo from '../navbar/Logo'
import {
	FacebookLogoSocial,
	InstagramLogoSocial,
	WhatsappLogoSocial,
	YoutubeLogoSocial
} from './icons/SocialIcons'

export default function Footer(): JSX.Element {
	return (
		<div className='w-full h-[235.69px] pb-[20.69px] bg-[#EDC199;] justify-center items-center inline-flex border-b'>
			<div className='grow shrink basis-0 self-stretch pt-[20px] pb-30 bg-[#eed7b4] flex-col justify-start items-center inline-flex '>
				<div className='grow shrink basis-0 self-stretch  pb-2.5 bg-[#f5e3c8] flex-col justify-start items-center inline-flex '>
					<div className='grow shrink basis-0 self-stretch bg-[#faefe0] flex-col justify-start items-center '>
						<div className='flex h-[100px] justify-between '>
							<div className=' flex flex-col w-1/3 mt-2 items-center font-baloo'>
								<Logo />
								<span className='mt-2'>Documentation</span>
								<span>Terms and conditions</span>
							</div>
							<div className='flex items-center justify-center gap-2 w-1/3 cursor-pointer'>
								<InstagramLogoSocial />
								<FacebookLogoSocial />
								<WhatsappLogoSocial />
								<YoutubeLogoSocial />
							</div>
							<address id='contacto' className=' flex flex-col justify-center items-center w-1/3'>
								<span>+34 627 531265</span>
								<span>+54 341 6679525</span>
								<span>contacto@turnosonline.app</span>
							</address>
						</div>
						<div className=' h-[50px] text-center pt-5 font-baloo'>
							<p className='' >Turnos Online 2024 ©</p>
							<span>Developed by </span>
							<span>S15-22-t-csharp-react</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
