import { identity, isString, curry, not } from './func';
import { ID, PID, CHILDREN, PARENT } from './const';
export function toArray(o, ...args) {
    return Array.isArray(o) ? o.slice() : [o, ...args];
}
export function arrayAdd(existValid, o, item) {
    const valid = existValid || not;
    const items = toArray(item)
        .filter(function remainItem(item) {
        return o.every(function validate(oItem) {
            return valid(oItem, item);
        });
    });
    return o.concat(items);
}
export function arrayRemove(existValid, o, item) {
    const items = toArray(item);
    const valid = existValid || Object.is;
    return o.filter(function remain(oItem) {
        return !items.some((item) => valid(oItem, item));
    });
}
export function toTree(option, arr) {
    const defaultOpt = {
        idField: ID,
        pidField: PID,
        childrenField: CHILDREN,
        /* parentField: PARENT, */
        childValid: (parent, childLike) => parent[defaultOpt.idField] === childLike[defaultOpt.pidField]
    };
    const opt = Object.assign(defaultOpt, option);
    const result = [];
    arr.forEach(function format(node) {
        const parent = arr.find(item => opt.childValid(item, node));
        if (parent) {
            if (isString(opt.parentField))
                node[opt.parentField] = parent;
            if (!Array.isArray(parent[opt.childrenField])) {
                parent[opt.childrenField] = [];
            }
            parent[opt.childrenField].push(node);
        }
        else {
            result.push(node);
        }
    });
    return result;
}
export function flattenTree(option, node) {
    const nodes = Array.isArray(node) ? node : [node];
    const result = [];
    const defaultOpt = {
        childrenField: CHILDREN,
        childValid: (n) => n[opt.childrenField] && n[opt.childrenField].length > 0,
        keepChildren: false
    };
    const opt = Object.assign(defaultOpt, option);
    function flat(n) {
        result.push(n);
        if (opt.childValid(n) /* hasChild */) {
            n[opt.childrenField].forEach(flat);
            if (!opt.keepChildren)
                delete n[opt.childrenField];
        }
    }
    nodes.forEach(flat);
    return result;
}
export function findTreeParent(option, node) {
    const defaultOpt = { parentField: PARENT, valid: identity };
    const opt = Object.assign(defaultOpt, option);
    if (opt.valid(node))
        return node;
    const parent = node[opt.parentField];
    return parent ? findTreeParent(opt, parent) : null;
}
const arrayDelete = curry(arrayRemove, undefined);
export function findTreeParentFromList(option, node, list) {
    const defaultOpt = {
        pidField: PID,
        idField: ID,
        parentValid: (parentLike, child) => parentLike[ID] === child[PID],
        valid: identity
    };
    const opt = Object.assign(defaultOpt, option);
    if (opt.valid(node))
        return node;
    const parent = list.find(n => opt.parentValid(n, node));
    if (parent === null)
        return null;
    return parent ?
        findTreeParentFromList(opt, parent, arrayDelete(list, parent)) :
        null;
}
