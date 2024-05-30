// src/components/InfoCardList.tsx
import React from 'react'
import InfoCard from './InfoCard'
import { infoCardData } from './constants/infoCardData'

const InfoCardList: React.FC = () => {
	return (
		<div className='flex gap-14 justify-between'>
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
