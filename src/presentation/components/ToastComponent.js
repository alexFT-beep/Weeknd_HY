/**
 * Presentation Component: ToastComponent
 * Manages toast notifications with micro-animations and responsive full-text display on mobile.
 */
export class ToastComponent {
  constructor() {
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none w-full max-w-[94vw] sm:max-w-md px-3';
      document.body.appendChild(this.container);
    }
  }

  /**
   * @param {string} message
   * @param {string} [type] - 'success' | 'info' | 'warning'
   */
  show(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast-enter pointer-events-auto flex items-center gap-2.5 bg-zinc-900/95 border border-primary/60 text-white px-4 py-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.8)] text-xs sm:text-sm font-semibold backdrop-blur-md w-auto max-w-full leading-snug';
    
    const icon = type === 'success' ? 'check_circle' : 'info';
    toast.innerHTML = `
      <span class="material-symbols-outlined text-primary text-[20px] shrink-0">${icon}</span>
      <span class="break-words text-left">${message}</span>
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
    }, 2500);
  }
}
