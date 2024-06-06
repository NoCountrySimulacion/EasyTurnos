import { DateTime } from 'luxon'

interface Patient {
	id: number
	title: string
	start: Date
	end: Date
}

const patients: Patient[] = [
	{
		id: 1,
		title: 'Juan Pérez',
		start: DateTime.local(2024, 6, 3, 9, 0).toJSDate(),
		end: DateTime.local(2024, 6, 3, 10, 0).toJSDate()
	}
]

export default patients
