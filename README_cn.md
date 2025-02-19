# Lucky You

> 基于 Tauri v2 的新版本已经更新， 移步 Release 页面下载即可。

LuckyYou 是一个基于 [tauri](https://github.com/tauri-apps/tauri) 框架开发的跨平台软件，你可以用它来做抽奖活动或者课堂点名或者其他类似的使用场景中。

## 截图

![截屏2020-07-02 下午9.48.54.png](https://i.loli.net/2020/07/02/KjhqGRrbJpCMIl9.png)

## 安装

首先你需要根据你使用的系统去 release 页面下载对应的安装包，每个版本都会有 3 个文件：

- MacOS 系统使用 .dmg 文件
- Windows 系统使用 .msi 文件
- Linux 系统使用 .deb 文件

> 注意：如果你使用的是 Windows 系统，在启动时遇到 “缺少 Dll： vcruntime” 的错误提示，请到 [这里](https://cn.dll-files.com/vcruntime140_1.dll.html) 下载一个 dll，之后将这个 dll 放置到你的 `C:\Windows\System32` 中，再尝试启动。

## 使用

请遵照以下步骤使用此软件：

1. 你需要准备好你的图片文件，给每个图片文件一个有意义的名字，然后把这些文件放到一个文件夹内

> 目前支持：.jpg / .jpeg / .png 格式

2. 打开 LuckyYou 软件，点击 “Select image folder” 按钮，选中第一步中的文件夹

3. 等待软件读取图片文件完成，完成后你可以点击 “Start” 按钮，此时软件就会快速的依次将图片和对应的文件名滚动显示在屏幕上。

4. 你可以在任意时间点击 “Stop” 按钮，一旦点击，程序就会停止滚动并展示此刻被选中的图片及它的文件名。

### 功能按钮

软件右上角提供 2 个功能按钮

#### 声音控制按钮

点击此按钮可以在 静音 / 非静音 状态之间切换，如果是静音状态，则点击 开始 和 停止 按钮时不会播放声音

#### 语言切换按钮

当前软件支持两种语言，中文 / 英文，你可以点击这个按钮切换至你想要的语言

### 设置按钮

点击设置按钮打开设置弹窗: 

#### 通用设置

- 是否允许一张图片被多次选中？【 是 / 否 】

  - 是, 一张图片可能会被选中多次
  - 否, 一旦一张图片被选中，它将被从之后的运行中排除，保证只能被选中一次

> 注意：如果设置为 【否】，那么你将只能最多运行 x 次，其中 x 等于图片文件的数量，一旦所有图片都被选中，你必须重新选择图片文件夹来重新开始。


## 注意

1. 目前该软件还不支持直接更新，如果你已经安装了老版本，请先卸载老版本，再安装新版本

2. 你的图片文件不宜过大（比如超过1Mb），否则会占用比较多内存

3. 你的图片文件名不宜过长，否则可能会展示不全，以 10 字以内为宜

### 已测试的操作系统

- Linux
  - Ubuntu
    - 20.04

- Mac OS
  - 10.15.5

- Windows
  - Windows server 2019 datecenter
    - 1809

> 如果你已经在你的操作系统上成功安装运行了此软件，但是这里并没有列出你的操作系统，欢迎你提出一个 Issue 来告诉我们。

## 捐赠

感谢你的捐赠，你的捐赠会鼓励我添加更多新功能以及修复可能有的 bug

### 微信支付

![](public/wechat.png)

### 贝宝支付

[jwenjian@paypal.me](https://paypal.me/jwenjian/1)


## 开源协议

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/3.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/3.0/88x31.png" /></a><br />本作品采用<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/3.0/">知识共享署名-非商业性使用-禁止演绎 3.0 未本地化版本许可协议</a>进行许可。
