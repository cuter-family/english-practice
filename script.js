
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
    modalQuiz: document.getElementById('modal-quiz'),
    btnAddToggle: document.getElementById('btn-add-toggle'),
    btnCloseAdd: document.getElementById('btn-close-add'),
    btnClosePractice: document.getElementById('btn-close-practice'),
    btnCloseQuiz: document.getElementById('btn-close-quiz'),
    btnPractice: document.getElementById('btn-practice'),
    btnQuiz: document.getElementById('btn-quiz'),
    statTotal: document.getElementById('stat-total'),
    statMastered: document.getElementById('stat-mastered'),
    inputWord: document.getElementById('input-word'),
    inputDef: document.getElementById('input-def'),
    flashcard: document.getElementById('flashcard'),
    cardWord: document.getElementById('card-word'),
    cardDef: document.getElementById('card-def'),
    btnForgot: document.getElementById('btn-forgot'),
    btnKnown: document.getElementById('btn-known'),
    // Quiz Elements
    quizDef: document.getElementById('quiz-def'),
    quizInput: document.getElementById('quiz-input'),
    quizFeedback: document.getElementById('quiz-feedback'),
    btnCheck: document.getElementById('btn-check'),
    btnGiveUp: document.getElementById('btn-give-up')
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
    if (!confirm('Delete this word?')) return;
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

    // Quiz Mode Listeners
    elements.btnQuiz.addEventListener('click', startQuiz);
    elements.btnCloseQuiz.addEventListener('click', () => closeModal(elements.modalQuiz));
    elements.btnCheck.addEventListener('click', checkQuizAnswer);
    elements.btnGiveUp.addEventListener('click', giveUp);
    elements.quizInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkQuizAnswer();
    });
}

// Quiz Mode Logic
function startQuiz() {
    STATE.practiceQueue = STATE.words.filter(w => w.status !== 'mastered');

    if (STATE.practiceQueue.length === 0) {
        alert("Great job! You've mastered all your words (or haven't added any yet).");
        return;
    }

    STATE.practiceQueue.sort(() => Math.random() - 0.5);
    STATE.currentCardIndex = 0;

    openModal(elements.modalQuiz);
    showQuizQuestion();
}

function showQuizQuestion() {
    if (STATE.currentCardIndex >= STATE.practiceQueue.length) {
        closeModal(elements.modalQuiz);
        alert("Quiz complete!");
        return;
    }

    const wordObj = STATE.practiceQueue[STATE.currentCardIndex];
    elements.quizDef.innerText = wordObj.definition;
    elements.quizInput.value = '';
    elements.quizInput.focus();

    resetFeedback();
}

function resetFeedback() {
    elements.quizFeedback.className = 'feedback-msg hidden';
    elements.quizFeedback.innerText = '';
    elements.quizInput.parentElement.classList.remove('anim-shake');
}

function checkQuizAnswer() {
    const wordObj = STATE.practiceQueue[STATE.currentCardIndex];
    const attempt = elements.quizInput.value.trim().toLowerCase();
    const target = wordObj.word.toLowerCase();

    if (attempt === target) {
        // Correct
        elements.quizFeedback.innerText = 'Correct! 🎉';
        elements.quizFeedback.className = 'feedback-msg feedback-correct';
        elements.quizFeedback.classList.remove('hidden');

        // Mark as mastered
        const originalIndex = STATE.words.findIndex(w => w.id === wordObj.id);
        if (originalIndex !== -1) {
            STATE.words[originalIndex].status = 'mastered';
            storage.save();
            renderList();
            updateStats();
        }

        setTimeout(() => {
            STATE.currentCardIndex++;
            showQuizQuestion();
        }, 1200);

    } else {
        // Incorrect
        elements.quizFeedback.innerText = 'Not quite. Try again.';
        elements.quizFeedback.className = 'feedback-msg feedback-wrong';
        elements.quizFeedback.classList.remove('hidden');

        // Shake animation
        const container = elements.quizInput.parentElement;
        container.classList.remove('anim-shake');
        void container.offsetWidth; // trigger reflow
        container.classList.add('anim-shake');
    }
}

function giveUp() {
    const wordObj = STATE.practiceQueue[STATE.currentCardIndex];
    elements.quizInput.value = wordObj.word;
    elements.quizFeedback.innerText = 'The word was: ' + wordObj.word;
    elements.quizFeedback.className = 'feedback-msg feedback-wrong';
    elements.quizFeedback.classList.remove('hidden');

    setTimeout(() => {
        STATE.currentCardIndex++;
        showQuizQuestion();
    }, 2000);
}

// Expose functions to global scope for HTML onclick handlers
window.app = {
    deleteWord
};

// Start App
document.addEventListener('DOMContentLoaded', init);
