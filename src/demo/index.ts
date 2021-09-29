import { KeyStore } from '../lib';

document.querySelector('body').innerHTML = `<h1>Hello World!</h1>`;

const keyStore = new KeyStore();

const list = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }];

list.forEach((data) =>
    keyStore.addAndBind(data, (event) => {
        console.log(event);
    })
);

const keyList: string[] = [...keyStore.keys()];
console.log(keyList[1], keyStore.get(keyList[1]));

keyStore.update(keyList[0], list[0]);
keyStore.update(keyList[1], { a: 22 });
keyStore.delete(keyList[2]);
