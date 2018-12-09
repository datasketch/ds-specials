<template>
  <div class="loader">
    <div
      :style="styles"
      class="spinner" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    message: {
      type: String,
      default: 'Cargando'
    },
    size: {
      type: Number,
      default: 20
    },
    color: {
      type: String,
      default: '#501981'
    },
    borderWidth: {
      type: Number,
      default: 5
    }
  },
  computed: {
    styles () {
      const size = this.size
      const color = this.color
      const borderWidth = this.borderWidth
      const css = {}
      css.borderWidth = borderWidth + 'px'
      css.width = css.height = size + 'px'
      css.borderTopColor = color
      return css
    }
  }
}
</script>


<style scoped>
.spinner {
  animation-delay: 0s;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-name: spin;
  animation-timing-function: ease-in-out;
  animation-direction: normal;
  border-color: #f3f3f3;
  border-radius: 50%;
  border-style: solid;
  position: relative;
}

.loader {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.loader p {
  font-size: small;
  margin: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
