<script setup>
import { ref, onMounted } from 'vue'
import Reveal from 'reveal.js'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/black.css'

const presentationRef = ref(null)
let deck = null

onMounted(() => {
  deck = new Reveal(presentationRef.value, {
    hash: true,
    slideNumber: true,
    transition: 'slide',
    backgroundTransition: 'fade'
  })
  deck.initialize()
})
</script>

<template>
  <div class="reveal-container">
    <div ref="presentationRef" class="reveal">
      <div class="slides">
        <section>
          <h1>欢迎</h1>
          <p>Web 技术分享 PPT</p>
        </section>
        <section>
          <h2>第二页</h2>
          <p>这是一个示例幻灯片</p>
        </section>
        <section>
          <h2>第三页</h2>
          <ul>
            <li>支持 Vue 3</li>
            <li>使用 Vite 构建</li>
            <li>基于 Reveal.js</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<style>
.reveal-container {
  width: 100%;
  height: 100%;
}

.reveal {
  width: 100%;
  height: 100%;
}
</style>
