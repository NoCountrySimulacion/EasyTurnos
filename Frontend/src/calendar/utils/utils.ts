/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateSlots = (
	startHour: number,
	endHour: number,
	interval: number,
	startDate: Date,
	endDate: Date
) => {
	const slots: any[] = []
	const currentDate = new Date(startDate)

	// Función para formatear la fecha sin la "Z" al final
	const formatDate = (date: Date) => {
		const formattedDate = date.toISOString()
		return formattedDate.slice(0, -1)
	}

	while (currentDate <= endDate) {
		for (let j = startHour; j < endHour; j += interval / 60) {
			const initialDate = new Date(currentDate)
			initialDate.setHours(j - 3, 0, 0, 0)
			const slotEndDate = new Date(initialDate)
			slotEndDate.setHours(j + interval / 60 - 3, 0, 0, 0)
			slots.push({
				day: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
				startDate: formatDate(initialDate), // Utiliza la función formatDate
				endDate: formatDate(slotEndDate) // Utiliza la función formatDate
			})
		}
		currentDate.setDate(currentDate.getDate() + 1)
	}

	console.log('Generated slots:', slots)
	return slots
}
