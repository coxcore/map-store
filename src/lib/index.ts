import MapStore, {
    EventEmitter,
    EventName,
    Event,
    StoreEvent,
    EventListener,
    ACTION,
    ACTION_UPDATE,
    ACTION_DELETE,
} from './modules/MapStore';
import KeyStore, { KeyMap } from './modules/KeyStore';

export { MapStore, KeyMap, KeyStore, EventEmitter };
export { ACTION, ACTION_UPDATE, ACTION_DELETE };
export type { EventName, Event, StoreEvent, EventListener };
export default MapStore;
