# Lucky You

[中文简介](README_cn.md)

LuckyYou is a simple app build on [tauri](https://github.com/tauri-apps/tauri) framework to provide a crossplatform application to do a lucky draw or make a roll call on your class or similar use cases.

## Screenshots

![截屏2020-06-27 下午5.20.17.png](https://i.loli.net/2020/06/27/gyBWUFu1kCqQwEV.png)

## Install

Firstly you need to download from release page according to your platform, I will always release 3 files per version:

- .dmg for MacOS
- .msi for Windows
- .deb for Linux

> Note: If you are using windows and faced the problem of **Missing dll vcruntime**, please download it from [here](https://cn.dll-files.com/vcruntime140_1.dll.html) and put it to your `C:\Windows\System32` and try again.

## Use

Follow the below steps to use the app:

1. You need to prepare your image files with a meaningful name, like student's full name, and put them into one directory.

> .jpg / .jpeg / .png support only for now.

2. You start the LuckyYou app, click the "Select image fodler" button to select the directory in step 1

3. When the app reading image files done, You can click the "Start" button, and it will display every image and its filename on the screen.

4. You can click "Stop" button at any time and once you click it, the app will stop rolling and display the choosen image and its filename, i.e. the lucky one!


### Function button

There are 2 function buttons on the top-right corner.

#### Sound control button

Click this button can toggle between mute / unmute status, if the status is mute, then there will be no sound when click start or stop button

#### Language switch button

We support 2 languages for now, you can click this button to switch to your language

## Note

1. This app is not support update directly for now, so if you have an old version, please unintall it before you install a new version

2. Your image file better be small(like less than 1Mb)，otherwise it will consume more memory

3. Your image file name better be short(like less than 10 words), otherwise it may be wrapped and replaced with `...`

## License

CC0-1.0, Non-comercial