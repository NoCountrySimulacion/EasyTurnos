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
	},
	{
		id: 2,
		title: 'María García',
		start: DateTime.local(2024, 6, 3, 11, 0).toJSDate(),
		end: DateTime.local(2024, 6, 3, 12, 0).toJSDate()
	},
	{
		id: 3,
		title: 'Carlos López',
		start: DateTime.local(2024, 6, 4, 9, 0).toJSDate(),
		end: DateTime.local(2024, 6, 4, 10, 0).toJSDate()
	},
	{
		id: 4,
		title: 'Ana Fernández',
		start: DateTime.local(2024, 6, 4, 11, 0).toJSDate(),
		end: DateTime.local(2024, 6, 4, 12, 0).toJSDate()
	},
	{
		id: 5,
		title: 'Luis Martínez',
		start: DateTime.local(2024, 6, 5, 9, 0).toJSDate(),
		end: DateTime.local(2024, 6, 5, 10, 0).toJSDate()
	},
	{
		id: 6,
		title: 'Carmen Sánchez',
		start: DateTime.local(2024, 6, 5, 11, 0).toJSDate(),
		end: DateTime.local(2024, 6, 5, 12, 0).toJSDate()
	},
	{
		id: 7,
		title: 'José Rodríguez',
		start: DateTime.local(2024, 6, 6, 9, 0).toJSDate(),
		end: DateTime.local(2024, 6, 6, 10, 0).toJSDate()
	},
	{
		id: 8,
		title: 'Laura Gómez',
		start: DateTime.local(2024, 6, 6, 11, 0).toJSDate(),
		end: DateTime.local(2024, 6, 6, 12, 0).toJSDate()
	},
	{
		id: 9,
		title: 'Pedro Díaz',
		start: DateTime.local(2024, 6, 7, 9, 0).toJSDate(),
		end: DateTime.local(2024, 6, 7, 10, 0).toJSDate()
	},
	{
		id: 10,
		title: 'Sofía Ramírez',
		start: DateTime.local(2024, 6, 7, 11, 0).toJSDate(),
		end: DateTime.local(2024, 6, 7, 12, 0).toJSDate()
	}
]

export default patients
