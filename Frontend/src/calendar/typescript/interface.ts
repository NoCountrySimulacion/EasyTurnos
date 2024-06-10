import { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { Slot } from '../../services/api/slots'
import { Moment } from 'moment'

export interface CalendarConfigProps {
  timeRange: number[];
  onTimeRangeChange: (values: number[]) => void;
}

export interface CalendarContextType {
  slots: Slot[];
  loading: boolean;
  error: string | null;
  fetchSlots: () => Promise<void>;
  addSlot: (newSlot: Slot) => Promise<void>;
  removeSlot: (slotId: number) => Promise<void>;
}

export interface ConfigSlot {
  initial: string;
  end: string;
  startDate: string; // Modificado para incluir startDate y endDate
  endDate: string;
  id:string;
}

export interface CustomDayProps extends PickersDayProps<Moment> {
  selectedDay: Moment | null;
  hoveredDay: Moment | null;
  onPointerEnter: (event: React.PointerEvent<HTMLButtonElement>) => void ; // Cambiado el tipo de parámetro
  onPointerLeave: () => void;
  slots: ConfigSlot[];
  appointments: Appointment[];
  
}

export interface Appointment {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

