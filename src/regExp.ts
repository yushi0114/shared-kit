/*
 * @Description: 正则表达式
 * @FilePath: \dms-web\src\utils\regExp.ts
 * @Author: zys
 * @Date: 2022-11-07 17:10:55
 * @LastEditTime: 2022-11-07 17:11:10
 * @LastEditors: zys
 * @Reference:
 */
// 统一社会信用代码
export const corpCodeRegExp = new RegExp(/^91\d{6}[A-Z0-9]{10}$/);

// 期望融资金额
export const expectFinancingRegExp = new RegExp(/^[1-9]\d{0,9}$/);

// SQL和JS代码特殊字符
export const illegalSymbolRegExp = new RegExp(/[<>?!]|(select\s[\w|*]+\sfrom)/i);

// 合法字符
export const allowedSymbolRegExp = new RegExp(/^((?!([<>?!]|(select\s[\w|*]+\sfrom))).)*$/i);

// 数字正则
export const regexNumber = new RegExp(/^[0-9]*$/);

// 日期正则 yyyy-mm-dd
export const regexDate = new RegExp(/^(\d{4})-(\d{2})-(\d{2})$/);

// 汉字正则
export const regexCHNChar = new RegExp(/^[\u4E00-\u9FA5]*$/);

// 地址正则:中文 数字 英文 -#、（）()·，
export const regexAddress = new RegExp(/^[a-zA-Z0-9-#、（）()·，\u4E00-\u9FA5]{1,255}$/);

// 15位机构编码正则
export const organCodeRegExp = new RegExp(/^(?=.*\d)(?=.*[A-Z])[A-Z0-9]{15}$/);

// 机构分类正则:中文 数字 英文 -、（）()·，,
export const regexOrgType = new RegExp(/^[a-zA-Z0-9-、（）()·，,\u4E00-\u9FA5]*$/);

// export const regexPhone = new RegExp(/^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/);
export const regexPhone = new RegExp(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/);

export const regexPercent = new RegExp(/^(100|[1-9]?\d(\.\d\d?\d?)?)%$|0$/);
