
import { identity, isString, curry, not } from './func';
import { ID, PID, CHILDREN, PARENT } from './const';

export type ExistValidFunc<T = any> = undefined | ((oItem: T, item: T) => boolean);

export function toArray<T = any>(o: T | T[], ...args: any[]): T[] {
    return Array.isArray(o) ? o.slice() : [o, ...args];
}

export function arrayAdd<T = any>(
    existValid: ExistValidFunc<T>,
    o: T[],
    item: T | T[]
): T[] {

    const valid = existValid || not;
    const items = toArray(item)
        .filter(function remainItem(item) {
            return o.every(function validate(oItem) {
                return valid(oItem, item);
            });
        });

    return o.concat(items);
}

export function arrayRemove<T = any>(
    existValid: undefined | ((o: T, item: T) => boolean),
    o: T[],
    item: T | T[],
): T[] {
    const items = toArray(item);
    const valid = existValid || Object.is;

    return o.filter(function remain(oItem) {
        return !items.some((item) => valid(oItem, item));
    });
}

export type ToTreeOption<T = any> = {
    idField?: string,
    pidField?: string,
    childrenField?: string,
    parentField?: string,
    childValid?: (parent: T, childLike: T) => boolean
}

export function toTree<T = any, K = T>(
    option: ToTreeOption<T>,
    arr: Array<T>
) {

    const defaultOpt = {
        idField: ID,
        pidField: PID,
        childrenField: CHILDREN,
        /* parentField: PARENT, */
        childValid: (parent: T, childLike: T) => parent[defaultOpt.idField as keyof T] === childLike[defaultOpt.pidField as keyof T]
    };
    const opt = Object.assign(defaultOpt, option);
    const result: K[] = [];

    arr.forEach(function format(node: T) {
        const parent = arr.find(item => opt.childValid(item, node));

        if (parent) {
            if (isString(opt.parentField)) (node as any)[opt.parentField as string] = parent;
            if (!Array.isArray((parent as any)[opt.childrenField])) {
                (parent as any)[opt.childrenField] = [];
            }
            (parent as any)[opt.childrenField].push(node);
        }
        else {
            result.push(node as any);
        }
    });

    return result;

}

export function flattenTree<T = any>(
    option: { childrenField?: string, childValid?: (n: T) => boolean, keepChildren?: boolean },
    node: T | T[]
) {

    const nodes = Array.isArray(node) ? node : [node];
    const result: T[] = [];
    const defaultOpt = {
        childrenField: CHILDREN,
        childValid: (n: T) => (n as any)[opt.childrenField] && (n as any)[opt.childrenField].length > 0,
        keepChildren: false
    };
    const opt = Object.assign(defaultOpt, option);

    function flat(n: T) {

        result.push(n);

        if (opt.childValid(n)/* hasChild */) {
            (n as any)[opt.childrenField].forEach(flat);
            if (!opt.keepChildren) delete (n as any)[opt.childrenField];
        }
    }

    nodes.forEach(flat);

    return result;
}

export function findTreeParent<T>(
    option: {
        parentField?: string
        valid?: (parent: T) => boolean
    },
    node: T
): T | null {

    const defaultOpt = { parentField: PARENT, valid: identity };
    const opt = Object.assign(defaultOpt, option);

    if (opt.valid(node)) return node;
    const parent = (node as any)[opt.parentField];
    return parent ? findTreeParent(opt, parent) : null;
}

const arrayDelete = curry(arrayRemove, undefined);

export function findTreeParentFromList<T>(
    option: {
        pidField?: string,
        idField?: string,
        parentValid?: (parentLike: T, child: T) => boolean,
        valid: (parent: T) => boolean
    },
    node: T,
    list: T[]
): T | null {
    const defaultOpt = {
        pidField: PID,
        idField: ID,
        parentValid: (parentLike: T, child: T) => (parentLike as any)[ID] === (child as any)[PID],
        valid: identity
    };

    const opt = Object.assign(defaultOpt, option);


    if (opt.valid(node)) return node;
    const parent = list.find(n => opt.parentValid(n, node));
    if (parent === null) return null;

    return parent ?
        findTreeParentFromList(opt, parent, arrayDelete(list, parent)) :
        null;
}
