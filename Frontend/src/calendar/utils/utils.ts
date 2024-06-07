export const generateSlots = (
	startHour: number,
	endHour: number,
	interval: number,
	selectedDays: number[]
) => {
	const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	const slots: any[] = []

	for (let i = 0; i < daysOfWeek.length; i++) {
		const day = daysOfWeek[i]
		if (selectedDays.includes(i)) {
			for (let j = startHour; j < endHour; j += interval / 60) {
				const initialDate = new Date()
				initialDate.setHours(j - 3, 0, 0, 0) // Restamos 3 horas
				initialDate.setDate(initialDate.getDate() + i - initialDate.getDay())
				const endDate = new Date(initialDate)
				endDate.setHours(j - 3 + interval / 60, 0, 0, 0) // Restamos 3 horas
				slots.push({
					day,
					initial: initialDate.toISOString(),
					end: endDate.toISOString()
				})
			}
		}
	}

	return slots
}