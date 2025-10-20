// links.js - TABULKOVÁ VERZE S NOVÝM MODALEM

const linksTableBody = document.getElementById('linksTableBody');
const addLinkButton = document.getElementById('addLinkButton');
const linkNameInput = document.getElementById('linkName');
const linkUrlInput = document.getElementById('linkUrl');
const syncStatusMessageElement = document.getElementById('syncStatusMessage');
const clearAllLinksButton = document.getElementById('clearAllLinksButton');
const saveEditButton = document.getElementById('saveEditButton');

let syncMessageTimeout;
let currentLinks = [];
let actionInProgress = false;

function toggleSyncMessage(show, message = "Probíhá synchronizace dat...", isError = false) {
    if (!syncStatusMessageElement) return;
    clearTimeout(syncMessageTimeout);

    syncStatusMessageElement.textContent = message;
    syncStatusMessageElement.classList.toggle('error', isError);

    if (show) {
        syncStatusMessageElement.style.display = 'block';
        syncStatusMessageElement.style.opacity = '1';
        syncMessageTimeout = setTimeout(() => {
            syncStatusMessageElement.style.opacity = '0';
            setTimeout(() => {
                syncStatusMessageElement.style.display = 'none';
            }, 300);
        }, isError ? 4000 : 2000);
    } else {
        syncStatusMessageElement.style.opacity = '0';
        setTimeout(() => {
            syncStatusMessageElement.style.display = 'none';
        }, 300);
    }
}

