export type EventName = string | symbol;

export interface Event {
    type?: EventName;
    target?: any;
    data?: any;
}

export interface StoreEvent extends Event {
    action?: EventName;
    key?: string;
}

// eslint-disable-next-line no-unused-vars
export type EventListener = (event: Event) => void;

export default class EventEmitter {
    private _listeners = new Map();

    emit(eventName: any, event: Event) {
        const lis = this._listeners.get(eventName);

        if (lis) {
            lis.forEach((fn: EventListener) => fn(event));
        }

        return this;
    }

    hasEvent(eventName: any): boolean {
        return this._listeners.has(eventName);
    }

    on(eventName: any, listener: EventListener) {
        let lis = this._listeners.get(eventName);

        if (!lis) {
            lis = new Set();
            this._listeners.set(eventName, lis);
        }

        lis.add(listener);

        return this;
    }

    once(eventName: any, listener: EventListener) {
        const onceListener: EventListener = (event: Event) => {
            listener(event);
            this.off(eventName, onceListener);
        };

        this.on(eventName, onceListener);

        return this;
    }

    off(eventName: any, listener: EventListener) {
        const lis = this._listeners.get(eventName);

        if (!lis) {
            return this;
        }

        lis.delete(listener);

        if (!lis.size) {
            this._listeners.delete(eventName);
        }

        return this;
    }

    offAll(eventName: any) {
        const lis = this._listeners.get(eventName);

        if (lis) {
            this._listeners.get(eventName).clear();
            this._listeners.delete(eventName);
        }

        return this;
    }

    clear() {
        this._listeners.forEach((value, key) => {
            this.offAll(key);
        });
    }
}
