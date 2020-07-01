<template>
<!-- Forked project please do not remove or change the donation info, be gentleman -->
<!-- Forked 的项目中，请不要删除或修改捐赠信息，尊重劳动成果，谢谢 -->
  <el-dialog
    :title="$t('luckyYou.button.donate')"
    :visible.sync="visible"
    width="60%"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="wrapper">
      <h4>{{ $t("luckyYou.text.donateTips") }}</h4>
      <el-tabs v-model="tabName">
        <el-tab-pane :label="$t('luckyYou.text.wechat')" name="wechat">
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
  <!-- Forked 的项目中，请不要删除或修改捐赠信息，尊重劳动成果，谢谢 -->
  <!-- Forked project please do not remove or change the donation info, be gentleman -->
</template>

<script>
export default {
  name: "donate-dialog",
  data() {
    return {
      visible: false,
      tabName: "wechat"
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