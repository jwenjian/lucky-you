<template>
  <el-dialog
    :title="$t('luckyYou.button.settings')"
    :visible.sync="visible"
    width="60%"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="wrapper">
      <el-tabs v-model="tabName">
        <el-tab-pane :label="$t('luckyYou.text.common')" name="common">
          <div class="settings-item-wrapper">
            <div class="label">{{ $t("luckyYou.text.commonSettings.multiTimesChosenLabel") }}</div>
            <div class="form-item">
              <el-switch
                v-model="config.common.isMultiTimesChosenAllowed"
                :active-text="$t('luckyYou.text.yes')"
                :inactive-text="$t('luckyYou.text.no')"
              ></el-switch>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <span slot="footer">
      <el-button @click="onCancel">{{ $t("luckyYou.button.cancel") }}</el-button>
      <el-button type="primary" @click="onConfirm">{{ $t("luckyYou.button.confirm") }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "donate-dialog",
  data() {
    return {
      visible: false,
      tabName: "common",
      config: {
        common: {
          isMultiTimesChosenAllowed: false
        }
      }
    };
  },
  methods: {
    showDialog() {
      this.loadSettings();
      this.visible = true;
    },
    onCancel() {
      this.visible = false;
    },
    onConfirm() {
      this.saveSettings();
      // say thanks
      this.$notify({
        type: "success",
        title: this.$t("luckyYou.message.settingsSavedTitle"),
        message: this.$t("luckyYou.message.settingsSavedMessage"),
        duration: 0
      });
      this.visible = false;
    },
    loadSettings() {
      if (localStorage && localStorage.getItem("luckyYou.config")) {
        this.config = JSON.parse(localStorage.getItem("luckyYou.config"));
      }
    },
    saveSettings() {
      localStorage.setItem("luckyYou.config", JSON.stringify(this.config));
    }
  }
};
</script>

<style>
.el-dialog {
  margin-top: 5vh;
}
.settings-item-wrapper {
  text-align: left;
  padding-left: 1ch;
  border-left: 1px solid #909399;
  margin-bottom: 2ch;
}
.settings-item-wrapper .label {
  color: #909399;
  margin-bottom: 1ch;
}
</style>