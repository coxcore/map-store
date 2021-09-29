/**
 * This class helps you keep track of data changes using unique keys.
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
import KeyMap from './KeyMap';
import { ACTION, ACTION_UPDATE, ACTION_DELETE } from './static';

export default class KeyStore extends KeyMap {
    /**
     * Map that assigns unique keys to data to be appended and tracks changes
     *
     * @extends KeyMap
     */
    constructor(keyMap?: KeyMap) {
        super(keyMap);
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

    get emitter(): EventEmitter {
        return this._emitter;
    }

    addAndBind(data: any, listener: EventListener) {
        const key = this.add(data);
        this.bind(key, listener);

        return this;
    }

    update(key: string, data: any): boolean {
        if (!super.update(key, data)) {
            return false;
        }

        this.action(key, ACTION_UPDATE);

        return true;
    }

    delete(key: string): boolean {
        if (!super.delete(key)) {
            return false;
        }

        this.action(key, ACTION_DELETE);
        this.unbindAll(key);

        return true;
    }

    clear(): boolean {
        let deleted = false;

        super.forEach((data, key) => {
            deleted = this.delete(key) || deleted;
        });

        return deleted;
    }

    action(key: string, actionName: string) {
        if (!this._emitter.hasEvent(key)) {
            return this;
        }

        const event: StoreEvent = {
            type: ACTION,
            action: actionName,
            target: this,
            key,
        };

        this._emitter.emit(key, event);

        return this;
    }

    bind(key: string, listener: EventListener) {
        if (!super.has(key)) {
            throw new Error(
                `${this.name}:key does not exist.\nkey: ${key.toString()}`
            );
        }

        this._emitter.on(key, listener);

        return this;
    }

    unbind(key: string, listener: EventListener) {
        this._emitter.off(key, listener);

        return this;
    }

    unbindAll(key: string) {
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

export { KeyMap, EventEmitter, ACTION, ACTION_UPDATE, ACTION_DELETE };

export type { EventName, Event, StoreEvent, EventListener };
