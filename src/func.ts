export function equal(f: undefined | ((a: any, b: any) => boolean), a: any, b: any) {
    return isFunction(f) ? f!(a, b) : Object.is(a, b);
}

export const is: <T = any>(a: T, b: T) => boolean = curry(equal, Object.is);
export const not: <T = any>(a: T, b: T) => boolean = curry(equal, function([v1, v2]: [any, any]) {
    return !Object.is.apply(null, [v1, v2]);
});

export function deepEqual(a: any, b: any): boolean {
    if (a === b) return true;
    const isObjectA = isObject(a);
    const isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
        try {
            const isArrayA = Array.isArray(a);
            const isArrayB = Array.isArray(b);
            if (isArrayA && isArrayB) {
                return (
                    a.length === b.length &&
                    a.every((e: any, i: number) => {
                        return deepEqual(e, b[i]);
                    })
                );
            } else if (a instanceof Date && b instanceof Date) {
                return a.getTime() === b.getTime();
            } else if (!isArrayA && !isArrayB) {
                const keysA = Object.keys(a);
                const keysB = Object.keys(b);
                return (
                    keysA.length === keysB.length &&
                    keysA.every((key) => {
                        return deepEqual(a[key], b[key]);
                    })
                );
            }

            return false;
        } catch (e) {
            return false;
        }
    } else if (!isObjectA && !isObjectB) {
        return String(a) === String(b);
    }

    return false;
}

/* eslint-disable */
export const noop = (..._: any[]) => {};
export const no = (..._: any[]) => false;
/* eslint-enable */

export const identity = <T = any>(value: T) => value;

export function curry(fn: Function, ...args: any[]) {
    return (..._args: any[]) =>
        ((rest) => (rest.length >= fn.length ? fn(...rest) : curry(fn, rest)))([...args, ..._args]);
}

const _toString = Object.prototype.toString;

export function toRawType(value: any): string {
    return _toString.call(value).slice(8, -1);
}

export function isDefined(o: any): boolean {
    return o !== undefined && o !== null;
}

export function isObject(o: any): boolean {
    return o !== null && typeof o === 'object';
}

export function isPlainObject(o: any): boolean {
    return isDefined(o) && !isPrimitive(o);
}

export const isString = (o: any) => typeof o === 'string';
// NaN
export const isNumber = (o: any) => toRawType(o) === 'Number';
export const isSymbol = (o: any) => typeof o === 'symbol';
export const isBoolean = (o: any) => typeof o === 'boolean';
export const isFunction = (o: any) => typeof o === 'function';

export const isArrayBuffer = (o: any) => toRawType(o) === 'ArrayBuffer';

export const isRegExp = (o: any) => toRawType(o) === 'RegExp';

export const isNumberLike = (o: any) => isNumber(Number(o));

export function isPrimitive(o: any): boolean {
    return isString(o) || isNumber(o) || isSymbol(o) || isBoolean(o);
}

export function isPromise(o: any): boolean {
    return isDefined(o) && isFunction(o.then) && isFunction(o.catch);
}

export function isIE(): boolean {
    return !!(window as any).ActiveXObject || 'ActiveXObject' in window;
}

export function isFalsy(o: any): boolean {
    return !isDefined(o) || ['', 0, false, NaN].includes(o);
}

export function isTruthy(o: any): boolean {
    return !isFalsy(o);
}

export function isEmptyArray(o: any): boolean {
    return Array.isArray(o) ? o.length === 0 : false;
}

export function isEmptyPlainObject(o: any): boolean {
    return isPlainObject(o) ? Object.keys(o).length === 0 : false;
}

/**
 * @desc 在对象中剔除指定的属性
 * @param {*} obj 对象
 * @param {*} uselessKeys 剔除的属性
 * @returns
 */
export const omit = <T extends Record<string, any>>(obj: T, uselessKeys: string[]) => {
    const resolveObject = Object.keys(obj).reduce((acc, key) => {
        return uselessKeys.includes(key) ? acc : { ...acc, [key]: obj[key] };
    }, {});
    return resolveObject;
};

