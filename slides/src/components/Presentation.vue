<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from "vue";
import gsap from "gsap";
import Slide06ApiPayload from "./slides/Slide06ApiPayload.vue";
import Slide09LegacyRefactor from "./slides/Slide09LegacyRefactor.vue";

const currentSlide = ref(0);
const totalSlides = ref(14);
const isAnimating = ref(false);

const chapters = {
  0: "封面",
  1: "目录",
  2: "第一部分",
  3: "AI 输入变革",
  4: "全模态架构对比",
  5: "API 调用变革",
  6: "第二部分",
  7: "OCR 架构与演进",
  8: "第三部分",
  9: "Legacy 界面重构演示",
  10: "简历筛选流程",
  11: "边界防御",
  12: "实战案例",
  13: "结束",
};

const showHeader = computed(
  () => currentSlide.value >= 3 && currentSlide.value <= 12,
);

const tocItemsData = [
  {
    num: "01",
    title: '从纯文本到全模态：AI"感知系统"的代际跃迁',
    desc: "Omni 模型概述",
  },
  {
    num: "02",
    title: 'OCR 3.0：从"看见字符"到"理解文档"',
    desc: "外置OCR → 原生融合",
  },
  {
    num: "03",
    title: '动态变量：从固定提示词到"上下文工程"',
    desc: "模板与变量注入",
  },
];

const archCompareData = [
  {
    type: "old",
    title: "旧时代架构",
    flow: "附件 → 文件解析器/提取器 → 纯文本 → LLM",
    issue: "信息损耗严重，丢失排版、颜色、空间关系",
  },
  {
    type: "new",
    title: "新一代架构 - 全模态模型",
    flow: "图像 Patch、音频帧与文本 Token 在底层 Transformer 中被映射到同一高维隐空间 (Latent Space)",
    issue: "",
  },
];

const conceptCardsData = [
  {
    icon: "🧬",
    title: "原生 Native",
    desc: "设计之初将多模态能力作为基因",
  },
  {
    icon: "🏗️",
    title: "统一架构",
    desc: "统一编码器+Transformer 融合理解",
  },
  {
    icon: "⚡",
    title: "原生 I/O",
    desc: "直接接收音视频原始信号",
  },
];

const modelsData = [
  {
    name: "GPT-4o",
    org: "OpenAI",
    feature: "首个端到端统一架构，实时音视频交互",
  },
  {
    name: "Gemini 3.1 Pro",
    org: "Google",
    feature: "1 小时视频 +8.4 小时音频处理",
  },
  {
    name: "Claude Opus 4.5",
    org: "Anthropic",
    feature: "视觉分析、图表理解出色",
  },
  {
    name: "Qwen3.5-Omni",
    org: "阿里通义",
    feature: "113 语种，215 项任务 SOTA",
  },
  {
    name: "Kimi K2.5",
    org: "月之暗面",
    feature: "跨模态推理和视觉智能体",
  },
  {
    name: "MiMo-V2-Omni",
    org: "小米",
    feature: "原生融合感知、GUI 操作",
  },
  {
    name: "Nemotron 3 Omni",
    org: "NVIDIA",
    feature: "融合音视文理解与原生工具调用，赋能代理式 AI 应用",
  },
  {
    name: "Kling 3.0 Omni",
    org: "快手",
    feature: "统一多模态视频生成架构，全流程 AI 生产力引擎",
  },
];

const ocrStagesData = [
  {
    title: "外置 OCR 管道",
    steps: ["OCR 工具", "提取文字", "纯文本模型"],
    desc: "Tesseract / PaddleOCR 扫描图片 → 喂给 LLM 做阅读理解",
  },
  {
    title: "原生三部走",
    steps: ["视觉编码器 ViT", "映射层 Projector", "大语言模型 LLM"],
    desc: "视觉 Token → 翻译到词嵌入空间 → LLM 理解推理",
  },
  {
    title: "原生融合",
    steps: ["路线一：离散 Token 化", "路线二：端到端原生"],
    desc: '统一"离散 Token"序列 或 重构底层注意力机制',
    highlight: true,
  },
];

const archNotesData = [
  { label: "外置 OCR", text: "信息丢失严重，无法理解版面结构" },
  { label: "原生融合", text: "保留完整视觉信息，深度理解文档语义" },
];

const nextSlide = () => {
  if (isAnimating.value || currentSlide.value >= totalSlides - 1) return;
  isAnimating.value = true;
  currentSlide.value++;
  setTimeout(() => {
    isAnimating.value = false;
  }, 600);
};

const prevSlide = () => {
  if (isAnimating.value || currentSlide.value <= 0) return;
  isAnimating.value = true;
  currentSlide.value--;
  setTimeout(() => {
    isAnimating.value = false;
  }, 600);
};

const goToSlide = (index) => {
  if (isAnimating.value || index === currentSlide.value) return;
  isAnimating.value = true;
  currentSlide.value = index;
  setTimeout(() => {
    isAnimating.value = false;
  }, 600);
};

const handleKeydown = (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
    e.preventDefault();
    nextSlide();
  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    prevSlide();
  } else if (e.key === "Home") {
    e.preventDefault();
    goToSlide(0);
  } else if (e.key === "End") {
    e.preventDefault();
    goToSlide(totalSlides - 1);
  }
};

