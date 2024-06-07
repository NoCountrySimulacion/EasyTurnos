// Definir la interfaz para los objetos en el array
export interface ConfigSlot {
	day: string
	initial: string
	end: string
}

// Array de objetos con los datos
const mockConfigSlots: ConfigSlot[] = [
	// Lunes 3 de junio
	{
		day: 'Mon',
		initial: '2024-06-03T08:00:00.000Z',
		end: '2024-06-03T09:00:00.000Z'
	},
	{
		day: 'Mon',
		initial: '2024-06-03T09:00:00.000Z',
		end: '2024-06-03T10:00:00.000Z'
	},
	{
		day: 'Mon',
		initial: '2024-06-03T14:00:00.000Z',
		end: '2024-06-03T15:00:00.000Z'
	},
	{
		day: 'Mon',
		initial: '2024-06-03T16:30:00.000Z',
		end: '2024-06-03T17:30:00.000Z'
	},
	// Martes 4 de junio
	{
		day: 'Tue',
		initial: '2024-06-04T08:00:00.000Z',
		end: '2024-06-04T09:00:00.000Z'
	},
	{
		day: 'Tue',
		initial: '2024-06-04T09:00:00.000Z',
		end: '2024-06-04T10:00:00.000Z'
	},
	{
		day: 'Tue',
		initial: '2024-06-04T14:00:00.000Z',
		end: '2024-06-04T15:00:00.000Z'
	},
	{
		day: 'Tue',
		initial: '2024-06-04T16:30:00.000Z',
		end: '2024-06-04T17:30:00.000Z'
	},
	// Miércoles 5 de junio
	{
		day: 'Wed',
		initial: '2024-06-05T14:00:00.000Z',
		end: '2024-06-05T15:00:00.000Z'
	},
	{
		day: 'Wed',
		initial: '2024-06-05T15:00:00.000Z',
		end: '2024-06-05T16:00:00.000Z'
	},
	{
		day: 'Wed',
		initial: '2024-06-05T16:00:00.000Z',
		end: '2024-06-05T17:00:00.000Z'
	},
	// Jueves 6 de junio
	{
		day: 'Thu',
		initial: '2024-06-06T20:00:00.000Z',
		end: '2024-06-06T21:00:00.000Z'
	},
	{
		day: 'Thu',
		initial: '2024-06-06T01:00:00.000Z',
		end: '2024-06-06T02:00:00.000Z'
	}
]

export default mockConfigSlots
