<template>
  <el-dialog
    :title="$t('luckyYou.button.donate')"
    :visible.sync="visible"
    width="60%"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <div class="wrapper">
      <h4>{{ $t("luckyYou.text.donateTips") }}</h4>
      <el-tabs v-model="tabName">
        <el-tab-pane :label="$t('luckyYou.text.wechat')" name="common">
          <img src="/wechat.png" />
        </el-tab-pane>
        <el-tab-pane :label="$t('luckyYou.text.paypal')" name="paypal">
          <a href="http://paypal.me/jwenjian/1" target="_blank">{{$t('luckyYou.text.paypal')}}</a>
        </el-tab-pane>
      </el-tabs>
    </div>
    <span slot="footer">
      <el-button @click="onNextTime">{{ $t("luckyYou.button.nextTime") }}</el-button>
      <el-button type="primary" @click="onDonated">{{ $t("luckyYou.button.donated") }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "donate-dialog",
  data() {
    return {
      visible: false,
      tabName: "common"
    };
  },
  methods: {
    showDialog() {
      this.visible = true;
    },
    onNextTime() {
      this.$message({
        type: "info",
        message: this.$t("luckyYou.message.nextTime")
      });
      this.visible = false;
    },
    onDonated() {
      // say thanks
      this.$notify({
        type: "success",
        title: this.$t("luckyYou.message.donatedTipsTitle"),
        message: this.$t("luckyYou.message.donatedTipsMessage"),
        duration: 0
      });
      this.visible = false;
    }
  }
};
</script>

<style>
.el-dialog {
  margin-top: 5vh;
}
</style>