const playEnterAnimation = (slideIndex) => {
  nextTick(() => {
    const slideEl = document.querySelector(`.slide-${slideIndex}`);
    if (!slideEl) return;

    gsap.fromTo(
      slideEl.querySelectorAll(".fade-in"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
    );

    gsap.fromTo(
      slideEl.querySelectorAll(".slide-up"),
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
    );

    gsap.fromTo(
      slideEl.querySelectorAll(".slide-left"),
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
    );

    gsap.fromTo(
      slideEl.querySelectorAll(".scale-in"),
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
    );
  });
};

const handleResize = () => {
  if (coverRenderer && coverCamera && coverContainer.value) {
    const width = coverContainer.value.clientWidth;
    const height = coverContainer.value.clientHeight;
    coverRenderer.setSize(width, height);
    coverCamera.aspect = width / height;
    coverCamera.updateProjectionMatrix();
  }
};

watch(currentSlide, (newVal) => {
  playEnterAnimation(newVal);
});

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("resize", handleResize);

  nextTick(() => {
    playEnterAnimation(0);
  });
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="presentation">
    <!-- Blue Geometric Background for Cover/Ending -->
    <div class="geo-bg" v-if="currentSlide === 0 || currentSlide === 12">
      <img src="/images/cover-bg.png" class="cover-bg-img" alt="" />
    </div>

    <!-- Header for content pages -->
    <header class="slide-header" v-if="showHeader">
      <div class="header-logo">
        <img src="/images/logo.svg" alt="博远" class="header-logo-img" />
      </div>
      <div class="header-chapter">{{ chapters[currentSlide] }}</div>
    </header>

    <div class="slides-container">
      <!-- Slide 1: Cover -->
      <div class="slide slide-0" :class="{ active: currentSlide === 0 }">
        <div class="cover-content">
          <div class="cover-main">
            <div class="cover-logo-section slide-up">
              <img
                src="/images/logo-icon.png"
                alt="博远"
                class="cover-logo-img"
              />
              <div class="cover-logo-text">
                <h1 class="cover-title">博远信息技术社</h1>
                <p class="cover-subtitle">Boyuan IT Club</p>
              </div>
            </div>
            <div class="cover-year slide-up delay-1">
              <span class="year-box">2 0 2 6</span>
            </div>
          </div>
          <footer class="cover-footer slide-up delay-2">
            <span>多模态输入处理 · 附件、OCR 与动态变量</span>
            <span class="cover-date">2026 年技术分享</span>
          </footer>
        </div>
      </div>

      <!-- Slide 2: TOC -->
      <div class="slide slide-1" :class="{ active: currentSlide === 1 }">
        <div class="toc-left">
          <div class="toc-logo">
            <img src="/images/logo-full.png" alt="博远" class="toc-logo-img" />
          </div>
        </div>
        <div class="toc-right">
          <div class="toc-header">
            <h2 class="toc-section-title">第2节：多模态输入处理</h2>
            <span class="toc-label">CONTENTS</span>
          </div>
          <div class="toc-list">
            <div
              class="toc-item slide-left"
              ref="tocItems"
              v-for="(item, idx) in tocItemsData"
              :key="idx"
            >
              <span class="toc-num">{{ item.num }}</span>
              <div class="toc-bar"></div>
              <div class="toc-text">
                <span class="toc-part">Part-{{ idx + 1 }}</span>
                <span class="toc-main">{{ item.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Slide 3: Part 1 Cover -->
      <div
        class="slide slide-2 part-cover"
        :class="{ active: currentSlide === 2 }"
      >
        <div class="part-decoration-left">
          <img src="/images/logo-icon.png" alt="" class="part-logo-img" />
        </div>
        <div class="part-content">
          <span class="part-badge slide-up">PART - 1</span>
          <h2 class="part-title slide-up delay-1">从纯文本到全模态</h2>
          <p class="part-subtitle slide-up delay-2">AI "感知系统"的代际跃迁</p>
        </div>
        <div class="part-decoration-right">
          <img
            src="/images/triangle-right.png"
            alt=""
            class="deco-triangle-img"
          />
          <img
            src="/images/triangle-small.png"
            alt=""
            class="deco-triangle-small-img"
          />
        </div>
      </div>

      <!-- Slide 4: 全模态演进 -->
      <div
        class="slide slide-3 content-slide"
        :class="{ active: currentSlide === 3 }"
      >
        <div class="content-wrapper">
          <div class="omni-evolution-layout">
            <div class="evolution-left slide-left">
              <div class="arch-compare-cards">
                <div
                  class="arch-card"
                  v-for="(card, idx) in archCompareData"
                  :key="idx"
                  :class="card.type"
                >
                  <h3 class="arch-card-title">{{ card.title }}</h3>
                  <p class="arch-card-flow">{{ card.flow }}</p>
                  <p v-if="card.issue" class="arch-card-issue">
                    {{ card.issue }}
                  </p>
                </div>
              </div>
            </div>
            <div class="evolution-right slide-up">
              <div class="image-stack">
                <div class="stack-item">
                  <img
                    src="/images/illustrated.webp"
                    alt="大模型图文输出"
                    class="evolution-image"
                  />
                  <span class="image-label">大模型图文并茂输出示例</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Slide 5: 全模态架构对比 -->
      <div
        class="slide slide-4 content-slide"
        :class="{ active: currentSlide === 4 }"
      >
        <div class="content-wrapper">
          <div class="omni-arch-compare fade-in">
            <img
              src="/images/traditional_vs_omni.png"
              alt="全模态架构对比"
              class="arch-compare-img"
            />
          </div>
        </div>
      </div>

      <!-- Slide 6: API Payload -->
      <div
        class="slide slide-5 content-slide"
        :class="{ active: currentSlide === 5 }"
      >
        <Slide06ApiPayload :is-active="currentSlide === 5" />
      </div>

      <!-- Slide 7: Part 2 Cover -->
      <div
        class="slide slide-6 part-cover"
        :class="{ active: currentSlide === 6 }"
      >
        <div class="part-decoration-left">
          <img src="/images/logo-icon.png" alt="" class="part-logo-img" />
        </div>
        <div class="part-content">
          <span class="part-badge slide-up">PART - 2</span>
          <h2 class="part-title slide-up delay-1">OCR 3.0</h2>
          <p class="part-subtitle slide-up delay-2">从"看见字符"到"理解文档"</p>
        </div>
        <div class="part-decoration-right">
          <img
            src="/images/triangle-right.png"
            alt=""
            class="deco-triangle-img"
          />
          <img
            src="/images/triangle-small.png"
            alt=""
            class="deco-triangle-small-img"
          />
        </div>
      </div>

      <!-- Slide 8: OCR 架构对比 + 三代演进（左右结构） -->
      <div
        class="slide slide-7 content-slide"
        :class="{ active: currentSlide === 7 }"
      >
        <div class="content-wrapper">
          <div class="ocr-split-layout">
            <div class="ocr-left fade-in">
              <h3 class="ocr-subtitle">架构对比</h3>
              <div class="ocr-arch-image">
                <img
                  src="/images/ocr_low.png"
                  alt="OCR 架构对比"
                  class="ocr-arch-img"
                />
              </div>
            </div>
            <div class="ocr-right slide-up">
              <h3 class="ocr-subtitle">三代演进</h3>
              <div class="ocr-stages-vertical">
                <div
                  class="stage-card"
                  v-for="(stage, idx) in ocrStagesData"
                  :key="idx"
                  :class="{ highlight: stage.highlight }"
                >
                  <div class="stage-header-small">
                    <span class="stage-num-small">{{ idx + 1 }}</span>
                    <h4 class="stage-title-small">{{ stage.title }}</h4>
                  </div>
                  <div class="stage-steps-small">
                    <div
                      class="step-pill-small"
                      v-for="(step, sIdx) in stage.steps"
                      :key="sIdx"
                    >
                      {{ step }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Slide 9: Part 3 Cover -->
      <div
        class="slide slide-8 part-cover"
        :class="{ active: currentSlide === 8 }"
      >
        <div class="part-decoration-left">
          <img src="/images/logo-icon.png" alt="" class="part-logo-img" />
        </div>
        <div class="part-content">
          <span class="part-badge slide-up">PART - 3</span>
          <h2 class="part-title slide-up delay-1">动态变量</h2>
          <p class="part-subtitle slide-up delay-2">
            从固定提示词到"上下文工程"
          </p>
        </div>
        <div class="part-decoration-right">
          <img
            src="/images/triangle-right.png"
            alt=""
            class="deco-triangle-img"
          />
          <img
            src="/images/triangle-small.png"
            alt=""
            class="deco-triangle-small-img"
          />
        </div>
      </div>

      <!-- Slide 10: Legacy 界面重构演示 -->
      <div
        class="slide slide-9 content-slide"
        :class="{ active: currentSlide === 9 }"
      >
        <Slide09LegacyRefactor :is-active="currentSlide === 9" />
      </div>

      <!-- Slide 11: 简历筛选流程 -->
      <div
        class="slide slide-10 content-slide"
        :class="{ active: currentSlide === 10 }"
      >
        <div class="content-wrapper">
          <div class="workflow-image-container fade-in">
            <img
              src="/images/resume_screening_workflow.png"
              alt="简历筛选工作流程"
              class="workflow-image"
            />
          </div>
        </div>
      </div>

      <!-- Slide 12: Prompt 防御 -->
      <div
        class="slide slide-11 content-slide"
        :class="{ active: currentSlide === 11 }"
      >
        <div class="content-wrapper">
          <div class="workflow-image-container fade-in">
            <img src="/images/prompt_defense.png" alt="Prompt Injection 边界防御" class="workflow-image" />
          </div>
        </div>
      </div>

      <!-- Slide 13: 实践案例 -->
      <div
        class="slide slide-12 content-slide"
        :class="{ active: currentSlide === 12 }"
      >
        <div class="content-wrapper">
          <div class="workflow-demo slide-up">
            <div class="workflow-input">
              <div class="input-card">
                <span class="input-icon">📷</span>
                <span class="input-label">输入图片</span>
              </div>
              <div class="input-arrow">→</div>
              <div class="input-card vars-card">
                <span class="input-icon">📝</span>
                <span class="input-label">动态变量</span>
                <code class="inline-vars">{doc_type, name, ...}</code>
              </div>
            </div>
            <div class="workflow-process">
              <span class="process-arrow">⟶</span>
              <span class="process-label">OCR 提取 + 模板注入 + LLM 推理</span>
            </div>
            <div class="workflow-output">
              <div class="output-card">
                <span class="output-icon">📋</span>
                <span class="output-label">结构化输出</span>
                <pre class="output-json">
{
  "商户": "星巴克",
  "日期": "2026-04-17",
  "金额": "58.00"
}</pre
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Slide 14: Ending -->
      <div
        class="slide slide-13 ending-slide"
        :class="{ active: currentSlide === 13 }"
      >
        <img src="/images/cover-bg.png" class="ending-bg-img" alt="" />
        <div class="ending-content">
          <div class="thanks-bracket"></div>
          <h1 class="thanks-title slide-up">THANKS</h1>
          <div class="thanks-bracket bottom"></div>
          <p class="thanks-subtitle slide-up delay-1">感谢聆听，欢迎交流</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <button
      class="nav-btn prev-bottom"
      @click="prevSlide"
      :disabled="currentSlide === 0"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <div class="page-indicators">
      <button
        v-for="i in totalSlides"
        :key="i"
        class="indicator"
        :class="{ active: currentSlide === i - 1 }"
        @click="goToSlide(i - 1)"
      ></button>
    </div>

    <button
      class="nav-btn next-bottom"
      @click="nextSlide"
      :disabled="currentSlide === totalSlides - 1"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap");

:root {
  /* Boyuan Brand Colors */
  --boyuan-blue-light: #28bef1;
  --boyuan-blue-mid: #1573e7;
  --boyuan-blue-dark: #0c4ce2;
  --boyuan-blue-gradient: linear-gradient(
    135deg,
    #28bef1 0%,
    #1573e7 50%,
    #0c4ce2 100%
  );

  /* Template Colors */
  --bg-white: #ffffff;
  --bg-gray: #f0f2f5;
  --bg-light: #f8f9fa;
  --bg-blue-subtle: rgba(21, 115, 231, 0.04);
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --text-muted: #999999;
  --border-color: #e0e0e0;
  --border-blue: rgba(21, 115, 231, 0.2);
  --accent-blue: #1573e7;

  /* Spacing System */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;

  /* Typography Scale */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 22px;
  --text-2xl: 28px;
  --text-3xl: 36px;
  --text-4xl: 48px;

  --font-main: "Noto Sans SC", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: "JetBrains Mono", "Consolas", monospace;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.presentation {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  font-family: var(--font-main);
  background: var(--bg-white);
  color: var(--text-primary);
}

/* Blue Geometric Background */
.geo-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.cover-bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Header for content pages */
.slide-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--space-3xl);
  background: var(--bg-white);
  z-index: 100;
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.header-logo {
  display: flex;
  align-items: center;
}

.header-logo-img {
  height: 140px;
  width: auto;
  object-fit: contain;
  transition: all 0.3s;
}

.header-logo:hover .header-logo-img {
  transform: scale(1.05);
}

.header-chapter {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--boyuan-blue-mid);
  letter-spacing: 2px;
  text-transform: uppercase;
  background: var(--boyuan-blue-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.slides-container {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
}

.slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.5s ease,
    visibility 0.5s;
  overflow: hidden;
}

.slide.active {
  opacity: 1;
  visibility: visible;
  z-index: 10;
}

/* ===== Slide 1: Cover ===== */
.slide-0 .cover-content {
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--space-3xl) var(--space-3xl);
}

.cover-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cover-logo-section {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  margin-bottom: var(--space-2xl);
  transition: transform 0.3s;
}

.cover-logo-section:hover {
  transform: scale(1.02);
}

.cover-logo-img {
  width: 200px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15));
}

.cover-logo-text {
  text-align: left;
}

.cover-title {
  font-size: clamp(42px, 4vw, 60px);
  font-weight: 900;
  color: var(--text-primary);
  letter-spacing: 2px;
  line-height: 1.1;
  margin: 0;
}

.cover-subtitle {
  font-size: clamp(24px, 2.5vw, 32px);
  font-weight: 500;
  color: var(--text-secondary);
  letter-spacing: 1px;
  margin-top: var(--space-sm);
}

.cover-year {
  margin-top: var(--space-xl);
}

.year-box {
  display: inline-block;
  padding: var(--space-md) var(--space-xl);
  background: linear-gradient(135deg, #4a7ba7 0%, #3d6b8f 100%);
  color: white;
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 300;
  letter-spacing: 16px;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(74, 123, 167, 0.3);
  transition: all 0.3s;
}

.year-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(74, 123, 167, 0.4);
}

.cover-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--text-sm);
  color: var(--text-secondary);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--border-color);
  width: 100%;
}

