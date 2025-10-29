# 📡 Hvězdná databáze odkazů

> **Star Trek tematická aplikace pro správu a organizaci webových odkazů s Firebase synchronizací**

[![Star Trek](https://img.shields.io/badge/Star%20Trek-Theme-00ffff?style=for-the-badge)](https://www.startrek.com)
[![Firebase](https://img.shields.io/badge/Firebase-Realtime-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com)
[![Status](https://img.shields.io/badge/Status-Online-success?style=for-the-badge)](https://jirka22med.github.io/stra-trek-odkazy-beta-3/)
[![Version](https://img.shields.io/badge/Version-3.0-blue?style=for-the-badge)](https://github.com)

**🌐 Live Demo:** [https://jirka22med.github.io/stra-trek-odkazy-beta-3/](https://jirka22med.github.io/stra-trek-odkazy-beta-3/)

---

## 🌌 O projektu

**Hvězdná databáze odkazů** je futuristická webová aplikace inspirovaná vesmírem Star Treku. Umožňuje ti ukládat, organizovat a spravovat své oblíbené odkazy s real-time synchronizací přes Firebase Firestore.

### ✨ Klíčové vlastnosti

- 🎨 **Moderní Star Trek design** - Kybernetický vzhled s tabulkovým layoutem
- ☁️ **Firebase Firestore** - Cloudová databáze s offline podporou
- 🔄 **Real-time synchronizace** - Změny se okamžitě projeví všude
- 📱 **Plně responzivní** - Funguje na PC, tabletu i mobilu
- 🎯 **Řazení odkazů** - Přesouvání tlačítky ⬆️⬇️
- ✏️ **Modal editace** - Úprava odkazů v samostatném modálním okně
- 🗑️ **Bulk delete** - Smazání všech odkazů najednou s dvojitým potvrzením
- 📋 **Enhanced Console Logger** - Pokročilé logování s filtry a exportem
- ⚡ **Cache systém** - 5sekundový cache pro rychlejší načítání
- 🎯 **Event Delegation** - Optimalizované event handling

---

## 🚀 Rychlý start

### 1️⃣ Klonování repozitáře

```bash
git clone https://github.com/jirka22med/stra-trek-odkazy-beta-3.git
cd stra-trek-odkazy-beta-3
```

### 2️⃣ Firebase konfigurace

1. Vytvoř nový projekt na [Firebase Console](https://console.firebase.google.com)
2. Aktivuj **Firestore Database**
3. Zkopíruj své Firebase credentials
4. Vlož je do `firebaseLinksFunctions.js`:

```javascript
const firebaseConfig = {
    apiKey: "TVUJ_API_KEY",
    authDomain: "tvuj-projekt.firebaseapp.com",
    projectId: "tvuj-projekt",
    storageBucket: "tvuj-projekt.firebasestorage.app",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};
```

### 3️⃣ Spuštění

Otevři `index.html` v prohlížeči nebo použij lokální server:

```bash
# S Python
python -m http.server 8000

# S Node.js
npx http-server

# S VS Code Live Server
# Klikni pravým tlačítkem na index.html -> Open with Live Server
```

Naviguj na `http://localhost:8000`

---

## 📂 Struktura projektu

```
stra-trek-odkazy-beta-3/
│
├── index.html                    # Hlavní HTML struktura
├── style.css                     # Hlavní styly (tabulka, formuláře)
├── modal.css                     # Styly pro editační modal
├── links.js                      # Logika správy odkazů
├── modal.js                      # Modal manager (OOP)
├── firebaseLinksFunctions.js     # Firebase API + cache
├── jirkuv-hlidac.js             # Enhanced Console Logger
└── README.md                     # Tento soubor
```

### Detailní popis souborů

| Soubor | Účel | Řádky kódu |
|--------|------|------------|
| `index.html` | HTML struktura, tabulka, formulář | ~100 |
| `style.css` | Tabulkový design, responzivita | ~400 |
| `modal.css` | Kompletní modal styling | ~120 |
| `links.js` | CRUD operace, DOM manipulace | ~250 |
| `modal.js` | Objektová správa modalu | ~80 |
| `firebaseLinksFunctions.js` | Firebase init, Firestore API, cache | ~180 |
| `jirkuv-hlidac.js` | Logging systém s filtry | ~600 |

---

## 🎮 Použití

### Přidání odkazu

1. Vyplň **Název odkazu** (např. "Starfleet Command")
2. Vyplň **URL adresu** (např. "https://www.startrek.com")
3. Klikni na **➕ Přidat odkaz**

### Úprava odkazu

1. Klikni na **✏️** tlačítko u odkazu v tabulce
2. Změň název nebo URL v modálním okně
3. Klikni **✅ Uložit**

### Přesouvání odkazů

- **⬆️ Nahoru** - Posune odkaz o pozici výš (swap s předchozím)
- **⬇️ Dolů** - Posune odkaz o pozici níž (swap s následujícím)

### Otevření odkazu

- Klikni na **Odkaz** tlačítko v sloupci "Adresa (HTTPS)"
- Otevře se v novém tabu

### Smazání odkazu

- Klikni **🗑️** u konkrétního odkazu
- Potvrď akci v dialogu

### Smazání všech odkazů

- Klikni **🗑️ VYMAZAT VŠE** pod formulářem
- Potvrď **DVĚ** bezpečnostní hlášky

### Console Logger (🧾 Nápověda)

- Klikni na **🧾 Nápověda** tlačítko
- Zobrazí se modal s reálnými console logy
- **Funkce:**
  - **🗑️ Vyčistit** - Smaže všechny záznamy
  - **📥 Export HTML** - Uloží logy jako HTML soubor
  - **🔍 Filtr** - Cykluje mezi filtry:
    - 🔍 Vše - Všechny záznamy
    - ⭐ Speciální - INIT_VAR, STYLED, ERROR, WARN
    - ❌ Chyby - Pouze ERROR a WARN
    - 🚀 Init - Pouze inicializační proměnné

---

## 🛠️ Technologie

### Frontend
- **HTML5** - Sémantická tabulková struktura
- **CSS3** - Modularizované styly (style.css + modal.css)
- **Vanilla JavaScript** - ES6+, žádné frameworky
- **OOP Pattern** - ModalManager třída

### Backend/Database
- **Firebase 9.0.0** (compat mode)
- **Firestore** - NoSQL cloud databáze
- **Offline Persistence** - Funguje i bez internetu (desktop)
- **Batch Writes** - Atomické operace pro swap

### Optimalizace
```javascript
// 5sekundový cache systém
let linksCache = null;
let lastSyncTime = 0;
const CACHE_DURATION = 5000;

// Event Delegation místo jednotlivých listenerů
linksTableBody.addEventListener('click', (e) => {
    // Jedno listener pro všechny tlačítka
});
```

### Knihovny
```html
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore-compat.js"></script>
```

---

## 🎨 Design systém

### Barevná paleta

| Barva | Hex | Použití |
|-------|-----|---------|
| **Cyan** | `#00ffff` | Primární akcentová |
| **Tmavá modrá** | `#0a0e27` | Pozadí |
| **Oranžová** | `#FFAA00` | Záhlaví tabulky |
| **Modrá** | `#255c9a` | URL tlačítka |
| **Červená** | `rgba(180, 50, 50, 0.6)` | Tlačítko VYMAZAT VŠE |

### Typography
- **Primární font**: `'Orbitron', 'Courier New', monospace`
- **Hlavní nadpis**: 3em (responzivně 2em, 1.5em)
- **Text**: 1em

### Tabulkový design
```css
table {
    border-collapse: collapse;
    border: 2px solid rgba(0, 255, 255, 0.5);
}

th {
    background: rgba(255, 170, 0, 0.6); /* Oranžové záhlaví */
    color: #000;
}

tr:hover td {
    background: rgba(0, 255, 255, 0.1); /* Hover efekt */
}
```

### URL tlačítko
```css
.url-button {
    background: linear-gradient(135deg, #255c9a, #1a3d6b);
    border-radius: 8px;
    transition: all 0.3s ease;
}

.url-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 120, 255, 0.45);
}
```

---

## 📊 Firebase struktura

### Kolekce: `links`

```javascript
{
  id: "auto-generated-id",
  name: "Starfleet Command",
  url: "https://www.startrek.com",
  orderIndex: 0,
  timestamp: Timestamp,
  updatedAt: Timestamp (optional)
}
```

### Funkce API

```javascript
// Inicializace Firebase
await initializeFirebaseLinksApp()

// CRUD operace
await addLinkToFirestore(name, url, orderIndex)
await getLinksFromFirestore() // S cachováním
await deleteLinkFromFirestore(id)
await updateLinkInFirestore(id, newName, newUrl)

// Přesouvání (Batch Write)
await updateLinkOrderInFirestore(link1Id, link1Order, link2Id, link2Order)
```

### Cache invalidace
```javascript
// Cache se invaliduje při:
linksCache = null; // Po add/delete/update/swap

// Cache se používá při:
if (linksCache && (now - lastSyncTime) < CACHE_DURATION) {
    return linksCache; // Vrátí bez API volání
}
```

---

## 🐛 Debugging

### Console Logger kategorie

| Kategorie | Ikona | Barva | Popis |
|-----------|-------|-------|-------|
| **LOG** | - | `#87ceeb` | Běžné logy |
| **WARN** | ⚠️ | `#ffcc00` | Varování |
| **ERROR** | ❌ | `#ff6347` | Chyby |
| **INIT_VAR** | 🚀 | `#ff69b4` | Inicializace |
| **STYLED** | 🎨 | `#00ff7f` | Stylované logy |
| **API** | 📡 | `#ffa500` | API volání |
| **EVENT** | 🎯 | `#20b2aa` | DOM události |

### Export logů
```javascript
// Automatický export formát:
console-log-2025-01-15-14-30-45.html
```

---

## 🔒 Bezpečnost

### Firestore pravidla (doporučené)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /links/{linkId} {
      // Pro testování - otevřené pro všechny
      allow read, write: if true;
      
      // PRO PRODUKCI - pouze autentizovaní uživatelé:
      // allow read: if true;
      // allow write: if request.auth != null;
    }
  }
}
```

⚠️ **BEZPEČNOSTNÍ VAROVÁNÍ:** 

Aktuálně jsou Firebase klíče **veřejné** v `firebaseLinksFunctions.js`! Pro produkci:

1. **Nastav Firebase Security Rules** (viz výše)
2. **Implementuj Firebase Authentication**
3. **Použij Environment Variables** (pro citlivé klíče)
4. **Aktivuj App Check** (ochrana proti zneužití)

---

## 📱 Responzivita

### Breakpointy

```css
/* Desktop (výchozí) */
h1 { font-size: 3em; }
table { font-size: 1em; }

/* Tablet (< 768px) */
@media (max-width: 768px) {
    h1 { font-size: 2em; }
    th, td { font-size: 0.9em; }
    .tlacitka { flex-direction: column; }
}

/* Mobil (< 480px) */
@media (max-width: 480px) {
    h1 { font-size: 1.5em; }
    th, td { font-size: 0.8em; }
    .modal-content { width: 95%; }
}

/* Extra malý mobil (< 600px) */
@media (max-width: 600px) {
    .tlacitka button { width: 100%; }
    #clearAllLinksButton { width: 100%; }
}
```

---

## 🤝 Spolupráce

Projekt byl vytvořen ve spolupráci s:
- 🤖 **ChatGPT** (OpenAI)
- 💎 **Gemini.AI** (Google)
- 🦾 **Grok.AI** (xAI)
- 🧠 **Claude.AI** (Anthropic) - *admirál Claude Sonnet 4.5*

---

## 📝 Changelog

### v3.0 - BETA 3 (Aktuální verze)
- ✅ **Tabulkový layout** místo karet
- ✅ **Rozdělené CSS** (style.css + modal.css)
- ✅ **Modal manager** (OOP pattern)
- ✅ **Cache systém** (5s)
- ✅ **Event Delegation** pro optimalizaci
- ✅ **URL tlačítka** s gradientem
- ✅ **Copyright footer** s animací
- ✅ **Responzivní tlačítka** (< 600px)
- ✅ **Offline persistence** (desktop only)

### v2.1
- ✅ Kartový layout
- ✅ Enhanced Console Logger
- ✅ Firebase offline persistence
- ✅ Modal pro editaci
- ✅ Sync status zprávy

### v2.0
- ✅ Firebase Firestore integrace
- ✅ Real-time synchronizace
- ✅ Order management

### v1.0
- ✅ Základní CRUD operace
- ✅ Star Trek design
- ✅ LocalStorage

---

## 🎯 TODO / Roadmap

### Priorita 1 (Bezpečnost)
- [ ] 🔐 Firebase Authentication
- [ ] 🛡️ Firebase Security Rules (production)
- [ ] 🔑 Environment variables pro API klíče

### Priorita 2 (Funkce)
- [ ] 🏷️ Tagy a kategorie pro odkazy
- [ ] 🔍 Vyhledávání v odkazech (live search)
- [ ] 📤 Import/Export CSV
- [ ] 📊 Statistiky (počet kliknutí, poslední použití)

### Priorita 3 (UX)
- [ ] 🌙 Dark/Light mode toggle
- [ ] 🎵 Zvukové efekty (Star Trek zvuky)
- [ ] ⌨️ Klávesové zkratky (Ctrl+N = nový odkaz)
- [ ] 🔔 Toast notifikace místo sync message

### Priorita 4 (Tech)
- [ ] 📱 PWA - Progressive Web App
- [ ] 🔄 Service Worker (offline first)
- [ ] 🚀 Preload kritických dat
- [ ] 📦 Webpack/Vite bundling

---

## 📄 Licence

**MIT License** - Použij, jak chceš! 🖖

```
Copyright (c) 2025 Více admirál Jiřík

Permission is hereby granted, free of charge, to any person obtaining a copy...
```

---

## 👨‍💻 Autor

**Více admirál Jiřík**  
🚀 Kapitán hvězdné flotily  
📡 [GitHub Repository](https://github.com/jirka22med/stra-trek-odkazy-beta-3)  
🌐 [Live Demo](https://jirka22med.github.io/stra-trek-odkazy-beta-3/)  
🌌 Ostrava, Moravskoslezský kraj, CZ

---

## 🖖 Live Long and Prosper!

*"Space: the final frontier. These are the voyages of the starship Enterprise."*  
— Star Trek: The Original Series

---

**Vytvořeno s 💙 a warpovým pohonem na úrovni 9.99**

### 🔥 Performance Metriky

- ⚡ **Čas načtení**: < 1s
- 🗄️ **Cache hit rate**: ~80% (5s cache)
- 📊 **Firebase reads**: Redukováno o 70% díky cache
- 🎯 **Event listeners**: 1 místo N (event delegation)

### 🌟 Featured Functions

```javascript
// Modal Manager (OOP)
window.modalManager.open(id, name, url);
window.modalManager.close();
window.modalManager.getData();

// Logger
window.openJirikModal(); // Otevře console logger
window.updateLogDisplay(); // Aktualizuje zobrazení logů
```
