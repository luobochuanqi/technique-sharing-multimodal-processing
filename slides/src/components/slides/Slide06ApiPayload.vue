<script setup>
import { ref } from "vue";

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});

const codeSnippet = `[
  {"type": "text", "text": "分析这个系统架构图"},
  {"type": "image", "data": "<base64_image>"},
  {"type": "text", "text": "找出潜在问题"},
  {"type": "audio", "data": "<audio_frames>"},
  {"type": "video", "data": "<video_patches>"}
]`;
</script>

<template>
  <div class="api-payload-content">
    <div class="api-content">
      <div class="api-key-point slide-left">
        <div class="point-icon">🔄</div>
        <div class="point-text">
          <strong>交错 Token 序列 (Interleaved Token Stream)</strong>
          <span>文本/图像/音频/视频统一编码为数组</span>
        </div>
      </div>
      
      <div class="code-container slide-up">
        <div class="code-header">
          <span class="code-label">JSON Payload</span>
          <button class="copy-btn" @click="navigator.clipboard.writeText(codeSnippet)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
        <pre class="code-block"><code>{{ codeSnippet }}</code></pre>
      </div>
      
      <div class="api-note fade-in">
        <span class="note-icon">💡</span>
        <span>万物皆可 Token 化：多模态输入在底层被映射到同一高维隐空间，不再有主体与附件之分</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.api-payload-content {
  height: 100%;
  padding: var(--space-2xl) var(--space-3xl) var(--space-3xl);
  overflow-y: auto;
}

.api-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
  max-width: 900px;
  margin: 0 auto;
}

.api-key-point {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  padding: var(--space-xl);
  background: linear-gradient(135deg, rgba(21, 115, 231, 0.08) 0%, rgba(21, 115, 231, 0.02) 100%);
  border: 1px solid rgba(21, 115, 231, 0.2);
  border-radius: 12px;
}

.point-icon {
  font-size: 48px;
  flex-shrink: 0;
}

.point-text {
  font-size: var(--text-lg);
  color: var(--text-primary);
  line-height: 1.6;
}

.point-text strong {
  display: block;
  margin-bottom: var(--space-sm);
  color: var(--boyuan-blue-mid);
}

.point-text code {
  font-family: var(--font-mono);
  font-size: var(--text-base);
  background: var(--bg-gray);
  padding: var(--space-xs) var(--space-sm);
  border-radius: 4px;
  color: var(--text-secondary);
}

.code-container {
  background: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  background: #2d2d2d;
  border-bottom: 1px solid #3d3d3d;
}

.code-label {
  font-size: var(--text-sm);
  color: #9cdcfe;
  font-weight: 500;
}

.copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: 1px solid #3d3d3d;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: #3d3d3d;
  border-color: #5d5d5d;
}

.copy-btn svg {
  width: 18px;
  height: 18px;
  color: #9cdcfe;
}

.code-block {
  margin: 0;
  padding: var(--space-xl);
  overflow-x: auto;
  font-family: 'JetBrains Mono', 'Consolas', monospace;
  font-size: var(--text-sm);
  line-height: 1.8;
  color: #d4d4d4;
}

.code-block code {
  color: inherit;
}

.api-note {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg) var(--space-xl);
  background: linear-gradient(135deg, rgba(21, 115, 231, 0.05) 0%, transparent 100%);
  border: 1px solid rgba(21, 115, 231, 0.15);
  border-radius: 12px;
  font-size: var(--text-base);
  color: var(--text-secondary);
}

.note-icon {
  font-size: 24px;
  flex-shrink: 0;
}
</style>
