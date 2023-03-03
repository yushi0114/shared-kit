export declare function equal(f: undefined | ((a: any, b: any) => boolean), a: any, b: any): boolean;
export declare const is: <T = any>(a: T, b: T) => boolean;
export declare const not: <T = any>(a: T, b: T) => boolean;
export declare function deepEqual(a: any, b: any): boolean;
export declare const noop: (..._: any[]) => void;
export declare const no: (..._: any[]) => boolean;
export declare const identity: <T = any>(value: T) => T;
export declare function curry(fn: Function, ...args: any[]): (..._args: any[]) => any;
export declare function toRawType(value: any): string;
export declare function isDefined(o: any): boolean;
export declare function isObject(o: any): boolean;
export declare function isPlainObject(o: any): boolean;
export declare const isString: (o: any) => boolean;
export declare const isNumber: (o: any) => boolean;
export declare const isSymbol: (o: any) => boolean;
export declare const isBoolean: (o: any) => boolean;
export declare const isFunction: (o: any) => boolean;
export declare const isArrayBuffer: (o: any) => boolean;
export declare const isRegExp: (o: any) => boolean;
export declare const isNumberLike: (o: any) => boolean;
export declare function isPrimitive(o: any): boolean;
export declare function isPromise(o: any): boolean;
export declare function isIE(): boolean;
export declare function isFalsy(o: any): boolean;
export declare function isTruthy(o: any): boolean;
export declare function isEmptyArray(o: any): boolean;
export declare function isEmptyPlainObject(o: any): boolean;
/**
 * @desc 在对象中剔除指定的属性
 * @param {*} obj 对象
 * @param {*} uselessKeys 剔除的属性
 * @returns
 */
export declare const omit: <T extends Record<string, any>>(obj: T, uselessKeys: string[]) => {};
export declare const deepFreeze: <T extends Record<string, any>>(obj: T, ignoreKeyList?: string[]) => T;
/**
 * 深拷贝
 * @param {*} obj
 */
export declare function cloneDeep<T extends Array<any> | Record<string | number, any>>(obj: T): T;
export declare function openWindow(url: string | URL, opt?: {
    target?: '_self' | '_blank';
    noopener?: boolean;
    noreferrer?: boolean;
}): void;
export declare function toFixed(num: number, fractionDigits?: number): string;
/**
 * @desc 根据名字将数组对象中名字相同的项组成一个相同的数组
 * @param {[]object} beforeData
 * @param {string} key
 * @return {[]{orgin:[], [key]: any}}
 */
export declare const resolveArrayByKey: (beforeData: any[], key: string, ignoreList?: string[], holdKeyList?: any[]) => any[];
export declare const hasScrollBar: (element: HTMLElement, direction?: 'vertical' | 'horizontal') => boolean;
