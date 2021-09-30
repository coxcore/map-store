export type {
    EventName,
    Event,
    StoreEvent,
    EventListener,
} from './modules/EventEmitter';

export { ACTION, ACTION_UPDATE, ACTION_DELETE } from './modules/static';
export { default as EventEmitter } from './modules/EventEmitter';
export { default as KeyStore } from './modules/KeyStore';
export { default as KeyMap } from './modules/KeyMap';
export { default, default as MapStore } from './modules/MapStore';
