// Legacy App - Minimal Interactivity
// 演示用简单交互

(function() {
  let clickCount = 0;
  
  // 搜索按钮点击
  var searchBtn = document.querySelector('.btn-primary');
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      clickCount++;
      var input = document.querySelector('.text-input');
      var keyword = input ? input.value : '空';
      console.log('[搜索] 点击次数:', clickCount, '关键词:', keyword);
      alert('搜索功能演示\n\n点击次数：' + clickCount + '\n关键词：' + keyword);
    });
  }
  
  // 标签页切换
  var tabHeaders = document.querySelectorAll('.tab-header');
  tabHeaders.forEach(function(tab, index) {
    tab.addEventListener('click', function() {
      tabHeaders.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      console.log('[标签页] 切换到:', tab.textContent);
    });
  });
  
  // 窗口控制按钮
  var minimizeBtn = document.querySelector('.btn-minimize');
  var maximizeBtn = document.querySelector('.btn-maximize');
  var closeBtn = document.querySelector('.btn-close');
  
  if (minimizeBtn) {
    minimizeBtn.addEventListener('click', function() {
      console.log('[窗口] 最小化');
    });
  }
  
  if (maximizeBtn) {
    maximizeBtn.addEventListener('click', function() {
      console.log('[窗口] 最大化');
    });
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      console.log('[窗口] 关闭');
      if (confirm('确定要关闭演示吗？')) {
        document.body.innerHTML = '<div style="text-align:center;padding:50px;color:#666;"><h1>演示已结束</h1><p>刷新页面重新开始</p></div>';
      }
    });
  }
  
  // 表格行点击
  var tableRows = document.querySelectorAll('.data-grid tbody tr');
  tableRows.forEach(function(row) {
    row.addEventListener('click', function() {
      var projectName = row.cells[0] ? row.cells[0].textContent : '未知';
      console.log('[表格] 选中项目:', projectName);
    });
  });
  
  console.log('[Legacy App] 已加载完成');
})();
