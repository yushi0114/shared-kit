export type ExistValidFunc<T = any> = undefined | ((oItem: T, item: T) => boolean);
export declare function toArray<T = any>(o: T | T[], ...args: any[]): T[];
export declare function arrayAdd<T = any>(existValid: ExistValidFunc<T>, o: T[], item: T | T[]): T[];
export declare function arrayRemove<T = any>(existValid: undefined | ((o: T, item: T) => boolean), o: T[], item: T | T[]): T[];
export type ToTreeOption<T = any> = {
    idField?: string;
    pidField?: string;
    childrenField?: string;
    parentField?: string;
    childValid?: (parent: T, childLike: T) => boolean;
};
export declare function toTree<T = any, K = T>(option: ToTreeOption<T>, arr: Array<T>): K[];
export declare function flattenTree<T = any>(option: {
    childrenField?: string;
    childValid?: (n: T) => boolean;
    keepChildren?: boolean;
}, node: T | T[]): T[];
export declare function findTreeParent<T>(option: {
    parentField?: string;
    valid?: (parent: T) => boolean;
}, node: T): T | null;
export declare function findTreeParentFromList<T>(option: {
    pidField?: string;
    idField?: string;
    parentValid?: (parentLike: T, child: T) => boolean;
    valid: (parent: T) => boolean;
}, node: T, list: T[]): T | null;
