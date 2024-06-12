/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Testimonial } from '../../typescript/interface'

const TestimonialCard: React.FC<Testimonial> = ({
	text,
	author,
	description,
	avatar
}) => {
	return (
		<div className='bg-white rounded-lg shadow-lg p-6 w-[367px] mx-auto h-40'>
			<p className='text-xl font-semibold mb-4'>"{text}"</p>
			<div className='flex items-center'>
				<img
					src={avatar}
					alt={author}
					className='w-10 h-10 rounded-full mr-4'
				/>
				<div className='text-start'>
					<p className='text-sm font-medium'>{author}</p>
					<p className='text-sm text-gray-500'>{description}</p>
				</div>
			</div>
		</div>
	)
}

export default TestimonialCard
