# changelog

自动生成changelog的示例

## git commit

如果需要自动生成有效的changelog，我们必须有规范的 `git commit`

以下是建( `yao` )议( `qiu` )的 `git commit` 格式

```bash
:gitmoji: type(scope?): subject
body?
footer?
```

### 其中各要素的用途如下

- `gitmoji`：作为视觉化辨认 commit 要素的
- `type`： 作为日志与版本环节中重要的标记结构，输出结构化的日志与语义化版本
- `scope`：限定 commit 的修改范围，可以将其体现在日志中
- `subject`：记录工作的内容，相当于一句话描述
- `body`：记录工作的详细内容，可选
- `footer`： 说明是否存在 Break Change 等，可选

### 可以更方便写出以上要求的git commit 工具

VSCode Gitmoji 插件



#### 命令行工具

[gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli) 是很多人推荐的

![gitmoji-cli](https://cloud.githubusercontent.com/assets/7629661/20454643/11eb9e40-ae47-11e6-90db-a1ad8a87b495.gif)

```bash
npm i -g gitmoji-cli
# 或者
brew install gitmoji
```
