
// State Management
const STATE = {
    words: [],
    practiceQueue: [],
    currentCardIndex: 0
};

// DOM Elements
const elements = {
    wordList: document.getElementById('word-list'),
    formAdd: document.getElementById('form-add-word'),
    modalAdd: document.getElementById('modal-add'),
    modalPractice: document.getElementById('modal-practice'),
    btnAddToggle: document.getElementById('btn-add-toggle'),
    btnCloseAdd: document.getElementById('btn-close-add'),
    btnClosePractice: document.getElementById('btn-close-practice'),
    btnPractice: document.getElementById('btn-practice'),
    statTotal: document.getElementById('stat-total'),
    statMastered: document.getElementById('stat-mastered'),
    inputWord: document.getElementById('input-word'),
    inputDef: document.getElementById('input-def'),
    flashcard: document.getElementById('flashcard'),
    cardWord: document.getElementById('card-word'),
    cardDef: document.getElementById('card-def'),
    btnForgot: document.getElementById('btn-forgot'),
    btnKnown: document.getElementById('btn-known')
};

// Utilities
const storage = {
    save: () => localStorage.setItem('vocabApp_data', JSON.stringify(STATE.words)),
    load: () => {
        const data = localStorage.getItem('vocabApp_data');
        return data ? JSON.parse(data) : [];
    }
};

const createId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// Logic
function init() {
    STATE.words = storage.load();
    renderList();
    updateStats();
    setupEventListeners();
}

function addWord(e) {
    e.preventDefault();
    const word = elements.inputWord.value.trim();
    const definition = elements.inputDef.value.trim();

    if (!word || !definition) return;

    const newWord = {
        id: createId(),
        word,
        definition,
        status: 'new', // new, mastered
        createdAt: new Date().toISOString()
    };

    STATE.words.unshift(newWord);
    storage.save();
    renderList();
    updateStats();
    closeModal(elements.modalAdd);
    elements.formAdd.reset();
}

function deleteWord(id) {
    if(!confirm('Delete this word?')) return;
    STATE.words = STATE.words.filter(w => w.id !== id);
    storage.save();
    renderList();
    updateStats();
}

function renderList() {
    elements.wordList.innerHTML = '';
    
    if (STATE.words.length === 0) {
        elements.wordList.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">
                <p>No words yet. Add one to get started!</p>
            </div>`;
        return;
    }

    STATE.words.forEach(word => {
        const card = document.createElement('div');
        card.className = 'glass-panel word-card';
        card.innerHTML = `
            <div class="word-status status-${word.status === 'mastered' ? 'mastered' : 'new'}" title="${word.status}"></div>
            <h3>${word.word}</h3>
            <p>${word.definition}</p>
            <div class="card-actions">
                <button onclick="window.app.deleteWord('${word.id}')" class="btn-sm btn-delete">Delete</button>
            </div>
        `;
        elements.wordList.appendChild(card);
    });
}

function updateStats() {
    elements.statTotal.innerText = STATE.words.length;
    elements.statMastered.innerText = STATE.words.filter(w => w.status === 'mastered').length;
}

// Modal Handling
function openModal(modal) {
    modal.classList.remove('hidden');
    // slight delay to allow display:block to apply before opacity transition
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

// Practice Mode Logic
function startPractice() {
    // Filter words that are NOT mastered
    STATE.practiceQueue = STATE.words.filter(w => w.status !== 'mastered');
    
    if (STATE.practiceQueue.length === 0) {
        alert("Great job! You've mastered all your words (or haven't added any yet).");
        return;
    }
    
    // Shuffle
    STATE.practiceQueue.sort(() => Math.random() - 0.5);
    STATE.currentCardIndex = 0;
    
    showCard();
    openModal(elements.modalPractice);
}

function showCard() {
    if (STATE.currentCardIndex >= STATE.practiceQueue.length) {
        closeModal(elements.modalPractice);
        alert("Practice session complete!");
        return;
    }
    
    const wordObj = STATE.practiceQueue[STATE.currentCardIndex];
    elements.cardWord.innerText = wordObj.word;
    elements.cardDef.innerText = wordObj.definition;
    elements.flashcard.classList.remove('flipped');
}

function handleCardEvaluation(known) {
    const wordObj = STATE.practiceQueue[STATE.currentCardIndex];
    
    if (known) {
        // Find original word and update status
        const originalIndex = STATE.words.findIndex(w => w.id === wordObj.id);
        if (originalIndex !== -1) {
            STATE.words[originalIndex].status = 'mastered';
            storage.save();
            renderList();
            updateStats();
        }
    }
    
    STATE.currentCardIndex++;
    showCard();
}

function setupEventListeners() {
    elements.btnAddToggle.addEventListener('click', () => openModal(elements.modalAdd));
    elements.btnCloseAdd.addEventListener('click', () => closeModal(elements.modalAdd));
    elements.formAdd.addEventListener('submit', addWord);
    
    elements.btnPractice.addEventListener('click', startPractice);
    elements.btnClosePractice.addEventListener('click', () => closeModal(elements.modalPractice));
    
    elements.flashcard.addEventListener('click', () => {
        elements.flashcard.classList.toggle('flipped');
    });

    elements.btnKnown.addEventListener('click', (e) => {
        e.stopPropagation();
        handleCardEvaluation(true);
    });
    
    elements.btnForgot.addEventListener('click', (e) => {
        e.stopPropagation();
        handleCardEvaluation(false);
    });
}

// Expose functions to global scope for HTML onclick handlers
window.app = {
    deleteWord
};

// Start App
document.addEventListener('DOMContentLoaded', init);
