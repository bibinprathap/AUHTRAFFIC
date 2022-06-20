import { setHours, setMinutes, subDays, addDays } from 'date-fns';
import type { Event } from 'src/models/itemFordiscuss';
import { randomId } from 'src/utils/randomId';
import { copy } from 'src/utils/copy';

let events: Event[] = [
  {
    id: '1',
    title: 'GDP Growth',
    price: 230,
    grossPerc: 67.43,
    oil: [44, 55, -41, 67, -22, 43],
    nonOil: [44, 55, -41, 67, -22, 43],
    expenses: [44, 23, -41, 18, -22, 43],
    category: 'economy'
  }
];

class itemsForDiscussApi {
  getEvents(): Promise<Event[]> {
    return Promise.resolve(copy(events));
  }

  createEvent(data): Promise<Event> {
    return new Promise((resolve, reject) => {
      try {
        const clonedEvents = copy(events);

        const event = {
          id: randomId(),
          ...data
        };

        clonedEvents.push(event);
        events = clonedEvents;

        resolve(copy(event));
      } catch (err) {
        console.error(err);
        reject(new Error('Internal server error'));
      }
    });
  }

  updateEvent({ eventId, update }): Promise<Event> {
    return new Promise((resolve, reject) => {
      try {
        const clonedEvents = copy(events);

        const event = events.find((_event) => _event.id === eventId);

        if (!event) {
          reject(new Error('Event not found'));
          return;
        }

        Object.assign(event, update);

        events = clonedEvents;

        resolve(copy(event));
      } catch (err) {
        console.error(err);
        reject(new Error('Internal server error'));
      }
    });
  }

  deleteEvent(eventId: string): Promise<true> {
    return new Promise((resolve, reject) => {
      try {
        const clonedEvents = copy(events);

        const event = events.find((_event) => _event.id === eventId);

        if (!event) {
          reject(new Error('Event not found'));
          return;
        }

        events = events.filter((_event) => _event.id !== eventId);

        events = clonedEvents;

        resolve(true);
      } catch (err) {
        console.error(err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const itemsForDiscuss = new itemsForDiscussApi();