.cover-date {
  color: var(--text-muted);
  font-weight: 500;
}

/* ===== Slide 2: TOC ===== */
.slide-1 {
  display: flex;
}

.toc-left {
  width: 42%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-white);
  padding: var(--space-3xl);
  position: relative;
}

.toc-left::after {
  content: "";
  position: absolute;
  right: 0;
  top: 10%;
  bottom: 10%;
  width: 1px;
  background: linear-gradient(180deg, var(--border-color) 0%, transparent 100%);
}

.toc-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
}

.toc-logo-img {
  width: 380px;
  height: auto;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.5;
  transition: all 0.5s;
}

.toc-logo:hover .toc-logo-img {
  filter: grayscale(0);
  opacity: 1;
}

.toc-right {
  width: 58%;
  background: var(--bg-gray);
  padding: var(--space-3xl) var(--space-2xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.toc-header {
  margin-bottom: var(--space-lg);
}

.toc-section-title {
  font-size: var(--text-xl);
  font-weight: 500;
  color: var(--boyuan-blue-mid);
  /* margin-bottom: var(--space-sm); */
  margin-bottom: var(--space-xs);
  letter-spacing: -0.3px;
}

.toc-label {
  font-size: var(--text-xs);
  color: var(--text-muted);
  letter-spacing: 6px;
  text-transform: uppercase;
}

.toc-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.toc-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  padding: var(--space-md);
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.toc-item:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: translateX(var(--space-md));
  box-shadow: 0 4px 16px rgba(21, 115, 231, 0.08);
}

.toc-num {
  font-size: 40px;
  font-weight: 800;
  color: var(--text-primary);
  min-width: 56px;
  line-height: 1;
  background: var(--boyuan-blue-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.toc-bar {
  width: 4px;
  height: 48px;
  background: var(--boyuan-blue-gradient);
  margin-top: var(--space-sm);
  border-radius: 2px;
}

.toc-text {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.toc-part {
  font-size: var(--text-xs);
  color: var(--text-muted);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 500;
}

.toc-main {
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.5;
}

/* ===== Part Cover Slides ===== */
.part-cover {
  display: flex;
  align-items: center;
  background: var(--bg-white);
  overflow: hidden;
}

.part-cover::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 45%;
  height: 100%;
  background: linear-gradient(
    135deg,
    var(--bg-blue-subtle) 0%,
    transparent 100%
  );
  z-index: 0;
}

.part-decoration-left {
  position: relative;
  z-index: 1;
  margin-left: var(--space-3xl);
}

.part-logo-img {
  width: 400px;
  height: auto;
  object-fit: contain;
  opacity: 0.3;
  filter: grayscale(0.5);
  transition: all 0.5s;
}

.part-cover:hover .part-logo-img {
  opacity: 0.5;
  filter: grayscale(0);
}

.part-content {
  position: relative;
  z-index: 10;
  margin-left: 32%;
  text-align: left;
  max-width: 60%;
}

.part-badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-sm) var(--space-lg);
  background: var(--boyuan-blue-gradient);
  color: white;
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 3px;
  border-radius: 24px;
  margin-bottom: var(--space-xl);
  box-shadow: 0 4px 16px rgba(21, 115, 231, 0.3);
}

.part-title {
  font-size: clamp(42px, 5vw, 64px);
  font-weight: 800;
  color: var(--boyuan-blue-mid);
  margin-bottom: var(--space-md);
  letter-spacing: -1px;
  line-height: 1.1;
  background: var(--boyuan-blue-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.part-subtitle {
  font-size: clamp(18px, 2vw, 24px);
  color: var(--text-secondary);
  letter-spacing: -0.3px;
  line-height: 1.5;
  font-weight: 400;
}

.part-decoration-right {
  position: absolute;
  right: var(--space-2xl);
  top: 50%;
  transform: translateY(-50%);
  width: 180px;
  height: 360px;
}

.deco-triangle-img {
  position: absolute;
  right: 0;
  top: 0;
  width: 160px;
  height: auto;
  opacity: 0.8;
  transition: all 0.5s;
}

.deco-triangle-small-img {
  position: absolute;
  right: var(--space-lg);
  bottom: 0;
  width: 90px;
  height: auto;
  opacity: 0.6;
}

.part-cover:hover .deco-triangle-img {
  transform: scale(1.05) rotate(5deg);
}

/* ===== Content Slides ===== */
.content-slide {
  background: var(--bg-white);
  padding-top: 70px;
}

.content-wrapper {
  height: 100%;
  padding: var(--space-2xl) var(--space-3xl) var(--space-3xl);
  overflow-y: auto;
}

.section-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--boyuan-blue-mid);
  margin-bottom: var(--space-2xl);
  padding-bottom: var(--space-md);
  border-bottom: 2px solid var(--border-color);
  letter-spacing: -0.5px;
}

/* Omni Evolution Layout (Slide 4) */
.omni-evolution-layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: var(--space-2xl);
  margin-bottom: var(--space-xl);
}

