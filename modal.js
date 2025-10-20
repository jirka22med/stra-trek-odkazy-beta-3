// MODAL SYSTEM - KOMPLETNÍ NOVÁ IMPLEMENTACE

class ModalManager {
    constructor() {
        this.modal = document.getElementById('editLinkModal');
        this.backdrop = this.modal;
        this.content = this.modal.querySelector('.modal-content');
        this.closeBtn = document.getElementById('cancelEditButton');
        this.saveBtn = document.getElementById('saveEditButton');
        
        this.modalLinkId = document.getElementById('modalLinkId');
        this.modalLinkName = document.getElementById('modalLinkName');
        this.modalLinkUrl = document.getElementById('modalLinkUrl');
        
        this.isOpen = false;
        
        // Inicializace
        this.init();
    }
    
    init() {
        // Ujisti se že je modal skrytý
        this.close();
        
        // Event listenery
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        
        // Kliknutí mimo modal - zavře se
        if (this.backdrop) {
            this.backdrop.addEventListener('click', (e) => {
                if (e.target === this.backdrop) {
                    this.close();
                }
            });
        }
        
        // ESC klávesa - zavře se
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }
    
    open(linkId, linkName, linkUrl) {
        if (!this.modal) return;
        
        // Vyplní data
        this.modalLinkId.value = linkId;
        this.modalLinkName.value = linkName;
        this.modalLinkUrl.value = linkUrl;
        
        // Přidá active třídu
        this.modal.classList.add('active');
        this.isOpen = true;
        
        // Focus na první input
        this.modalLinkName.focus();
        
        console.log('✅ Modal otevřen');
    }
    
    close() {
        if (!this.modal) return;
        
        // Odebere active třídu
        this.modal.classList.remove('active');
        this.isOpen = false;
        
        // Vymažeme data
        this.modalLinkId.value = '';
        this.modalLinkName.value = '';
        this.modalLinkUrl.value = '';
        
        console.log('❌ Modal zavřen');
    }
    
    getData() {
        return {
            id: this.modalLinkId.value,
            name: this.modalLinkName.value.trim(),
            url: this.modalLinkUrl.value.trim()
        };
    }
    
    isValid() {
        const data = this.getData();
        return data.id && data.name && data.url;
    }
}

// Vytvoř globální instanci modalu
window.modalManager = new ModalManager();