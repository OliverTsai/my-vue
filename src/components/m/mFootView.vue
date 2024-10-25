<template>
  <div id="footer">
    <div>
      <!--<span class="warning">
        <div>注意:网上有诈骗.所有在本站刊登广告的网站和内容，一概与本站无关，请各位网友密切注意</div>
      </span>-->
      <div>Copyright &copy; 2024 <a href="https://befunscore.com" target="_self" style="text-decoration: none; color: #FFFFFF;">BeFun Score</a>. All rights reserved.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CounterComponent',
  mounted() {
    // const script = document.createElement('script');
    // script.src = 'https://counter1.fc2.com/counter.php?id=29525698&main=1';
    // script.type = 'text/javascript';
    // this.$refs.counter.appendChild(script);
  }
};
</script>

<style lang="scss">
.footer {
    width: 100%;
    text-align: center;
    padding: 1rem;
    background-color: #f9f9f9;

    div {
        margin: 0.5rem 0;
    }

    .attention-text {
        color: blue;
    }

    .contact-text {
        color: blue;
    }

    .copyright {
        color: #333;
    }
}
</style>