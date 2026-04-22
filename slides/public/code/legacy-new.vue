<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  title: {
    type: String,
    default: '窗口标题'
  },
  resizable: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['close', 'minimize', 'maximize'])

// State
const count = ref(0)
const inputValue = ref('')
const activeTab = ref('tab1')
const isMaximized = ref(false)

// Sample data for grid
const tableData = [
  { id: 1, name: '项目 Alpha', status: '进行中', progress: 75 },
  { id: 2, name: '项目 Beta', status: '已完成', progress: 100 },
  { id: 3, name: '项目 Gamma', status: '规划中', progress: 20 }
]

// Computed
const statusClass = computed(() => (status) => {
  return {
    'status-running': status === '进行中',
    'status-completed': status === '已完成',
    'status-planning': status === '规划中'
  }
})
</script>

<template>
  <div class="modern-window" :class="{ maximized: isMaximized }">
    <!-- Header -->
    <header class="window-header">
      <h1 class="window-title">{{ title }}</h1>
      <div class="window-controls">
        <button 
          class="control-btn minimize"
          @click="emits('minimize')"
          aria-label="最小化"
        >−</button>
        <button 
          class="control-btn maximize"
          @click="isMaximized = !isMaximized"
          aria-label="最大化"
        >◻</button>
        <button 
          class="control-btn close"
          @click="emits('close')"
          aria-label="关闭"
        >×</button>
      </div>
    </header>

    <!-- Menu Bar -->
    <nav class="menu-bar">
      <button class="menu-item">文件</button>
      <button class="menu-item">编辑</button>
      <button class="menu-item">视图</button>
      <button class="menu-item">工具</button>
      <button class="menu-item">帮助</button>
    </nav>

    <!-- Toolbar -->
    <div class="toolbar">
      <button class="toolbar-btn" title="新建">📄</button>
      <button class="toolbar-btn" title="打开">📁</button>
      <button class="toolbar-btn" title="保存">💾</button>
      <div class="toolbar-divider"></div>
      <button class="toolbar-btn" title="撤销">↩</button>
      <button class="toolbar-btn" title="重做">↪</button>
    </div>

    <!-- Tab Container -->
    <div class="tab-container">
      <div class="tab-headers">
        <button
          v-for="tab in ['tab1', 'tab2', 'tab3']"
          :key="tab"
          class="tab-header"
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab"
        >
          {{ tab === 'tab1' ? '数据视图' : tab === 'tab2' ? '详细信息' : '设置' }}
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <div v-show="activeTab === 'tab1'" class="tab-panel">
          <!-- Input Section -->
          <div class="input-section">
            <input
              v-model="inputValue"
              type="text"
              class="modern-input"
              placeholder="输入搜索关键词..."
            />
            <button class="btn btn-primary" @click="count++">
              搜索 ({{ count }})
            </button>
          </div>

          <!-- Data Grid -->
          <div class="data-grid-wrapper">
            <table class="modern-table">
              <thead>
                <tr>
                  <th>项目名称</th>
                  <th>状态</th>
                  <th>进度</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tableData" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>
                    <span :class="['status-badge', statusClass(item.status)]">
                      {{ item.status }}
                    </span>
                  </td>
                  <td>
                    <progress 
                      class="progress-bar" 
                      :value="item.progress" 
                      max="100"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-show="activeTab === 'tab2'" class="tab-panel">
          <p>详细信息面板内容...</p>
        </div>

        <div v-show="activeTab === 'tab3'" class="tab-panel">
          <p>设置面板内容...</p>
        </div>
      </div>
    </div>

    <!-- Status Bar -->
    <footer class="status-bar">
      <span>就绪</span>
      <span>{{ tableData.length }} 个项目</span>
    </footer>
  </div>
</template>

<style scoped>
/* CSS Variables for theming */
.modern-window {
  --primary: #3b82f6;
  --primary-hover: #2563eb;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --bg-base: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--bg-base);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.modern-window.maximized {
  border-radius: 0;
}

/* Header */
.window-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%);
  color: white;
}

.window-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
}

.window-controls {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.control-btn.close:hover {
  background: var(--danger);
}

/* Menu Bar */
.menu-bar {
  display: flex;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.menu-item {
  padding: 0.375rem 0.75rem;
  border: none;
  background: transparent;
  color: var(--text-primary);
  font-size: 0.875rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.2s;
}

.menu-item:hover {
  background: var(--primary);
  color: white;
}

/* Toolbar */
.toolbar {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  background: var(--bg-base);
  border-bottom: 1px solid var(--border-color);
}

.toolbar-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.toolbar-btn:hover {
  background: var(--bg-secondary);
}

.toolbar-divider {
  width: 1px;
  height: 24px;
  background: var(--border-color);
  margin: 0 0.5rem;
}

/* Tabs */
.tab-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-secondary);
}

.tab-headers {
  display: flex;
  padding: 0.5rem 1rem 0;
  background: var(--bg-base);
  border-bottom: 1px solid var(--border-color);
}

.tab-header {
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.875rem;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}

.tab-header.active {
  color: var(--primary);
  background: var(--bg-secondary);
  border-bottom-color: var(--primary);
}

.tab-content {
  flex: 1;
  padding: 1rem;
  overflow: auto;
}

.tab-panel {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Input Section */
.input-section {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.modern-input {
  flex: 1;
  padding: 0.625rem 0.875rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  transition: all 0.2s;
}

.modern-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Buttons */
.btn {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-hover);
}

/* Table */
.data-grid-wrapper {
  background: var(--bg-base);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
}

.modern-table th {
  padding: 0.75rem 1rem;
  background: var(--bg-secondary);
  text-align: left;
  font-weight: 600;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-color);
}

.modern-table td {
  padding: 0.875rem 1rem;
  border-bottom: 1px solid var(--border-color);
}

.modern-table tr:last-child td {
  border-bottom: none;
}

.modern-table tr:hover {
  background: var(--bg-secondary);
}

/* Status Badge */
.status-badge {
  display: inline-flex;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-running {
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary);
}

.status-completed {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success);
}

.status-planning {
  background: rgba(245, 158, 11, 0.1);
  color: var(--warning);
}

/* Progress Bar */
.progress-bar {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  appearance: none;
  background: var(--bg-secondary);
}

.progress-bar::-webkit-progress-bar {
  background: var(--bg-secondary);
  border-radius: 4px;
}

.progress-bar::-webkit-progress-value {
  background: var(--primary);
  border-radius: 4px;
}

/* Status Bar */
.status-bar {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  font-size: 0.75rem;
  color: var(--text-secondary);
}
</style>
