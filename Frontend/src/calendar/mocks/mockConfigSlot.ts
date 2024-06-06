// Definir la interfaz para los objetos en el array
interface ConfigSlot {
	day: string
	initial: string
	end: string
}

// Array de objetos con los datos
const mockConfigSlots: ConfigSlot[] = [
	{
		day: 'Mon',
		initial: '2024-06-03T07:00:00.000Z',
		end: '2024-06-03T08:00:00.000Z'
	},
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
		initial: '2024-06-03T10:00:00.000Z',
		end: '2024-06-03T11:00:00.000Z'
	},
	{
		day: 'Mon',
		initial: '2024-06-03T11:00:00.000Z',
		end: '2024-06-03T12:00:00.000Z'
	},
	{
		day: 'Mon',
		initial: '2024-06-03T12:00:00.000Z',
		end: '2024-06-03T13:00:00.000Z'
	},
	{
		day: 'Mon',
		initial: '2024-06-03T13:00:00.000Z',
		end: '2024-06-03T14:00:00.000Z'
	},
	{
		day: 'Tue',
		initial: '2024-06-04T07:00:00.000Z',
		end: '2024-06-04T08:00:00.000Z'
	},
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
		initial: '2024-06-04T10:00:00.000Z',
		end: '2024-06-04T11:00:00.000Z'
	},
	{
		day: 'Tue',
		initial: '2024-06-04T11:00:00.000Z',
		end: '2024-06-04T12:00:00.000Z'
	},
	{
		day: 'Tue',
		initial: '2024-06-04T12:00:00.000Z',
		end: '2024-06-04T13:00:00.000Z'
	},
	{
		day: 'Tue',
		initial: '2024-06-04T13:00:00.000Z',
		end: '2024-06-04T14:00:00.000Z'
	},
	{
		day: 'Wed',
		initial: '2024-06-05T07:00:00.000Z',
		end: '2024-06-05T08:00:00.000Z'
	},
	{
		day: 'Wed',
		initial: '2024-06-05T08:00:00.000Z',
		end: '2024-06-05T09:00:00.000Z'
	},
	{
		day: 'Wed',
		initial: '2024-06-05T09:00:00.000Z',
		end: '2024-06-05T10:00:00.000Z'
	},
	{
		day: 'Wed',
		initial: '2024-06-05T10:00:00.000Z',
		end: '2024-06-05T11:00:00.000Z'
	},
	{
		day: 'Wed',
		initial: '2024-06-05T11:00:00.000Z',
		end: '2024-06-05T12:00:00.000Z'
	},
	{
		day: 'Wed',
		initial: '2024-06-05T12:00:00.000Z',
		end: '2024-06-05T13:00:00.000Z'
	},
	{
		day: 'Wed',
		initial: '2024-06-05T13:00:00.000Z',
		end: '2024-06-05T14:00:00.000Z'
	},
	{
		day: 'Mon',
		initial: '2024-06-03T19:00:00.000Z',
		end: '2024-06-03T20:00:00.000Z'
	},
	{
		day: 'Mon',
		initial: '2024-06-03T20:00:00.000Z',
		end: '2024-06-03T21:00:00.000Z'
	},
	{
		day: 'Mon',
		initial: '2024-06-03T21:00:00.000Z',
		end: '2024-06-03T22:00:00.000Z'
	},
	{
		day: 'Mon',
		initial: '2024-06-03T22:00:00.000Z',
		end: '2024-06-03T23:00:00.000Z'
	},
	{
		day: 'Tue',
		initial: '2024-06-04T19:00:00.000Z',
		end: '2024-06-04T20:00:00.000Z'
	},
	{
		day: 'Tue',
		initial: '2024-06-04T20:00:00.000Z',
		end: '2024-06-04T21:00:00.000Z'
	},
	{
		day: 'Tue',
		initial: '2024-06-04T20:00:00.000Z',
		end: '2024-06-04T21:00:00.000Z'
	},
	{
		day: 'Tue',
		initial: '2024-06-04T21:00:00.000Z',
		end: '2024-06-04T22:00:00.000Z'
	},
	{
		day: 'Tue',
		initial: '2024-06-04T22:00:00.000Z',
		end: '2024-06-04T23:00:00.000Z'
	},
	{
		day: 'Wed',
		initial: '2024-06-05T19:00:00.000Z',
		end: '2024-06-05T20:00:00.000Z'
	},
	{
		day: 'Wed',
		initial: '2024-06-05T20:00:00.000Z',
		end: '2024-06-05T21:00:00.000Z'
	},
	{
		day: 'Wed',
		initial: '2024-06-05T21:00:00.000Z',
		end: '2024-06-05T22:00:00.000Z'
	},
	{
		day: 'Wed',
		initial: '2024-06-05T22:00:00.000Z',
		end: '2024-06-05T23:00:00.000Z'
	}
]

export default mockConfigSlots