.evolution-left {
  padding: var(--space-lg);
}

.arch-compare-cards {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.arch-card {
  padding: var(--space-xl);
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.3s;
}

.arch-card.old {
  background: linear-gradient(
    135deg,
    rgba(107, 114, 128, 0.05) 0%,
    var(--bg-white) 100%
  );
  border-left: 4px solid #6b7280;
}

.arch-card.new {
  background: linear-gradient(
    135deg,
    rgba(21, 115, 231, 0.08) 0%,
    var(--bg-white) 100%
  );
  border-left: 4px solid var(--boyuan-blue-mid);
}

.arch-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(21, 115, 231, 0.12);
}

.arch-card-title {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-md);
}

.arch-card.new .arch-card-title {
  color: var(--boyuan-blue-mid);
}

.arch-card-flow {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
  font-family: var(--font-mono);
  background: var(--bg-gray);
  padding: var(--space-md);
  border-radius: 6px;
  margin-bottom: var(--space-md);
}

.arch-card-issue {
  font-size: var(--text-sm);
  color: #dc2626;
  font-weight: 500;
  padding: var(--space-sm) var(--space-md);
  background: rgba(220, 38, 38, 0.08);
  border-radius: 6px;
}

.evolution-right {
  display: flex;
  align-items: center;
}

