<template>
  <div id="app">
    <el-row justify="space-between" class="toolbar-row">
      <el-col :span="6" :offset="18" class="toolbar-section">
        <div class="toolbar-btn-wrapper">
          <el-button :disabled="rolling" class="toolbar-btn" circle @click="toggleSound">
            <i :class="soundBtnIcon"></i>
          </el-button>
          <span class="toolbar-btn-status">{{ soundBtnStatus }}</span>
        </div>
        <div class="toolbar-btn-wrapper">
          <el-dropdown trigger="click" @command="onLangChange">
            <el-button :disabled="rolling" class="toolbar-btn" circle>
              <i class="fas fa-globe"></i>
            </el-button>
            <span class="toolbar-btn-status">{{ $t("locale.name") }}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="en">🇬🇧</el-dropdown-item>
              <el-dropdown-item command="zh">🇨🇳</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div class="toolbar-btn-wrapper">
          <el-button :disabled="rolling" class="toolbar-btn" circle @click="showSettingsDialog">
            <i class="fas fa-cog"></i>
          </el-button>
          <span class="toolbar-btn-status">{{ $t("luckyYou.button.settings") }}</span>
        </div>

        <div class="toolbar-btn-wrapper">
          <el-button class="toolbar-btn" circle @click="showDonateDialog">
            <i class="fas fa-donate"></i>
          </el-button>
          <span class="toolbar-btn-status">{{ $t("luckyYou.button.donate") }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row justify="space-between" class="img-row">
      <el-col :span="12" :offset="6">
        <img id="the-img" :src="imageUrl" />
      </el-col>
    </el-row>

    <el-row class="name-row">
      <el-col :span="12" :offset="6">
        <h1 id="file-name-item">{{ selectedImageFileName }}</h1>
      </el-col>
    </el-row>

    <el-row justify="center" class="btn-row">
      <el-col :span="12" :offset="6">
        <el-button
          :disabled="!readyForRoll"
          :type="btnType"
          @click="startRoll"
        >{{ startBtnText }} ({{ images.length }})</el-button>
        <el-button
          :disabled="rolling"
          type="text"
          @click="selectImagefolder"
        >{{ $t('luckyYou.button.selectImageFolder') }}</el-button>
      </el-col>
      <el-col :span="4">
        <div class="item"></div>
      </el-col>
    </el-row>
    <footer-component></footer-component>
    <donate-dialog ref="donateDialog"></donate-dialog>
    <settings-dialog ref="settingsDialog"></settings-dialog>
  </div>
</template>

<script>
import { readBinaryFile, readDir } from "tauri/api/fs";
import { open } from "tauri/api/dialog";
import { Howl } from "howler";
import DonateDialog from "./components/DonateDialog";
import FooterComponent from "./components/FooterComponent";
import SettingsDialog from "./components/SettingsDialog";
import { Notification } from 'element-ui'

export default {
  name: "App",
  components: {
    "donate-dialog": DonateDialog,
    "footer-component": FooterComponent,
    "settings-dialog": SettingsDialog
  },
  data() {
    return {
      selectedImageFileName: this.$t("luckyYou.text.defaultTips"),
      imageUrl: "/casino.png",
      folderPath: null,
      images: [],
      idx: 0,
      prevIdx: 0,
      stop: false,
      itv: null,
      startBtnText: this.$t("luckyYou.button.start"),
      readyForRoll: false,
      rolling: false,
      btnType: "succcess",
      imgRowStyle: {
        backgroundImage: null
      },
      sound: {
        rolling: null,
        success: null
      },
      isPlaySound: true,
      donateDialogVisible: false,
      config: {
        common: {
          isMultiTimesChosenAllowed: false
        }
      }
    };
  },
  computed: {
    soundBtnIcon() {
      return this.isPlaySound ? "fas fa-volume-up" : "fas fa-volume-mute";
    },
    soundBtnStatus() {
      return this.isPlaySound
        ? this.$t("luckyYou.text.unmuted")
        : this.$t("luckyYou.text.muted");
    }
  },
  methods: {
    showSettingsDialog() {
      this.$refs["settingsDialog"] && this.$refs["settingsDialog"].showDialog();
    },
    showDonateDialog() {
      this.$refs["donateDialog"] && this.$refs["donateDialog"].showDialog();
    },
    shortenImageName(fullImageName) {
      let orig = fullImageName;
      if ("Windows" === this.getOS()) {
        if (fullImageName.indexOf("/") > 0) {
          orig = fullImageName.substr(
            fullImageName.lastIndexOf("/") + 1,
            fullImageName.length
          );
        }
        if (fullImageName.indexOf("\\") > 0) {
          orig = fullImageName.substr(
            fullImageName.lastIndexOf("\\") + 1,
            fullImageName.length
          );
        }
      }
      return orig.substr(0, orig.lastIndexOf("."));
    },
    getOS() {
      var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
        windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
        iosPlatforms = ["iPhone", "iPad", "iPod"],
        os = null;

      if (macosPlatforms.indexOf(platform) !== -1) {
        os = "Mac OS";
      } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = "iOS";
      } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = "Windows";
      } else if (/Android/.test(userAgent)) {
        os = "Android";
      } else if (!os && /Linux/.test(platform)) {
        os = "Linux";
      }

      return os;
    },
    onLangChange(lang) {
      this.$i18n.locale = lang;
      this._changeDynamicTextLang();
    },
    _changeDynamicTextLang() {
      // start button, ugly implementation, only start button text need to do this currently
      this.startBtnText = this.$t("luckyYou.button.start");
      // if the tips is default tip, then set the default tip in current lang
      if (
        this.selectedImageFileName ===
          this.$t("luckyYou.text.defaultTips", "zh") ||
        this.selectedImageFileName ===
          this.$t("luckyYou.text.defaultTips", "en")
      ) {
        this.selectedImageFileName = this.$t("luckyYou.text.defaultTips");
      }
    },
    toggleSound() {
      this.isPlaySound = !this.isPlaySound;
      let msg = this.isPlaySound
        ? this.$t("luckyYou.text.unmuted")
        : this.$t("luckyYou.text.muted");
      this.$message({
        duration: 1000,
        type: "info",
        message: msg
      });
    },
    stopRoll() {
      this.stop = true;
      clearInterval(this.itv);
      this.itv = null;
    },
    playRollingSound() {
      this.sound.rolling.play();
    },
    stopRollingSound() {
      this.sound.rolling.pause();
    },
    playSuccessSound() {
      this.sound.success.play();
    },
    showLastImageNotification() {
      // close all current notifications
      Notification.closeAll()
      const image = this.images[0];
      const h = this.$createElement;
      this.$notify({
        type: "warning",
        title: this.$t("luckyYou.message.lastImageTitle"),
        message: h("div", {}, [
          h("img", {
            attrs: { src: image.uri },
            style: { width: "80px", height: "80px" }
          }),
          h("p", {}, image.name)
        ]),
        duration: 0
      });
      this.images = [];
    },
    doStart() {
      if (this.images.length === 1) {
        this.readyForRoll = false;
        this.showLastImageNotification();
        // set rolling to true to make select image folder button available
        this.rolling = true;
        return;
      }
      if (this.isPlaySound) {
        this.playRollingSound();
      }
      this.stop = false;
      this.itv = setInterval(() => {
        this.prevIdx = this.idx;
        this.imageUrl = this.images[this.idx].uri;
        this.selectedImageFileName = this.images[this.idx].name;
        if (this.stop) {
          return;
        }
        this.idx = this.idx + 1 >= this.images.length ? 0 : this.idx + 1;
      }, 50);
      this.btnType = "danger";
      this.startBtnText = this.$t("luckyYou.button.stop");
    },
    doStop() {
      if (this.isPlaySound) {
        this.playSuccessSound();
      }
      this.stop = true;
      clearInterval(this.itv);
      if (this.isPlaySound) {
        this.stopRollingSound();
      }
      if (!this.config.common.isMultiTimesChosenAllowed) {
        this.removeChosedImage();
      }
      this.itv = null;
      this.btnType = "success";
      this.startBtnText = this.$t("luckyYou.button.start");
    },
    removeChosedImage() {
      if (this.images.length <= 1) {
        this.images = [];
        return;
      }
      const temp = this.images
        .slice(0, this.prevIdx)
        .concat(this.images.slice(this.prevIdx + 1, this.images.length));
      this.idx = Math.min(this.prevIdx, temp.length - 1);
      this.images = temp;
    },
    startRoll() {
      if (this.rolling) {
        this.doStop();
      } else {
        this.doStart();
      }
      this.rolling = !this.rolling;
    },
    arrayBufferToBase64(buffer, callback) {
      var blob = new Blob([buffer], {
        type: "application/octet-binary"
      });
      var reader = new FileReader();
      reader.onload = function(evt) {
        var dataurl = evt.target.result;
        callback(dataurl.substr(dataurl.indexOf(",") + 1));
      };
      reader.readAsDataURL(blob);
    },
    convertFile2Images(files) {
      // [{path, is_dir, name}]
      if (!files) {
        return [];
      }

      const imgs = files.filter(f => {
        let fname = f.name.toLowerCase();
        if (
          fname.endsWith(".jpg") ||
          fname.endsWith(".jpeg") ||
          fname.endsWith(".png")
        ) {
          return true;
        } else {
          return false;
        }
      });

      if (imgs === null || imgs.length <= 1) {
        this.startBtnText = this.$t("luckyYou.button.start");
        this.$message({
          type: "error",
          message: this.$t("luckyYou.message.noImage")
        });
        return [];
      }

      this.images = [];
      imgs.forEach(f => {
        readBinaryFile(f.path)
          .then(res => {
            this.arrayBufferToBase64(new Uint8Array(res), b64 => {
              this.images = this.images.concat({
                path: f.path,
                uri: "data:image/png;base64," + b64,
                name: this.shortenImageName(f.name)
              });
              if (this.images.length === imgs.length) {
                // reload config items
                this.loadConfig()
                this.btnType = "success";
                this.startBtnText = this.$t("luckyYou.button.start");
                this.readyForRoll = true;
                this.imageUrl = "/casino.png";
                this.$message({
                  duration: 1000,
                  type: "success",
                  message: this.$t("luckyYou.message.readDone").format(
                    this.images.length
                  )
                });
              }
            });
          })
          .catch(err => {
            console.error(err);
            this.$message({
              type: "error",
              message: this.$t("luckyYou.message.commonError")
            });
          });
      });
    },
    async selectImagefolder() {
      const dir = await open({
        directory: true
      });
      const files = await readDir(dir);
      if (!files) {
        this.$message({
          type: "error",
          message: this.$t("luckyYou.message.noImage")
        });
        return;
      }
      this.reset();

      this.imageUrl = "/casino.png";
      this.btnType = "";
      this.readyForRoll = false;
      this.startBtnText = this.$t("luckyYou.button.readingImage");
      this.convertFile2Images(files);
    },
    reset() {
      this.imageUrl = "/casino.png";
      this.selectedImageFileName = this.$t("luckyYou.text.defaultTips");
      this.imageUrl = null;
      this.idx = 0;
      this.images = [];
      this.rolling = false;
    },
    filterImages(files) {
      if (!files) {
        return [];
      }
      return files.filter(f => {
        let fname = f.name.toLowerCase();
        if (
          fname.endsWith(".jpg") ||
          fname.endsWith(".jpeg") ||
          fname.endsWith(".png")
        ) {
          return true;
        } else {
          return false;
        }
      });
    },
    loadConfig() {
      if (localStorage && localStorage.getItem("luckyYou.config")) {
        this.config = JSON.parse(localStorage.getItem("luckyYou.config"));
      }
    }
  },
  mounted() {
    this.loadConfig();
    console.log(this.config.common.isMultiTimesChosenAllowed);
    this.sound.rolling = new Howl({
      src: ["rolling.mp3"],
      loop: true
    });
    this.sound.success = new Howl({
      src: ["success.mp3"]
    });
  }
};
</script>

<style>
html body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: white;
  background-size: cover;
  background-image: url("/bg.png");
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
#the-img {
  width: 300px;
  height: 300px;
  overflow: hidden;
  margin: 0.5em auto;
  display: block;
  border: 2px #ec2d7a dashed;
}
#the-img:hover {
  border: 2px #207f4c dashed;
}
.name-row {
  margin-top: 0.5em;
}
.btn-row {
  margin-top: 0.5em;
}

#file-name-item {
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toolbar-row {
  margin-top: 0.5em;
}
.toolbar-btn {
  margin-left: 0.5em;
}
.toolbar-btn-status {
  display: block;
  font-size: x-small;
  font-weight: bold;
  color: #606266;
}
.toolbar-section {
  display: flex;
  justify-content: flex-end;
  padding-right: 1em;
}
.toolbar-btn-wrapper {
  margin-left: 0.5em;
  align-content: flex-end;
}
</style>
