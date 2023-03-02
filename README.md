# @sjzx/shared

## startup

暂时没有私有npm仓库使用git暂存

### install

``` bash
$ npm i git+http://10.0.30.40:9191/dev1-group/sjzx-shared-kit.git#[TAG] -S
```

### update

``` bash
# 修改`package.json/dependencies/sjzx-shared` -> `xgit:http....`
$ npm i

# 目的是为了删除本地的 sjzx-shared 包

# 修改`package.json/dependencies/sjzx-shared` 到新 tag 版本
$ npm i
```

## usage

``` ts
import { noop } from 'sjzx-shared'

api.getFoo().catch(noop)
```

## note

- shared 作为中间库没有bundle代码，这一操作会到最后的项目中进行。