.image-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.stack-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.evolution-image {
  max-width: 100%;
  max-height: 55vh;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-white);
  transition: all 0.3s;
}

.stack-item:hover .evolution-image {
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.image-label {
  font-size: var(--text-xs);
  color: var(--text-muted);
  text-align: center;
  font-style: italic;
}

.omni-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  padding: var(--space-lg) var(--space-xl);
  background: linear-gradient(
    135deg,
    var(--bg-blue-subtle) 0%,
    rgba(21, 115, 231, 0.02) 100%
  );
  border: 1px solid var(--border-blue);
  border-radius: 12px;
  margin-top: var(--space-lg);
}

.omni-label {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--boyuan-blue-mid);
  letter-spacing: 1px;
}

.omni-text {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

/* AI Input Split Layout (Slide 5) */
.ai-input-split-layout {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: var(--space-2xl);
  align-items: start;
  margin-top: var(--space-lg);
}

.ai-input-left {
  padding-right: var(--space-lg);
}

.ai-input-right {
  padding-left: var(--space-lg);
  border-left: 1px solid var(--border-color);
  padding-top: var(--space-sm);
}

.ai-input-subtitle {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--boyuan-blue-mid);
  margin-bottom: var(--space-lg);
  letter-spacing: -0.3px;
}

/* Timeline Vertical */
.timeline-vertical {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.timeline-card-vertical {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.3s;
}

.timeline-card-vertical.highlight {
  background: linear-gradient(
    135deg,
    rgba(40, 190, 241, 0.1) 0%,
    rgba(21, 115, 231, 0.05) 100%
  );
  border-color: var(--boyuan-blue-mid);
}

.timeline-year-vertical {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--boyuan-blue-mid);
  min-width: 60px;
  text-align: center;
}

.timeline-card-vertical.highlight .timeline-year-vertical {
  color: var(--boyuan-blue-light);
}

.timeline-content-vertical {
  flex: 1;
}

.timeline-title-vertical {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.timeline-desc-vertical {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

/* Illustrated Example */
.illustrated-example {
  display: flex;
  justify-content: center;
  align-items: center;
}

.illustrated-img {
  max-width: 100%;
  max-height: 55vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.feature-features {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.feature-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  padding: var(--space-lg);
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.3s;
}

.feature-card:hover {
  border-color: var(--boyuan-blue-mid);
  box-shadow: 0 8px 24px rgba(21, 115, 231, 0.1);
  transform: translateX(4px);
}

.feature-icon {
  font-size: 40px;
  flex-shrink: 0;
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--boyuan-blue-mid);
  margin-bottom: var(--space-xs);
}

.feature-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.5;
}

.feature-card {
  padding: var(--space-2xl) var(--space-xl);
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--boyuan-blue-gradient);
  opacity: 0;
  transition: opacity 0.3s;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(21, 115, 231, 0.12);
  border-color: var(--border-blue);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-card.center {
  background: linear-gradient(
    135deg,
    var(--bg-blue-subtle) 0%,
    var(--bg-white) 100%
  );
  border-color: var(--boyuan-blue-mid);
  transform: scale(1.05);
}

.feature-card.center:hover {
  transform: scale(1.05) translateY(-8px);
}

.feature-icon {
  font-size: 56px;
  display: block;
  margin-bottom: var(--space-lg);
  filter: grayscale(0.2);
  transition: filter 0.3s;
}

.feature-card:hover .feature-icon {
  filter: grayscale(0);
}

.feature-title {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--boyuan-blue-mid);
  margin-bottom: var(--space-md);
  letter-spacing: -0.3px;
}

.feature-desc {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.7;
}

/* Architecture Compare Image (Slide 5) */
.omni-arch-compare {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-xl);
}

.arch-compare-img {
  max-width: 90%;
  max-height: 60vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

/* Models Table (Slide 6) */
.models-table-container {
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.models-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-white);
}

.models-table thead tr {
  background: linear-gradient(180deg, var(--bg-light) 0%, var(--bg-white) 100%);
  border-bottom: 2px solid var(--border-color);
}

.models-table th {
  padding: var(--space-lg) var(--space-xl);
  text-align: left;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--boyuan-blue-mid);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.th-name {
  width: 25%;
}
.th-org {
  width: 20%;
}
.th-feature {
  width: 55%;
}

.models-table tbody tr {
  border-bottom: 1px solid var(--border-color);
  transition: all 0.2s;
}

.models-table tbody tr:nth-child(even) {
  background: var(--bg-blue-subtle);
}

.models-table tbody tr:hover {
  background: rgba(21, 115, 231, 0.08);
  transform: translateX(4px);
}

.models-table tbody tr:last-child {
  border-bottom: none;
}

.models-table td {
  padding: var(--space-lg) var(--space-xl);
  vertical-align: middle;
}

.td-name {
  font-weight: 600;
  color: var(--text-primary);
  font-size: var(--text-base);
}

.td-org {
  color: var(--text-secondary);
  font-size: var(--text-sm);
}

.td-feature {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Images */
.images-row {
  display: flex;
  gap: var(--space-xl);
  justify-content: center;
}

.image-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-lg);
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  transition: all 0.3s;
}

.image-box:hover {
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
}

.comp-image {
  max-width: 100%;
  max-height: 42vh;
  object-fit: contain;
  border-radius: 12px;
}

.image-caption {
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-top: var(--space-md);
  text-align: center;
  font-style: italic;
}

/* Models Table */
.concept-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.concept-item {
  padding: var(--space-xl) var(--space-lg);
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.concept-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--boyuan-blue-gradient);
  opacity: 0;
  transition: opacity 0.3s;
}

.concept-item:hover {
  border-color: var(--boyuan-blue-mid);
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(21, 115, 231, 0.12);
}

.concept-item:hover::before {
  opacity: 1;
}

.concept-icon {
  font-size: 48px;
  display: block;
  margin-bottom: var(--space-md);
  filter: grayscale(0.3);
  transition: filter 0.3s;
}

.concept-item:hover .concept-icon {
  filter: grayscale(0);
}

.concept-title {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--boyuan-blue-mid);
  margin-bottom: var(--space-sm);
  letter-spacing: -0.3px;
}

.concept-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

