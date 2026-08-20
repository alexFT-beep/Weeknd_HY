/**
 * Presentation Component: ToastComponent
 * Manages toast notifications with micro-animations.
 */
export class ToastComponent {
  constructor() {
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none w-full max-w-sm px-4';
      document.body.appendChild(this.container);
    }
  }

  /**
   * @param {string} message
   * @param {string} [type] - 'success' | 'info' | 'warning'
   */
  show(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast-enter pointer-events-auto flex items-center gap-3 bg-surface-container-high border border-primary/40 text-on-surface px-4 py-2.5 rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.6)] text-xs sm:text-sm font-medium';
    
    const icon = type === 'success' ? 'check_circle' : 'info';
    toast.innerHTML = `
      <span class="material-symbols-outlined text-primary text-[18px]">${icon}</span>
      <span class="truncate">${message}</span>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('toast-enter');
      toast.classList.add('toast-exit');
      setTimeout(() => {
        if (toast.parentElement) {
          toast.parentElement.removeChild(toast);
        }
      }, 300);
    }, 2200);
  }
}
