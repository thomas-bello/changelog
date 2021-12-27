# changelog

自动生成changelog的示例

## Git commit

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

#### VSCode Gitmoji 插件

[seatonjiang.gitmoji-vscode](https://github.com/seatonjiang/gitmoji-vscode)

![seatonjiang.gitmoji-vscode](https://cdn.jsdelivr.net/gh/seatonjiang/gitmoji-vscode@main/images/about.gif)

已经添加到本项目的[推荐插件](/.vscode/extensions.json)

```json
{
    "recommendations": [
        "seatonjiang.gitmoji-vscode"
    ]
}
```

注意这种方法只会提供 `subject` 的填写，更详细的 `body` 内容需要命令行工具。

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
gitmoji -g # 设置 gitmoji 的规则，自动 'git add .'，signed commits，提示scope的填写
? Enable automatic "git add ." Yes
? Select how emojis should be used in commits :smile:
? Enable signed commits No
? Enable scope prompt No
? Set gitmojis api url https://gitmoji.dev/api/gitmojis
```

#### 常见异常

```bash
error: cannot run gpg: No such file or directory
error: gpg 数据签名失败
fatal: 写提交对象失败
```

这个一般是你设置了 `Enable signed commits` 为 `yes`，可以通过运行 `gitmoji -g` 来设置为 `No`，不过这样在github 上的commit信息就只有你的名字不能点击跳到你的主页。

```bash
gitmoji -g
? Enable automatic "git add ." Yes
? Select how emojis should be used in commits :smile:
? Enable signed commits No
? Enable scope prompt No
? Set gitmojis api url https://gitmoji.dev/api/gitmojis
```

## Commitlint

如果要每个人都非常自觉的按照约定格式提交 commit 信息，那是不可能的事情。所以需要工具的配合

通过 [commitlint](https://github.com/conventional-changelog/commitlint) + [husky](https://github.com/typicode/husky) 来对git提交的生命周期挟持来做commit信息的校验

![commitlint](https://commitlint.js.org/assets/commitlint.svg)

```bash
# 使用npm管理依赖的项目
yarn add -D commitlint-config-gitmoji commitlint husky
```

然后在 [package.json](package.json) 内添加

```json
{
  "commitlint": {
    "extends": ["gitmoji"]
  }
}
```

```bash
# 添加 husky 环境
yarn husky install

# 添加 commit-msg 时需要运行的命令
yarn husky add .husky/commit-msg 'yarn commitlint --edit $1'
```

运行完后会多了三个文件

- [.husky/commit-msg](.husky/commit-msg)
- [.husky/_/husky.sh](.husky/_/husky.sh)
- [.husky/_/.gitignore](.husky/_/.gitignore)

在 `.husky/commit-msg` 内

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn commitlint --edit $1
```

留意这里 `. "$(dirname "$0")/_/husky.sh"` 需要把 [.husky/_/.gitignore](.husky/_/.gitignore) 删除才可以把该文件上传，不然其他人下载还是不会有校验

这个时候无论你是在命令行控制台还是vscode上提交代码都会有本地的 `commitlint` 拦截校验

```bash
git add .
git commit -m "我偏不信你可以拦住我"
yarn run v1.22.4

changelog/node_modules/.bin/commitlint --edit .git/COMMIT_EDITMSG
⧗   input: 我偏不信你可以拦住我
✖   Your commit should start with gitmoji code,please check the emoji code on https://gitmoji.dev/. [start-with-gitmoji]
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 3 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
husky - commit-msg hook exited with code 1 (error)
```

这里安装的 [commitlint-config-gitmoji](https://github.com/arvinxx/gitmoji-commit-workflow/tree/master/packages/commitlint-config) 其规范为 [commitlint-config-gitmoji规范 2.0](https://www.yuque.com/arvinxx-fe/workflow/gcm-v2)

每次提交，Commit message 都包括三个部分： Header ， Body  和  Footer。

```bash
:gitmoji: type(scope?) subject(#ID)
BLANK LINE
Message Body
BLANK LINE
Footer
```

相关规则为：

1. Commit Message 必须以 Gitmoji 开头
2. Header 是必需的，Body 和 Footer 可以省略
3. Header 的标题（Subject）首字母需要小写（如果是英文的话）
4. 标题行结尾不能使用标点符号（如句号等）
5. Header 必须只能包含一个 type，type 可用的类型请查阅 [gitmoji type](https://github.com/arvinxx/gitmoji-commit-workflow/tree/master/packages/commit-types) 类型
6. 如 Commit 解决 Issue 在 Header 最后请以 (#ID)  结尾。同时在Body 中关闭 Issue 。（详情参考：[Closing issues using keywords](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)）
7. Header 与 Body 每一行必须控制在 72 个字符以内
8. 在 Body 中使用 [Markdown](https://github.com/younghz/Markdown) 语法进行书写
9. 动词使用一般现在时 。（ "Add feature" 而不是 "Added feature"）
10. 使用祈使句语法。（ "Move cursor to…" 而不是  "Moves cursor to…"）
11. 在 Body 中说明「是什么」、「为什么」与「怎么做」
12. 所有的 WIP ( Work In Progress ) Commits 必须要有 WIP 的 Emoji

#### 关于commit信息中的换行