.models-table-wrapper {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.models-table {
  background: var(--bg-white);
}

.table-header {
  display: grid;
  grid-template-columns: 1.5fr 1fr 2.5fr;
  padding: var(--space-md) var(--space-xl);
  background: linear-gradient(180deg, var(--bg-light) 0%, var(--bg-white) 100%);
  border-bottom: 2px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 10;
}

.th-name,
.th-org,
.th-feature {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--boyuan-blue-mid);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-row {
  display: grid;
  grid-template-columns: 1.5fr 1fr 2.5fr;
  padding: var(--space-md) var(--space-xl);
  border-bottom: 1px solid var(--border-color);
  transition: all 0.2s;
}

.table-row:hover {
  background: var(--bg-blue-subtle);
  transform: translateX(4px);
}

.table-row:last-child {
  border-bottom: none;
}

.td-name {
  font-weight: 600;
  color: var(--text-primary);
}

.td-org {
  color: var(--text-secondary);
  font-size: var(--text-sm);
}

.td-feature {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

/* OCR Architecture Image (Slide 7) */
.ocr-split-layout {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: var(--space-2xl);
  align-items: start;
}

.ocr-left {
  padding-right: var(--space-lg);
}

.ocr-right {
  padding-left: var(--space-lg);
  border-left: 1px solid var(--border-color);
}

.ocr-subtitle {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--boyuan-blue-mid);
  margin-bottom: var(--space-lg);
  letter-spacing: -0.3px;
}

.ocr-arch-image {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
  margin-bottom: var(--space-lg);
}

.ocr-arch-img {
  max-width: 100%;
  max-height: 45vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  background: var(--bg-white);
}

.arch-compare-notes {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.compare-note {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  background: var(--bg-white);
  border-radius: 8px;
  border-left: 3px solid var(--border-color);
  transition: all 0.3s;
}

.compare-note:nth-child(2) {
  border-left-color: var(--boyuan-blue-mid);
  background: linear-gradient(
    90deg,
    rgba(21, 115, 231, 0.05) 0%,
    transparent 100%
  );
}

.compare-note:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.note-label {
  font-weight: 600;
  color: var(--boyuan-blue-mid);
  font-size: var(--text-sm);
  white-space: nowrap;
}

.note-text {
  color: var(--text-secondary);
  font-size: var(--text-sm);
  line-height: 1.6;
}

/* OCR Stages Vertical */
.ocr-stages-vertical {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.stage-card {
  padding: var(--space-md) var(--space-lg);
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.3s;
}

.stage-card.highlight {
  background: linear-gradient(
    135deg,
    rgba(21, 115, 231, 0.08) 0%,
    transparent 100%
  );
  border-color: var(--boyuan-blue-mid);
  box-shadow: 0 4px 16px rgba(21, 115, 231, 0.1);
}

.stage-header-small {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-sm);
}

.stage-num-small {
  font-size: 32px;
  font-weight: 900;
  color: var(--boyuan-blue-light);
  line-height: 1;
}

.stage-card.highlight .stage-num-small {
  color: var(--boyuan-blue-mid);
}

.stage-title-small {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--text-primary);
}

.stage-steps-small {
  display: flex;
  gap: var(--space-sm);
}

.step-pill-small {
  flex: 1;
  padding: var(--space-xs) var(--space-sm);
  background: var(--bg-light);
  border-radius: 4px;
  font-size: var(--text-xs);
  color: var(--text-secondary);
  text-align: center;
  border: 1px solid var(--border-color);
}

.stage-card.highlight .step-pill-small {
  background: rgba(21, 115, 231, 0.08);
  border-color: var(--border-blue);
  color: var(--boyuan-blue-mid);
}

.ocr-arch-img {
  max-width: 90%;
  max-height: 65vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
  border: 1px solid var(--border-color);
  background: var(--bg-white);
}

.arch-compare-notes {
  display: flex;
  gap: var(--space-xl);
  justify-content: center;
}

.compare-note {
  padding: var(--space-md) var(--space-xl);
  background: var(--bg-white);
  border-radius: 12px;
  border-left: 4px solid var(--boyuan-blue-mid);
  box-shadow: 0 4px 16px rgba(21, 115, 231, 0.08);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.compare-note:hover {
  transform: translateX(4px);
  box-shadow: 0 6px 20px rgba(21, 115, 231, 0.12);
}

.note-label {
  font-weight: 700;
  color: var(--boyuan-blue-mid);
  font-size: var(--text-sm);
  white-space: nowrap;
}

/* OCR Stages Horizontal (Slide 9) */
.ocr-stages-horizontal {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
}

.stage-card {
  padding: var(--space-xl);
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  transition: all 0.3s;
}

.stage-card.highlight {
  background: linear-gradient(
    135deg,
    var(--bg-blue-subtle) 0%,
    var(--bg-white) 100%
  );
  border-color: var(--boyuan-blue-mid);
  box-shadow: 0 8px 24px rgba(21, 115, 231, 0.12);
}

.stage-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.stage-num {
  font-size: 48px;
  font-weight: 900;
  color: var(--boyuan-blue-light);
  line-height: 1;
}

.stage-card.highlight .stage-num {
  color: var(--boyuan-blue-mid);
}

.stage-title {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--text-primary);
}

.stage-steps {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.step-pill {
  padding: var(--space-sm) var(--space-md);
  background: var(--bg-light);
  border-radius: 6px;
  font-size: var(--text-sm);
  color: var(--text-secondary);
  text-align: center;
  border: 1px solid var(--border-color);
}

.stage-card.highlight .step-pill {
  background: rgba(21, 115, 231, 0.08);
  border-color: var(--border-blue);
  color: var(--boyuan-blue-mid);
}

.stage-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Dynamic Variable Scenes (Slide 10) */
.workflow-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-sm);
}

.workflow-image {
  max-width: 90%;
  max-height: 65vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border-color);
  background: var(--bg-white);
}

/* Injection Methods (Slide 12) */
.injection-methods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
}

.method-card {
  padding: var(--space-xl);
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.3s;
}

.method-card:hover {
  border-color: var(--boyuan-blue-mid);
  box-shadow: 0 8px 24px rgba(21, 115, 231, 0.1);
  transform: translateY(-4px);
}

.method-title {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-md);
}

.method-code {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--boyuan-blue-mid);
  background: var(--bg-light);
  padding: var(--space-md);
  border-radius: 6px;
  border: 1px solid var(--border-color);
  margin-bottom: var(--space-md);
}

.method-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Workflow Demo (Slide 13) */
.workflow-demo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-lg);
  padding: var(--space-2xl);
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 16px;
}

.workflow-input {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.input-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-lg);
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  min-width: 120px;
}

.input-icon {
  font-size: 32px;
}

.input-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-weight: 500;
}

.vars-card {
  background: rgba(21, 115, 231, 0.05);
  border-color: var(--border-blue);
}

.inline-vars {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--boyuan-blue-mid);
}

.input-arrow {
  font-size: 24px;
  color: var(--boyuan-blue-mid);
  text-align: center;
}