export const deepFreeze = <T extends Record<string, any>>(obj: T, ignoreKeyList: string[] = []) => {
    // 取出属性
    const propNames = Object.getOwnPropertyNames(obj);
    propNames.forEach((name: keyof T) => {
        const prop = obj[name];

        // 如果prop是个对象，冻结它
        if (typeof prop === 'object' && prop !== null) obj[name] = deepFreeze(prop, ignoreKeyList);
    });
    return new Proxy(obj, {
        deleteProperty(target, key: string) {
            throw new Error(`不能删除 ${key}`);
        },
        preventExtensions() {
            return false;
        },
        getOwnPropertyDescriptor(target, key: string) {
            if (ignoreKeyList.includes(key)) {
                return {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                };
            }
            return {
                enumerable: true,
                configurable: false,
                writable: false,
                /* ...其他标志，可能是 "value:..." */
            };
        },
        get(target, key: string) {
            if (!Object.prototype.hasOwnProperty.call(target, key)) {
                throw new Error(`${key} 不存在`);
            } else {
                return Reflect.get(target, key);
            }
        },
        set(target, key: string, value) {
            if (ignoreKeyList.includes(key)) {
                return Reflect.set(target, key, value);
            }
            throw new Error(`${key} 不允许改变`);
        },
    });
};

/**
 * 深拷贝
 * @param {*} obj
 */

export function cloneDeep<T extends Array<any> | Record<string | number, any>>(obj: T): T {
    if (!isObject(obj)) {
        // console.error('[TypeError] param obj is not a object');
        return obj;
    }
    const result: T | any = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                result[key] = cloneDeep(obj[key]); // 递归复制
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}

export function openWindow(
    url: string | URL,
    opt?: { target?: '_self' | '_blank'; noopener?: boolean; noreferrer?: boolean }
) {
    const { target = '_blank', noopener = false, noreferrer = false } = opt || {};
    const feature = [];

    if (noopener) feature.push('noopener=yes');
    if (noreferrer) feature.push('noreferrer=yes');

    window.open(url, target, feature.join(','));
}

export function toFixed(num: number, fractionDigits: number = 0): string {
    return (Math.round(num * 100) / 100).toFixed(fractionDigits);
}

/**
 * @desc 根据名字将数组对象中名字相同的项组成一个相同的数组
 * @param {[]object} beforeData
 * @param {string} key
 * @return {[]{orgin:[], [key]: any}}
 */
export const resolveArrayByKey = (beforeData: any[], key: string, ignoreList:string[] = [], holdKeyList = []) => {
    const tempArr = [];
    const afterData = [];
    for (let i = 0; i < beforeData.length; i++) {
        if (ignoreList.includes(beforeData[i][key])) {
            afterData.push(beforeData[i]);
            continue;
        }
        if (tempArr.indexOf(beforeData[i][key]) === -1) {
            // eslint-disable-next-line no-undef
            const holdKeyMap: Record<string, string> = {};
            holdKeyList.forEach((key) => {
                holdKeyMap[key] = beforeData[i][key];
            });
            afterData.push({
                [key]: beforeData[i][key],
                ...holdKeyMap,
                origin: [beforeData[i]],
            });
            tempArr.push(beforeData[i][key]);
        } else {
            for (let j = 0; j < afterData.length; j++) {
                if (afterData[j][key] == beforeData[i][key]) {
                    afterData[j].origin.push(beforeData[i]);
                    break;
                }
            }
        }
    }
    return afterData;
};

export const hasScrollBar = (element: HTMLElement, direction: 'vertical' | 'horizontal' = 'vertical'): boolean => {
    if (!element) return false;
    if (direction === 'vertical') {
        return element.scrollHeight > element.clientHeight;
    } else if (direction === 'horizontal') {
        return element.scrollWidth > element.clientWidth;
    }
    return false;
};
