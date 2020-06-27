# Lucky You

LuckyYou 是一个基于 [tauri](https://github.com/tauri-apps/tauri) 框架开发的跨平台软件，你可以用它来做抽奖活动或者课堂点名或者其他类似的使用场景中。

## 安装

首先你需要根据你使用的系统去 release 页面下载对应的安装包，每个版本都会有 3 个文件：

- MacOS 系统使用 .dmg 文件
- Windows 系统使用 .msi 文件
- Linux 系统使用 .deb 文件

> 注意：如果你使用的是 Windows 系统，在启动时遇到 “缺少 Dll： vcruntime” 的错误提示，请到 [这里](https://cn.dll-files.com/vcruntime140_1.dll.html) 下载一个 dll，之后将这个 dll 放置到你的 `C:\Windows\System32` 中，再尝试启动。

## 使用

请遵照以下步骤使用此软件：

1. 你需要准备好你的图片文件，给每个图片文件一个有意义的名字，然后把这些文件放到一个文件夹内

2. 打开 LuckyYou 软件，点击 “Select image folder” 按钮，选中第一步中的文件夹

3. 等待软件读取图片文件完成，完成后你可以点击 “Start” 按钮，此时软件就会快速的依次将图片和对应的文件名滚动显示在屏幕上。

4. 你可以在任意时间点击 “Stop” 按钮，一旦点击，程序就会停止滚动并展示此刻被选中的图片及它的文件名。

## 开源协议

CC0-1.0, 署名，非商业。