.workflow-process {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.process-box {
  padding: var(--space-lg) var(--space-xl);
  background: var(--boyuan-blue-gradient);
  color: white;
  border-radius: 12px;
  font-weight: 600;
  font-size: var(--text-base);
}

.workflow-output {
  padding: var(--space-xl);
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  min-width: 200px;
}

.output-title {
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: var(--space-md);
}

.output-json {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-secondary);
  line-height: 1.8;
}

/* Models Table Container (Slide 6) */
.models-table-container {
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.models-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-white);
}

.models-table thead {
  background: linear-gradient(180deg, var(--bg-light) 0%, var(--bg-white) 100%);
}

.models-table th {
  padding: var(--space-md) var(--space-xl);
  text-align: left;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--boyuan-blue-mid);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid var(--border-color);
}

.th-name {
  width: 25%;
}
.th-org {
  width: 20%;
}
.th-feature {
  width: 55%;
}

.models-table tbody tr {
  border-bottom: 1px solid var(--border-color);
  transition: all 0.2s;
}

.models-table tbody tr:nth-child(even) {
  background: var(--bg-light);
}

.models-table tbody tr:hover {
  background: var(--bg-blue-subtle);
  transform: translateX(4px);
}

.models-table td {
  padding: var(--space-md) var(--space-xl);
  font-size: var(--text-sm);
}

.td-name {
  font-weight: 600;
  color: var(--text-primary);
}

.td-org {
  color: var(--text-secondary);
}

.td-feature {
  color: var(--text-secondary);
  line-height: 1.6;
}

.note-text {
  color: var(--text-secondary);
  font-size: var(--text-sm);
  line-height: 1.6;
}

/* OCR Stages Horizontal (Slide 9) */
.ocr-stages-horizontal {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
}

.stage-card {
  padding: var(--space-xl);
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.stage-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--border-color);
  transition: all 0.3s;
}

.stage-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
}

.stage-card:hover::before {
  background: var(--boyuan-blue-gradient);
}

.stage-card.highlight {
  border-color: var(--boyuan-blue-mid);
  background: linear-gradient(
    135deg,
    var(--bg-blue-subtle) 0%,
    var(--bg-white) 100%
  );
  box-shadow: 0 8px 32px rgba(21, 115, 231, 0.15);
}

.stage-card.highlight::before {
  background: var(--boyuan-blue-gradient);
}

.stage-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.stage-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--boyuan-blue-gradient);
  color: white;
  font-size: var(--text-base);
  font-weight: 700;
  flex-shrink: 0;
}

.stage-title {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--text-primary);
  flex: 1;
}

.stage-steps {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.step-pill {
  padding: var(--space-xs) var(--space-md);
  background: var(--bg-blue-subtle);
  border: 1px solid var(--border-blue);
  border-radius: 20px;
  font-size: var(--text-xs);
  color: var(--boyuan-blue-mid);
  font-weight: 500;
  transition: all 0.2s;
}

.step-pill:hover {
  background: rgba(21, 115, 231, 0.15);
  transform: translateY(-2px);
}

.stage-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.7;
  padding-top: var(--space-md);
  border-top: 1px dashed var(--border-color);
}

/* Scenes Grid (Slide 11) */
.scenes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
}

.scene-card {
  padding: var(--space-xl);
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.scene-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--boyuan-blue-gradient);
  opacity: 0;
  transition: opacity 0.3s;
}

.scene-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(21, 115, 231, 0.1);
  border-color: var(--border-blue);
}

.scene-card:hover::before {
  opacity: 1;
}

.scene-title {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--boyuan-blue-mid);
  margin-bottom: var(--space-md);
  letter-spacing: -0.3px;
}

.scene-vars,
.scene-template,
.scene-output {
  margin-bottom: var(--space-sm);
}

.vars-label,
.template-label,
.output-label {
  font-size: var(--text-xs);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 4px;
}

.var-list {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--boyuan-blue-mid);
  background: var(--bg-blue-subtle);
  padding: var(--space-xs) var(--space-sm);
  border-radius: 4px;
  display: inline-block;
}

.template-text {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-secondary);
  background: var(--bg-light);
  padding: var(--space-sm);
  border-radius: 6px;
  border: 1px dashed var(--border-color);
  line-height: 1.6;
  white-space: pre-wrap;
  margin: 0;
}

.output-text {
  font-size: var(--text-sm);
  color: var(--text-primary);
  font-weight: 500;
}

/* Injection Methods (Slide 12) */
.injection-methods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
}

.method-card {
  padding: var(--space-xl);
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.method-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--boyuan-blue-gradient);
  opacity: 0;
  transition: opacity 0.3s;
}

.method-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  border-color: var(--border-blue);
}

.method-card:hover::before {
  opacity: 1;
}

.method-title {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--boyuan-blue-mid);
  margin-bottom: var(--space-md);
  letter-spacing: -0.3px;
}

.method-code {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--text-primary);
  background: var(--bg-light);
  padding: var(--space-md);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  margin-bottom: var(--space-md);
  text-align: center;
}

.method-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Workflow Demo (Slide 13) */
.workflow-demo {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  padding: var(--space-xl);
  background: var(--bg-gray);
  border-radius: 16px;
}

.workflow-input {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg);
}

.input-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-lg) var(--space-xl);
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.3s;
}

.input-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.vars-card {
  background: linear-gradient(
    135deg,
    var(--bg-blue-subtle) 0%,
    var(--bg-white) 100%
  );
  border-color: var(--boyuan-blue-mid);
}

.input-icon {
  font-size: 32px;
  margin-bottom: var(--space-xs);
}

.input-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-weight: 500;
}

.inline-vars {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--boyuan-blue-mid);
  background: rgba(21, 115, 231, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  margin-top: 4px;
}

.input-arrow {
  font-size: 24px;
  color: var(--boyuan-blue-mid);
  font-weight: 700;
}

.workflow-process {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  padding: var(--space-md);
  background: var(--boyuan-blue-gradient);
  border-radius: 8px;
  color: white;
}

.process-arrow {
  font-size: 28px;
  font-weight: 700;
}

.process-label {
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0.5px;
}

.workflow-output {
  display: flex;
  justify-content: center;
}

.output-card {
  padding: var(--space-xl);
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.output-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--boyuan-blue-gradient);
}

.output-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(21, 115, 231, 0.12);
  border-color: var(--border-blue);
}

.output-icon {
  font-size: 32px;
  display: block;
  margin-bottom: var(--space-md);
}

.output-label {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--boyuan-blue-mid);
  display: block;
  margin-bottom: var(--space-md);
}

/* Practice Slide */
.practice-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.practice-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  margin-bottom: var(--space-sm);
}

