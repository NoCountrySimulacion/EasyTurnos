import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import TestimonialCard from './TestimonialCard'
import { testimonials } from './mock/testimonials'
import { Autoplay } from 'swiper/modules'

const TestimonialCarousel: React.FC = () => {
	return (
		<div className='max-w-[1240px]'>
			<Swiper
				spaceBetween={10}
				slidesPerView={3}
				loop={true}
				autoplay={{
					delay: 0,
					disableOnInteraction: false,
					pauseOnMouseEnter: false
				}}
				speed={7000}
				pagination={false}
				breakpoints={{
					1024: {
						slidesPerView: 3
					},
					600: {
						slidesPerView: 1
					}
				}}
				modules={[Autoplay]}
			>
				{testimonials.map((testimonial, index) => (
					<SwiperSlide key={index} className='p-6 text-center'>
						<TestimonialCard {...testimonial} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default TestimonialCarousel