// Vyplnění tabulky
function populateLinksTable(links) {
    linksTableBody.innerHTML = '';

    if (links.length === 0) {
        const noDataRow = document.createElement('tr');
        noDataRow.innerHTML = `<td colspan="4" style="text-align: center; color: #888;">🌌 Žádné odkazy v Hvězdné databázi</td>`;
        linksTableBody.appendChild(noDataRow);
        clearAllLinksButton.style.display = 'none';
        return;
    }

    const fragment = document.createDocumentFragment();

    links.forEach((link, index) => {
        const row = document.createElement('tr');
        row.dataset.linkId = link.id;
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${link.name}</td>
            <td><button class="url-button" data-url="${link.url}" title="${link.url}">🔗 Odkaz</button></td>
            <td>
                <div class="action-buttons">
                    <button class="move-up-button" ${index === 0 ? 'disabled' : ''}>⬆️</button>
                    <button class="move-down-button" ${index === links.length - 1 ? 'disabled' : ''}>⬇️</button>
                    <button class="edit-link-button" data-name="${link.name}" data-url="${link.url}">✏️</button>
                    <button class="delete-link-button">🗑️</button>
                </div>
            </td>
        `;
        fragment.appendChild(row);
    });

    linksTableBody.appendChild(fragment);
    clearAllLinksButton.style.display = links.length > 0 ? 'block' : 'none';
    currentLinks = links;
}

// Event Delegation na tabulce
linksTableBody.addEventListener('click', async (e) => {
    if (actionInProgress) return;
    
    const target = e.target;
    
    // URL tlačítko - otevřít odkaz
    if (target.classList.contains('url-button')) {
        const url = target.dataset.url;
        window.open(url, '_blank');
        return;
    }
    
    const row = target.closest('tr');
    if (!row) return;

    const linkId = row.dataset.linkId;
    const currentIndex = currentLinks.findIndex(l => l.id === linkId);
    if (currentIndex === -1) return;

    // SMAZÁNÍ
    if (target.classList.contains('delete-link-button')) {
        if (confirm('Opravdu chcete smazat tento odkaz? Tato akce je nevratná.')) {
            actionInProgress = true;
            toggleSyncMessage(true);
            const success = await window.deleteLinkFromFirestore(linkId);
            if (success) {
                await loadAndDisplayLinks();
            } else {
                toggleSyncMessage(true, 'Chyba při mazání odkazu.', true);
            }
            toggleSyncMessage(false);
            actionInProgress = false;
        }
    }

    // PŘESUN NAHORU
    if (target.classList.contains('move-up-button')) {
        if (currentIndex > 0) {
            actionInProgress = true;
            toggleSyncMessage(true);
            const targetLink = currentLinks[currentIndex - 1];
            const success = await window.updateLinkOrderInFirestore(
                linkId, currentLinks[currentIndex].orderIndex,
                targetLink.id, targetLink.orderIndex
            );
            if (success) {
                await loadAndDisplayLinks();
            } else {
                toggleSyncMessage(true, 'Chyba při přesouvání odkazu.', true);
            }
            toggleSyncMessage(false);
            actionInProgress = false;
        }
    }

    // PŘESUN DOLŮ
    if (target.classList.contains('move-down-button')) {
        if (currentIndex < currentLinks.length - 1) {
            actionInProgress = true;
            toggleSyncMessage(true);
            const targetLink = currentLinks[currentIndex + 1];
            const success = await window.updateLinkOrderInFirestore(
                linkId, currentLinks[currentIndex].orderIndex,
                targetLink.id, targetLink.orderIndex
            );
            if (success) {
                await loadAndDisplayLinks();
            } else {
                toggleSyncMessage(true, 'Chyba při přesouvání odkazu.', true);
            }
            toggleSyncMessage(false);
            actionInProgress = false;
        }
    }

    // EDITACE
    if (target.classList.contains('edit-link-button')) {
        window.modalManager.open(linkId, target.dataset.name, target.dataset.url);
    }
});

const initialLinks = [
    { name: 'Starfleet Command', url: 'https://www.startrek.com' },
    { name: 'Vincentka Sirup', url: 'https://www.benu.cz/vincentka-sirup-s-jitrocelem-a-materidouskou-200ml' },
    { name: 'Star Trek Universe', url: 'https://jirka22med.github.io/star-trek-universe/' },
    { name: 'QR Kód Generátor', url: 'https://jirka22med.github.io/qr-kod-generato-novy/' },
    { name: 'ST Hudební přehrávač (mobil)', url: 'https://jirka22med.github.io/Star-Trek-audio-prehravac-novy-2/' },
    { name: 'ST Hudební přehrávač v.2.1', url: 'https://jirka22med.github.io/Star-Trek-Hudebni-prehravac/' },
    { name: 'Star Trek Hudební Přehrávač 3', url: 'https://jirka22med.github.io/-jirka22med-star-trek-audio-player-v.3/' },
    { name: 'Můj osobní web (Genesis)', url: 'https://jirka22med.github.io/jirikuv-projekt-genesis/index.html' },
    { name: 'Pokročilý váhový tracker', url: 'https://jirka22med.github.io/moje-vaha-log-beta-2/' },
    { name: 'Jirkův váhový tracker', url: 'https://jirka22med.github.io/jirikuv-vahovy-tracker/' },
    { name: 'audio prehravac test', url: 'https://jirka22med.github.io/-jirka22med-star-trek-audio-player-v.3/' },
    { name: 'prehravac', url: 'https://jirka22med.github.io/star-trek-hudebni-prehravac-2/' },
    { name: 'firebase-synced-player', url: 'https://jirka22med.github.io/firebase-synced-player/' },
    { name: 'Star Trek: Kapitoly', url: 'https://jirka22med.github.io/Pribehy-posadek-Enerprise/' },
    { name: 'Můj osobní web', url: 'https://jirka22med.github.io/muj-osobni-web/' },
];

async function importInitialLinksToFirebase() {
    console.log("📥 Importuji počáteční odkazy do Firebase...");
    toggleSyncMessage(true);
    let successCount = 0;
    
    for (let i = 0; i < initialLinks.length; i++) {
        const link = initialLinks[i];
        const success = await window.addLinkToFirestore(link.name, link.url, i);
        if (success) successCount++;
    }
    
    console.log(`✅ Import dokončen: ${successCount}/${initialLinks.length}`);
    toggleSyncMessage(false);
    await loadAndDisplayLinks();
}

async function loadAndDisplayLinks() {
    toggleSyncMessage(true);

    const firebaseInitialized = await window.initializeFirebaseLinksApp();
    if (!firebaseInitialized) {
        linksTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #ff3333;">❌ Chyba: Nelze se připojit k Firebase databázi</td></tr>';
        toggleSyncMessage(false);
        return;
    }

    let links = await window.getLinksFromFirestore();

    if (links.length === 0 && initialLinks.length > 0) {
        await importInitialLinksToFirebase();
        links = await window.getLinksFromFirestore();
    }

    populateLinksTable(links);
    toggleSyncMessage(false);
}

// PŘIDÁNÍ NOVÉHO ODKAZU
if (addLinkButton) {
    addLinkButton.addEventListener('click', async () => {
        if (actionInProgress) return;

        const linkName = linkNameInput.value.trim();
        const linkUrl = linkUrlInput.value.trim();

        if (linkName && linkUrl) {
            actionInProgress = true;
            toggleSyncMessage(true);
            const newOrderIndex = currentLinks.length > 0 ? Math.max(...currentLinks.map(l => l.orderIndex)) + 1 : 0;

            const success = await window.addLinkToFirestore(linkName, linkUrl, newOrderIndex);
            if (success) {
                linkNameInput.value = '';
                linkUrlInput.value = '';
                await loadAndDisplayLinks();
            } else {
                toggleSyncMessage(true, 'Chyba při přidávání odkazu.', true);
            }
            toggleSyncMessage(false);
            actionInProgress = false;
        } else {
            toggleSyncMessage(true, 'Vyplň název i URL adresu!', true);
        }
    });
}

// SMAZÁNÍ VŠECH ODKAZŮ
if (clearAllLinksButton) {
    clearAllLinksButton.addEventListener('click', async () => {
        if (actionInProgress) return;

        if (confirm('⚠️ OPRAVDU chcete smazat VŠECHNY odkazy?')) {
            if (confirm('⚠️ JSTE SI ABSOLUTNĚ JISTI? Toto nelze vrátit!')) {
                actionInProgress = true;
                toggleSyncMessage(true);

                try {
                    const allLinks = await window.getLinksFromFirestore();
                    let deleteCount = 0;

                    for (const link of allLinks) {
                        const success = await window.deleteLinkFromFirestore(link.id);
                        if (success) deleteCount++;
                    }

                    if (deleteCount === allLinks.length) {
                        await loadAndDisplayLinks();
                        toggleSyncMessage(true, '✅ Všechny odkazy smazány!');
                    } else {
                        toggleSyncMessage(true, `Smazáno ${deleteCount}/${allLinks.length}.`, true);
                    }
                } catch (error) {
                    console.error("❌ Chyba:", error);
                    toggleSyncMessage(true, 'Chyba při mazání.', true);
                }

                toggleSyncMessage(false);
                actionInProgress = false;
            }
        }
    });
}

// ULOŽENÍ EDITU
if (saveEditButton) {
    saveEditButton.addEventListener('click', async () => {
        if (actionInProgress) return;

        const data = window.modalManager.getData();

        if (!window.modalManager.isValid()) {
            toggleSyncMessage(true, 'Vyplň název i URL!', true);
            return;
        }

        actionInProgress = true;
        toggleSyncMessage(true);
        const success = await window.updateLinkInFirestore(data.id, data.name, data.url);

        if (success) {
            toggleSyncMessage(true, '✅ Odkaz aktualizován!');
            window.modalManager.close();
            await loadAndDisplayLinks();
        } else {
            toggleSyncMessage(true, 'Chyba při aktualizaci.', true);
        }
        toggleSyncMessage(false);
        actionInProgress = false;
    });
}

// INICIALIZACE
document.addEventListener('DOMContentLoaded', loadAndDisplayLinks);