.practice-icon {
  font-size: 32px;
}

.practice-main {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--boyuan-blue-mid);
  letter-spacing: -0.5px;
}

.practice-sub {
  font-size: var(--text-base);
  color: var(--text-secondary);
  margin-bottom: var(--space-md);
}

.practice-badges {
  display: flex;
  justify-content: center;
  gap: var(--space-sm);
}

.badge {
  padding: var(--space-xs) var(--space-md);
  background: rgba(21, 115, 231, 0.08);
  border: 1px solid var(--border-blue);
  border-radius: 20px;
  font-size: var(--text-sm);
  color: var(--boyuan-blue-mid);
  font-weight: 500;
  transition: all 0.2s;
}

.badge:hover {
  background: rgba(21, 115, 231, 0.15);
  transform: translateY(-2px);
}

.practice-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  margin-bottom: var(--space-lg);
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.flow-step-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.flow-step-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--boyuan-blue-gradient);
  opacity: 0;
  transition: opacity 0.3s;
}

.flow-step-item:hover {
  border-color: var(--boyuan-blue-mid);
  box-shadow: 0 6px 20px rgba(21, 115, 231, 0.1);
  transform: translateX(4px);
}

.flow-step-item:hover::before {
  opacity: 1;
}

.flow-step-item .step-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.flow-step-item .step-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.flow-step-item .step-label {
  font-size: var(--text-sm);
  color: var(--text-primary);
  font-weight: 600;
}

.flow-step-item .step-func {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--boyuan-blue-mid);
  margin-top: 4px;
  opacity: 0.8;
}

.flow-step-item .step-arrow {
  text-align: center;
  color: var(--boyuan-blue-mid);
  font-size: 18px;
  margin: -6px 0;
  padding-left: var(--space-lg);
  opacity: 0.5;
}

.terminal-preview {
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
}

.terminal-preview:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
}

.terminal-header {
  padding: var(--space-md) var(--space-lg);
  background: #2d2d2d;
  border-bottom: 1px solid #333;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.terminal-header::before {
  content: "";
  display: flex;
  gap: 6px;
}

.term-title {
  font-size: var(--text-xs);
  color: #666;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.terminal-output {
  padding: var(--space-lg);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: #4ec9b0;
  line-height: 1.8;
  white-space: pre-wrap;
  background: #1a1a1a;
  min-height: 180px;
}

.task-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

.task-card {
  padding: var(--space-lg);
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.3s;
  position: relative;
}

.task-card::before {
  content: "";
  position: absolute;
  top: var(--space-sm);
  left: var(--space-sm);
  width: 4px;
  height: 4px;
  background: var(--boyuan-blue-mid);
  border-radius: 50%;
  opacity: 0.5;
}

.task-card:hover {
  border-color: var(--boyuan-blue-mid);
  box-shadow: 0 8px 24px rgba(21, 115, 231, 0.1);
  transform: translateY(-4px);
}

.task-card:hover::before {
  opacity: 1;
  width: 100%;
  height: 2px;
  border-radius: 2px;
}

.task-name {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--boyuan-blue-mid);
  margin-bottom: var(--space-xs);
  font-weight: 600;
  word-break: break-all;
}

.task-points {
  font-size: var(--text-xs);
  color: var(--text-muted);
  background: var(--bg-light);
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-top: var(--space-xs);
}

.task-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-top: var(--space-sm);
  line-height: 1.6;
}

/* ===== Ending Slide ===== */
.ending-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bg-white);
}

.ending-bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
}

.ending-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: var(--space-3xl);
}

.thanks-bracket {
  width: 240px;
  height: 80px;
  border: 3px solid var(--boyuan-blue-mid);
  border-bottom: none;
  margin: 0 auto;
  border-radius: 8px 8px 0 0;
  position: relative;
}

.thanks-bracket::before {
  content: "";
  position: absolute;
  top: var(--space-xs);
  left: var(--space-xs);
  right: var(--space-xs);
  bottom: 0;
  border: 1px solid rgba(21, 115, 231, 0.2);
  border-bottom: none;
  border-radius: 6px 6px 0 0;
}

.thanks-bracket.bottom {
  border-top: none;
  border-bottom: 3px solid var(--boyuan-blue-mid);
  border-radius: 0 0 8px 8px;
  margin-top: var(--space-md);
}

.thanks-bracket.bottom::before {
  border-bottom: 1px solid rgba(21, 115, 231, 0.2);
  border-top: none;
  border-radius: 0 0 6px 6px;
}

.thanks-title {
  font-size: clamp(60px, 8vw, 100px);
  font-weight: 900;
  letter-spacing: clamp(8px, 1vw, 16px);
  color: var(--boyuan-blue-mid);
  margin: var(--space-lg) 0;
  background: var(--boyuan-blue-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.thanks-subtitle {
  font-size: clamp(18px, 2vw, 24px);
  color: var(--text-secondary);
  margin-top: var(--space-xl);
  font-weight: 400;
  letter-spacing: 1px;
}

/* Animation Classes */
.fade-in {
  opacity: 0;
}
.slide-up {
  opacity: 0;
  transform: translateY(40px);
}
.slide-left {
  opacity: 0;
  transform: translateX(-40px);
}
.scale-in {
  opacity: 0;
  transform: scale(0.95);
}

/* Timeline card delays */
.timeline-card.delay-0 {
  transition-delay: 0s;
}
.timeline-card.delay-1 {
  transition-delay: 0.15s;
}
.timeline-card.delay-2 {
  transition-delay: 0.3s;
}
.timeline-card.delay-3 {
  transition-delay: 0.45s;
}

/* Navigation - Bottom corners */
.nav-btn.prev-bottom {
  position: fixed;
  bottom: var(--space-lg);
  left: var(--space-lg);
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s;
  z-index: 200;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.nav-btn.next-bottom {
  position: fixed;
  bottom: var(--space-lg);
  right: var(--space-lg);
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s;
  z-index: 200;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.nav-btn:hover:not(:disabled) {
  background: var(--boyuan-blue-mid);
  border-color: var(--boyuan-blue-mid);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(21, 115, 231, 0.3);
}

.nav-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-btn svg {
  width: 20px;
  height: 20px;
}

.page-indicators {
  position: fixed;
  bottom: var(--space-lg);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--space-sm);
  z-index: 200;
}

.indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--border-color);
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.indicator:hover {
  background: var(--boyuan-blue-mid);
  transform: scale(1.2);
}

.indicator.active {
  background: var(--boyuan-blue-mid);
  transform: scale(1.4);
  width: 24px;
  border-radius: 3px;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--bg-light);
}

::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--boyuan-blue-mid);
}
</style>
