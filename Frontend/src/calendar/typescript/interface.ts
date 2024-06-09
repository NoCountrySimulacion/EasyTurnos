import { Slot } from '../../services/api/slots'

export interface CalendarConfigProps {
	timeRange: number[]
	onTimeRangeChange: (values: number[]) => void
}

export interface CalendarContextType {
    slots: Slot[]
    loading: boolean
    error: string | null
    fetchSlots: () => Promise<void>
    addSlot: (newSlot: Slot) => Promise<void>
    removeSlot: (slotId: number) => Promise<void>
}
