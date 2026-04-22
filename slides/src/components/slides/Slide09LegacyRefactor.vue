<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});

const workflowSteps = ref([
  {
    num: "01",
    title: "多模态附件输入",
    desc: "拖入旧软件 .exe 截图 + 混乱的旧 CSS 源码",
  },
  {
    num: "02",
    title: "VLM 解析与空间锚定",
    desc: "提取 UI 组件结构、按钮坐标，输出布局 JSON",
  },
  {
    num: "03",
    title: "目标样式注入",
    desc: "用提示词注入偏好样式",
  },
  {
    num: "04",
    title: "输出",
    desc: "完美重构的现代前端代码，可直接替换运行",
  },
]);

onMounted(() => {
  if (props.isActive) {
    gsap.fromTo(
      ".legacy-slide .workflow-item",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
      },
    );
  }
});
</script>

<template>
  <div class="legacy-slide content-wrapper">
    <div class="legacy-layout">
      <!-- Left: Workflow -->
      <div class="workflow-section fade-in">
        <h2 class="workflow-main-title">实践演示：重构 Legacy 软件界面</h2>
        
        <div class="workflow-steps">
          <div
            class="workflow-item"
            v-for="(step, idx) in workflowSteps"
            :key="idx"
          >
            <span class="workflow-num">{{ step.num }}</span>
            <div class="workflow-content">
              <h3 class="workflow-title">{{ step.title }}</h3>
              <p class="workflow-desc">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Code Preview -->
      <div class="code-section slide-up">
        <div class="code-panels">
          <div class="code-panel old">
            <pre class="code-block"><code>.window {
  background: #f0f0f0;
  border: 2px solid #808080;
  padding: 5px <span class="highlight">!important</span>;
}

.btn-primary {
  background: linear-gradient(
    to bottom, #ffff00, #ffaa00
  );
  font-size: 11px;
  border: 3px outset #ffaa00;
}</code></pre>
          </div>
          <div class="code-panel new">
            <pre class="code-block"><code><span class="highlight">&lt;script setup&gt;</span>
import { ref } from 'vue'
const count = ref(0)
<span class="highlight">&lt;/script&gt;</span>

&lt;template&gt;
  &lt;div class="modern-card"&gt;
    &lt;Button @click="count++"&gt;
      点击 {{ count }} 次
    &lt;/Button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;style scoped&gt;
.modern-card {
  <span class="highlight">--primary: #3b82f6;</span>
  padding: 1.5rem;
  border-radius: 12px;
}
&lt;/style&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.legacy-slide {
  padding-top: var(--space-xl);
}

.content-wrapper {
  height: calc(100vh - 70px);
  overflow: hidden;
}

.legacy-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  height: 100%;
  align-items: center;
}

/* Workflow Section */
.workflow-section {
  padding: var(--space-xl);
}

.workflow-main-title {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-2xl);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

.workflow-steps {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.workflow-item {
  display: flex;
  gap: var(--space-lg);
  padding: var(--space-lg) 0;
  border-bottom: 1px solid var(--border-color);
  transition: all 0.3s;
}

.workflow-item:last-child {
  border-bottom: none;
}

.workflow-item:hover {
  transform: translateX(var(--space-md));
}

.workflow-num {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--boyuan-blue-gradient);
  color: white;
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  border-radius: 12px;
  line-height: 1;
}

.workflow-content {
  flex: 1;
  min-width: 0;
}

.workflow-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
  line-height: var(--leading-snug);
}

.workflow-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
}

/* Code Section */
.code-section {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.code-panels {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  height: 100%;
  justify-content: center;
}

.code-panel {
  background: var(--bg-white);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.code-panel:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.code-panel.old {
  border: 1px solid #f59e0b;
}

.code-panel.new {
  border: 1px solid var(--boyuan-blue-mid);
}

.code-block {
  padding: var(--space-lg);
  font-size: var(--text-xs);
  line-height: var(--leading-relaxed);
  color: var(--text-primary);
  margin: 0;
  white-space: pre;
  max-height: 200px;
  overflow: auto;
  font-family: var(--font-mono);
  font-feature-settings: "liga" 1, "calt" 1;
}

.highlight {
  color: var(--boyuan-blue-mid);
  font-weight: var(--font-semibold);
}

.old .highlight {
  color: #dc2626;
}
</style>
