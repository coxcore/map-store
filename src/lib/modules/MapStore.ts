/**
 * This class helps keep track of changes to data owned by the Map.
 *
 * @author Park U-yeong <ascript0@gmail.com>
 * @license MIT
 */

import EventEmitter, {
    EventName,
    Event,
    StoreEvent,
    EventListener,
} from './EventEmitter';
import keyGenerator from './utils/keyGenerator';
import { ACTION, ACTION_UPDATE, ACTION_DELETE } from './static';

const createInstanceKey = keyGenerator();

export default class MapStore extends Map {
    /**
     * Map that assigns unique keys to data to be appended and tracks changes
     *
     * @extends Map
     */
    constructor(map?: Map<any, any>) {
        super();

        if (map instanceof Map) {
            map.forEach((value, key) => this.set(key, value));
        }

        return this;
    }

    static get ACTION(): string {
        return ACTION;
    }

    static get ACTION_UPDATE(): string {
        return ACTION_UPDATE;
    }

    static get ACTION_DELETE(): string {
        return ACTION_DELETE;
    }

    private _emitter = new EventEmitter();
    private _name = createInstanceKey(this.constructor.name);

    /**
     * instance name
     */
    get name(): string {
        return this._name;
    }

    get emitter(): EventEmitter {
        return this._emitter;
    }

    set(key: any, value: any) {
        const isUpdate = super.has(key);

        if (isUpdate && value === super.get(key)) {
            return this;
        }

        super.set(key, value);

        if (isUpdate) {
            this.action(key, ACTION_UPDATE);
        }

        return this;
    }

    delete(key: any): boolean {
        const deleted = super.delete(key);

        if (deleted) {
            this.action(key, ACTION_DELETE);
            this.unbindAll(key);
        }

        return deleted;
    }

    clear(): boolean {
        let deleted = false;

        super.forEach((data, key) => {
            deleted = this.delete(key) || deleted;
        });

        return deleted;
    }

    action(key: any, actionName: string) {
        if (this._emitter.hasEvent(key)) {
            const event: StoreEvent = {
                type: ACTION,
                action: actionName,
                target: this,
                key,
            };

            this._emitter.emit(key, event);
        }

        return this;
    }

    bind(key: any, listener: EventListener) {
        if (!super.has(key)) {
            throw new Error(
                `${this.name}:key does not exist.\nkey: ${key.toString()}`
            );
        }

        this._emitter.on(key, listener);

        return this;
    }

    unbind(key: any, listener: EventListener) {
        this._emitter.off(key, listener);

        return this;
    }

    unbindAll(key: any) {
        this._emitter.offAll(key);

        return this;
    }

    emit(eventName: EventName, eventData: any) {
        const event: Event = {
            type: eventName,
            target: this,
            data: eventData,
        };

        this._emitter.emit(eventName, event);

        return this;
    }

    on(eventName: EventName, listener: EventListener) {
        this._emitter.on(eventName, listener);

        return this;
    }

    off(eventName: EventName, listener: EventListener) {
        this._emitter.off(eventName, listener);

        return this;
    }

    offAll(eventName: EventName) {
        this._emitter.offAll(eventName);

        return this;
    }
}

export { EventEmitter, ACTION, ACTION_UPDATE, ACTION_DELETE };

export type { EventName, Event, StoreEvent, EventListener };
