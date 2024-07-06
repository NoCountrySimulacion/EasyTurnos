import React from 'react'
import InfoCard from './InfoCard'
import { infoCardData } from './constants/infoCardData'

const InfoCardList: React.FC = () => {
	return (
		<div className='flex flex-wrap justify-center my-0 mx-auto gap-8'>
			{infoCardData.map((card, index) => (
				<InfoCard
					key={index}
					title={card.title}
					imageSrc={card.imageSrc}
					altText={card.altText}
					description={card.description}
				/>
			))}
		</div>
	)
}

export default InfoCardList
