/**
 * This class helps you reference data by unique key.
 *
 * @author Park U-yeong <ascript0@gmail.com>
 * @license MIT
 */

import keyGenerator from './utils/keyGenerator';

const createInstanceKey = keyGenerator();

export default class KeyMap extends Map {
    /**
     * Map that assigns a unique key to the data to be appended
     *
     * @extends Map
     */
    constructor(keyMap?: KeyMap) {
        super();

        if (keyMap instanceof KeyMap) {
            // for IE11
            keyMap.forEach((data, key) => super.set(key, data));

            this._name = keyMap.name;
            this._index = keyMap.keyIndex;
        } else {
            this._name = createInstanceKey(this.constructor.name);
        }

        return this;
    }

    private _index = 0;
    private _name = '';

    private createKey(): string {
        return `${this.name}:${(this._index++).toString(16)}`;
    }

    /**
     * unique index of the key to be created
     */
    get keyIndex(): number {
        return this._index;
    }

    /**
     * instance name
     */
    get name(): string {
        return this._name;
    }

    /**
     * add or replace data in key map
     * it is recommended to use the 'add' or 'update' method.
     */
    set(key: any, data: any) {
        if (super.has(key)) {
            this.update(key, data);
        } else {
            this.add(data);
        }

        return this;
    }

    add(data: any): string {
        const key = this.createKey();
        super.set(key, data);

        return key;
    }

    update(key: string, data: any): boolean {
        if (!super.has(key) || data === super.get(key)) {
            return false;
        }

        super.set(key, data);

        return true;
    }
}
