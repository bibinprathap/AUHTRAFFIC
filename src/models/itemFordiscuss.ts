export interface Event {
  id: string;
  title: string;
  price: number;
  grossPerc?: number;
  lowPerc?: number;
  oil: number[];
  nonOil: number[];
  expenses: number[];
  category: string;
}

export type View = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';
