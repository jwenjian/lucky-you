<template>
  <div id="app">
    <el-row justify="space-between" class="toobar-row">
      <el-col :span="6" :offset="18">
        <el-button class="toobar-btn" :icon="soundBtnIcon" circle @click="toggleSound"></el-button>
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
        <el-button :disabled="!readyForRoll" :type="btnType" @click="startRoll">{{ startBtnText }}</el-button>
        <el-button :disabled="rolling" type="text" @click="selectImagefolder">Select image folder...</el-button>
      </el-col>
      <el-col :span="4">
        <div class="item"></div>
      </el-col>
    </el-row>

    <el-row class="footer-row">
      <el-col :span="12">
        <p>
          Made with ❤️ by
          <a href="https://github.com/jwenjian" target="_blank">jwenjian</a>
        </p>
        <span class="copyright">
          Icons made by
          <i>Freepik</i> from
          <u>www.flaticon.com</u>
        </span>
        <span class="copyright">
          Sound made by
          <i>pierrecartoons1979</i> from
          <u>freesound.org</u>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { readBinaryFile, readDir } from "tauri/api/fs";
import { open } from "tauri/api/dialog";
import { Howl } from "howler";

export default {
  name: "App",
  data() {
    return {
      selectedImageFileName: "Who will be THE one?",
      imageUrl: "/casino.png",
      folderPath: null,
      images: [],
      idx: 0,
      stop: false,
      itv: null,
      startBtnText: "Select an image folder -> ",
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
      isPlaySound: true
    };
  },
  computed: {
    soundBtnIcon() {
      return this.isPlaySound ? "el-icon-close-notification" : "el-icon-bell";
    }
  },
  methods: {
    toggleSound() {
      this.isPlaySound = !this.isPlaySound;
      let msg = this.isPlaySound ? "Unmuted" : "Muted";
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
    doStart() {
      if (this.isPlaySound) {
        this.playRollingSound();
      }
      this.stop = false;
      this.itv = setInterval(() => {
        this.imageUrl = this.images[this.idx].uri;
        this.selectedImageFileName = this.images[this.idx].name;
        if (this.stop) {
          return;
        }
        this.idx = this.idx + 1 >= this.images.length ? 0 : this.idx + 1;
      }, 50);
      this.btnType = "danger";
      this.startBtnText = "Stop";
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
      this.itv = null;
      this.btnType = "success";
      this.startBtnText = "Start";
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

      if (!imgs || imgs.length === 1) {
        alert("no image files or only 1 image file");
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
                name: f.name.substr(0, f.name.lastIndexOf("."))
              });
              if (this.images.length === imgs.length) {
                this.btnType = "success";
                this.startBtnText = "Start";
                this.readyForRoll = true;
                this.imageUrl = "/casino.png";
                this.$message({
                  duration: 1000,
                  type: "success",
                  message: `${this.images.length} images read successfully!\r\nYou can now start to pick the lucky one.`
                });
              }
            });
          })
          .catch(err => {
            console.error("cannot read image file");
            console.error(err);
          });
      });
    },
    async selectImagefolder() {
      const dir = await open({
        directory: true
      });
      const files = await readDir(dir);
      if (!files) {
        alert("no files");
        return;
      }
      this.reset();

      this.imageUrl = "/casino.png";
      this.btnType = "";
      this.readyForRoll = false;
      this.startBtnText = "Reading image files...";
      this.convertFile2Images(files);
    },
    reset() {
      this.imageUrl = "/casino.png";
      this.selectedImageFileName = "Who will be THE one?";
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
    }
  },
  mounted() {
    console.log("mounted");
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
  background-color: #cdd1d3;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-size: cover;
}
#the-img {
  width: 300px;
  height: 300px;
  overflow: hidden;
  margin: 1em auto;
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
.footer-row {
  font-size: smaller;
  text-align: left;
  padding-left: 1em;
  margin-top: 2em;
}
#file-name-item {
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.copyright {
  display: block;
  font-size: smaller;
}
.toobar-row {
  margin-top: 1em;
}
</style>
