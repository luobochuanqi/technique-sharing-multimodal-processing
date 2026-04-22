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
    title: "1. 多模态附件输入",
    desc: "拖入旧软件 .exe 截图 + 混乱的旧 CSS 源码",
  },
  {
    title: "2. VLM 解析与空间锚定",
    desc: "提取 UI 组件结构、按钮坐标，输出布局 JSON",
  },
  {
    title: "3. 目标样式注入",
    desc: "用提示词注入偏好样式",
  },
  {
    title: "4. 输出",
    desc: "完美重构的现代前端代码，可直接替换运行",
  },
]);

onMounted(() => {
  if (props.isActive) {
    gsap.fromTo(
      ".legacy-slide .workflow-item",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      },
    );
  }
});
</script>

<template>
  <div class="legacy-slide content-wrapper">
    <h2 class="slide-main-title fade-in">实践演示：重构 Legacy 软件界面</h2>

    <div class="legacy-content">
      <!-- Workflow Steps -->
      <div class="workflow-section fade-in">
        <div
          class="workflow-item"
          v-for="(step, idx) in workflowSteps"
          :key="idx"
        >
          <h3 class="workflow-title">{{ step.title }}</h3>
          <p class="workflow-desc">{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.legacy-slide {
  padding-top: var(--space-lg);
}

.slide-main-title {
  font-size: clamp(28px, 3vw, 36px);
  font-weight: 800;
  color: var(--boyuan-blue-mid);
  margin-bottom: var(--space-2xl);
  text-align: center;
}

.legacy-content {
  max-width: 800px;
  margin: 0 auto;
}

/* Workflow Section */
.workflow-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.workflow-item {
  padding: var(--space-lg);
  border-left: 3px solid var(--boyuan-blue-mid);
  background: rgba(21, 115, 231, 0.03);
  transition: all 0.3s;
}

.workflow-item:hover {
  background: rgba(21, 115, 231, 0.06);
  transform: translateX(8px);
}

.workflow-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
}

.workflow-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Code Section */
.code-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  overflow: hidden;
}

.code-panel {
  flex: 1;
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.code-panel.old {
  border-left: 3px solid #f59e0b;
}

.code-panel.new {
  border-left: 3px solid var(--boyuan-blue-mid);
}

.code-header {
  padding: var(--space-sm) var(--space-md);
  background: var(--bg-gray);
  border-bottom: 1px solid var(--border-color);
}

.code-label {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--text-secondary);
  font-family: var(--font-mono);
}

.code-block {
  padding: var(--space-md);
  font-size: 11px;
  line-height: 1.6;
  color: var(--text-primary);
  margin: 0;
  white-space: pre;
  height: calc(50vh - 80px);
  overflow: auto;
  font-family: "JetBrains Mono", "Consolas", monospace;
}

.highlight {
  color: var(--boyuan-blue-mid);
  font-weight: 600;
}

.old .highlight {
  color: #dc2626;
}

/* Prompt Box */
.prompt-box {
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: var(--space-md);
}

.prompt-code {
  font-size: 11px;
  line-height: 1.8;
  color: var(--text-secondary);
  margin: 0;
  white-space: pre;
  font-family: "JetBrains Mono", "Consolas", monospace;
}

.prompt-var {
  color: var(--boyuan-blue-mid);
  font-weight: 600;
}
</style>
