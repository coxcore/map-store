const keyGenerator = (defaultPrefix: string | number = 'key') => {
    let index = 0;
    return (prefix?: string | number) =>
        `${prefix || defaultPrefix}:${(index++).toString(16)}`;
};

export default keyGenerator;
