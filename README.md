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

下载后先运行一下

```bash
gitmoji -i # 初始化 gitmoji 
gitmoji -g # 设置 gitmoji 的规则，自动 'git add .'，不需要signed commits，提示scope的填写
? Enable automatic "git add ." Yes
? Select how emojis should be used in commits :smile:
? Enable signed commits No
? Enable scope prompt Yes
? Set gitmojis api url https://gitmoji.dev/api/gitmojis
```

#### 常见异常

```bash
error: cannot run gpg: No such file or directory
error: gpg 数据签名失败
fatal: 写提交对象失败
```

这个一般是你设置了 `Enable signed commits` 为 `yes` ，可以通过运行 `gitmoji -g` 来设置

```bash
gitmoji -g
? Enable automatic "git add ." Yes
? Select how emojis should be used in commits :smile:
? Enable signed commits No
? Enable scope prompt Yes
? Set gitmojis api url https://gitmoji.dev/api/gitmojis
```
