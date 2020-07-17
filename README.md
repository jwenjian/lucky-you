# Lucky You

[![pas](https://img.shields.io/static/v1?&message=ProgressiveApp.Store&color=74b9ff&style=flat&label=Follow%20Lucky%20You%20at)](https://progressiveapp.store/pwa/Lucky-You)

[中文简介](README_cn.md)

LuckyYou is a simple app build on [tauri](https://github.com/tauri-apps/tauri) framework to provide a crossplatform application to do a lucky draw or make a roll call on your class or similar use cases.

> Pay attention please if you are using Windows：If current windows app not working for you, please use this [PWA APP](https://luckyyou.netlify.app) instead for now.([How to use?](https://github.com/jwenjian/lucky-you/wiki/PWA-App))

## Screenshots

![截屏2020-07-02 下午9.48.48.png](https://i.loli.net/2020/07/02/YdMAVhbyqBIuS19.png)

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

### Settings button

Click to show settings dialog:

#### Common Settings

- Is multi-chose on same image allowed? [ Yes / No ]

  - Yes, One image maybe chosed more than once
  - No, Once the image being chosed, it will be exclued from later rolling.

> Note that: If set to [ No ], You can only runs x times in which x = image file count, when all the images are chosed, you must select the image folder again to continue.


## Note

1. This app is not support update directly for now, so if you have an old version, please unintall it before you install a new version

2. Your image file better be small(like less than 1Mb)，otherwise it will consume more memory

3. Your image file name better be short(like less than 10 words), otherwise it may be wrapped and replaced with `...`

### Tested OS

- Linux
  - Ubuntu
    - 20.04

- Mac OS
  - 10.15.5

- Windows
  - Windows server 2019 datecenter
    - 1809

> If you tested this app successfully on your OS that not listed here, welcome to submit an issue to tell us.

### Known Issues 

Here are some known issues that need to be fixed:

1. Cannot start app on Win7 Enterprise version with this error: "Entry Point Not Found in ole32.dll"

## Donation

Thanks for your donation, your donation will encourege me to add more feature and fix bugs if has any

### Wechat Pay

![](public/wechat.png)

### Paypal

[jwenjian@paypal.me](https://paypal.me/jwenjian/1)

## License

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/3.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/3.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/3.0/">Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License</a>.