import { KeyMap, KeyStore, MapStore } from '../index';

it('Runs without crashing', () => {
    new KeyMap();
    new KeyStore();
    new MapStore();
});
