// src/components/InfoCard.tsx
import { InfoCardData } from '../../typescript/interface'

const InfoCard: React.FC<InfoCardData> = ({
	title,
	imageSrc,
	altText,
	description
}) => {
	return (
		<article className='h-[530px] w-[390px]  shadow-xl p-4 rounded-2xl flex flex-col justify-between '>
			<header className='h-60'	>
				<img src={imageSrc} alt={altText} className='rounded-2xl w-full' />
				<h1 className=' text-3xl font-semibold font-montserrat'>{title}</h1>
			</header>
			<main className=''>
				<p className='text-sm font-roboto'>{description}</p>
			</main>
		</article>
	)
}

export default InfoCard
