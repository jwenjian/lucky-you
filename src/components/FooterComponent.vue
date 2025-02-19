<template>
  <div class="footer-row">
    <div>
      <p>
        Made with ❤️ by
        <a href="https://github.com/jwenjian" target="_blank">jwenjian</a>
      </p>
      <span class="copyright">
        Version: v{{ version }}
      </span>
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
    </div>
  </div>
</template>

<script>
import packageJson from '../../package.json';

export default {
  name: 'footer-component',
  data() {
    return {
      version: packageJson.version
    }
  },
  mounted() {
    console.log(packageJson.version)
  }
};
</script>

<style>
.footer-row {
  font-size: smaller;
  text-align: left;
  padding-left: 1em;
  margin-top: 2em;
  position: absolute;
  bottom: 0;
  left: 0;
}
.copyright {
  display: block;
  font-size: smaller;
}
</style>