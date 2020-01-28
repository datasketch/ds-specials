function Tabs(tabsContainerElement) {
  this.tabsContainer = tabsContainerElement;
  this.tabs = tabsContainerElement.querySelectorAll('.tab');
  this.navTabs = tabsContainerElement.querySelector('.nav-tabs');
  this.handleListener = this.handleListener.bind(this);
  // Hide all tabs
  this.hideAll();
  // Show first tab
  this.tabs[0].style.display = 'block';
  // Save current active tab
  this.currentTab = this.tabs[0];
  // Attach event to navTabs
  this.navTabs.addEventListener('click', this.handleListener);
}

Tabs.prototype.hideAll = function hideAll() {
  this.tabs.forEach(function (child) {
    child.style.display = 'none';
  });
}

Tabs.prototype.handleListener = function handleListener(event) {
  var element = event.target;
  if (!element.hasAttribute('data-tab')) {
    return;
  }
  var tabId = element.dataset.tab;
  var tabContent = this.tabsContainer.querySelector('#' +  tabId);
  if (tabContent === this.currentTab) {
    return;
  }
  this.hideAll();
  tabContent.style.display = 'block';
  this.currentTab = tabContent;
}
