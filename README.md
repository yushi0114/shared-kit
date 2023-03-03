# @sjzx/shared-kit

## startup

暂时没有私有npm仓库使用git暂存

### install

``` bash
$ npm i git+http://10.0.30.40:9191/dev1-group/sjzx-shared-kit.git#0.0.1 -S
```

### update

``` bash
# 修改`package.json/dependencies/sjzx-shared-kit` -> `xgit:http....`
$ npm i

# 目的是为了删除本地的 sjzx-shared-kit 包

# 修改`package.json/dependencies/sjzx-shared-kit` 到新 tag 版本
$ npm i
```

## usage

``` ts
import { noop } from 'sjzx-shared-kit'

api.getFoo().catch(noop)
```

## note

- shared 作为中间库没有bundle代码，这一操作会到最后的项目中进行。