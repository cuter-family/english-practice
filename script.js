// 應用程式狀態
let currentIndex = 0;
let words = [...wordsData];
let reviewedCount = 0;
let currentMode = 'review'; // 'review' 或 'test'
let correctCount = 0;
let wrongCount = 0;

// DOM 元素
const wordElement = document.getElementById('word');
const pronunciationElement = document.getElementById('pronunciation');
const meaningElement = document.getElementById('meaning');
const exampleElement = document.getElementById('example');
const revealBtn = document.getElementById('revealBtn');
const cardBack = document.getElementById('cardBack');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const currentIndexElement = document.getElementById('currentIndex');
const totalWordsElement = document.getElementById('totalWords');
const reviewedCountElement = document.getElementById('reviewedCount');
const remainingCountElement = document.getElementById('remainingCount');
const progressFill = document.getElementById('progressFill');
const shuffleBtn = document.getElementById('shuffleBtn');
const resetBtn = document.getElementById('resetBtn');

// 模式切換元素
const reviewModeBtn = document.getElementById('reviewModeBtn');
const testModeBtn = document.getElementById('testModeBtn');
const reviewCard = document.getElementById('reviewCard');
const testCard = document.getElementById('testCard');

// 測試模式元素
const testMeaning = document.getElementById('testMeaning');
const testInput = document.getElementById('testInput');
const submitBtn = document.getElementById('submitBtn');
const testResult = document.getElementById('testResult');
const resultContent = document.getElementById('resultContent');
const correctAnswer = document.getElementById('correctAnswer');
const testExample = document.getElementById('testExample');

// 統計元素
const reviewedStat = document.getElementById('reviewedStat');
const remainingStat = document.getElementById('remainingStat');
const correctStat = document.getElementById('correctStat');
const wrongStat = document.getElementById('wrongStat');
const correctCountElement = document.getElementById('correctCount');
const wrongCountElement = document.getElementById('wrongCount');

// 初始化
function init() {
    totalWordsElement.textContent = words.length;
    updateWord();
    updateStats();
    updateProgress();
    updateButtons();
    setupModeSwitcher();
    setupTestMode();
}

// 設置模式切換
function setupModeSwitcher() {
    reviewModeBtn.addEventListener('click', () => switchMode('review'));
    testModeBtn.addEventListener('click', () => switchMode('test'));
}

// 切換模式
function switchMode(mode) {
    currentMode = mode;
    
    if (mode === 'review') {
        reviewModeBtn.classList.add('active');
        testModeBtn.classList.remove('active');
        reviewCard.classList.remove('hidden');
        testCard.classList.add('hidden');
        reviewedStat.classList.remove('hidden');
        remainingStat.classList.remove('hidden');
        correctStat.classList.add('hidden');
        wrongStat.classList.add('hidden');
        updateWord();
    } else {
        reviewModeBtn.classList.remove('active');
        testModeBtn.classList.add('active');
        reviewCard.classList.add('hidden');
        testCard.classList.remove('hidden');
        reviewedStat.classList.add('hidden');
        remainingStat.classList.add('hidden');
        correctStat.classList.remove('hidden');
        wrongStat.classList.remove('hidden');
        updateTestWord();
    }
    updateButtons();
}

// 設置測試模式
function setupTestMode() {
    submitBtn.addEventListener('click', checkAnswer);
    testInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !submitBtn.disabled) {
            checkAnswer();
        }
    });
}

// 更新測試單字
function updateTestWord() {
    const currentWord = words[currentIndex];
    testMeaning.textContent = currentWord.meaning;
    testInput.value = '';
    testInput.classList.remove('correct', 'wrong');
    testResult.classList.add('hidden');
    submitBtn.disabled = false;
    testInput.focus();
    currentIndexElement.textContent = currentIndex + 1;
    updateProgress();
}

// 更新單字顯示
function updateWord() {
    const currentWord = words[currentIndex];
    wordElement.textContent = currentWord.word;
    pronunciationElement.textContent = currentWord.pronunciation;
    meaningElement.textContent = currentWord.meaning;
    exampleElement.textContent = currentWord.example;
    
    // 重置卡片狀態
    cardBack.classList.add('hidden');
    revealBtn.textContent = '顯示中文';
    revealBtn.style.display = 'block';
    
    currentIndexElement.textContent = currentIndex + 1;
    updateProgress();
}

// 顯示/隱藏中文
revealBtn.addEventListener('click', function() {
    if (cardBack.classList.contains('hidden')) {
        cardBack.classList.remove('hidden');
        revealBtn.textContent = '隱藏中文';
        if (currentIndex === reviewedCount) {
            reviewedCount++;
            updateStats();
        }
    } else {
        cardBack.classList.add('hidden');
        revealBtn.textContent = '顯示中文';
    }
});

// 下一個單字
nextBtn.addEventListener('click', function() {
    if (currentIndex < words.length - 1) {
        currentIndex++;
        if (currentMode === 'review') {
            updateWord();
        } else {
            updateTestWord();
        }
        updateButtons();
    }
});

// 上一個單字
prevBtn.addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--;
        if (currentMode === 'review') {
            updateWord();
        } else {
            updateTestWord();
        }
        updateButtons();
    }
});

// 更新按鈕狀態
function updateButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === words.length - 1;
}

// 檢查答案
function checkAnswer() {
    const userAnswer = testInput.value.trim().toLowerCase();
    const currentWord = words[currentIndex];
    const correctWord = currentWord.word.toLowerCase();
    
    // 移除答案中的空格和標點符號進行比較
    const normalizedUserAnswer = userAnswer.replace(/[^a-z]/g, '');
    const normalizedCorrectAnswer = correctWord.replace(/[^a-z]/g, '');
    
    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
    
    // 顯示結果
    testResult.classList.remove('hidden');
    testInput.classList.add(isCorrect ? 'correct' : 'wrong');
    submitBtn.disabled = true;
    
    if (isCorrect) {
        resultContent.textContent = '✓ 答對了！';
        resultContent.className = 'result-content correct';
        correctCount++;
    } else {
        resultContent.textContent = '✗ 答錯了';
        resultContent.className = 'result-content wrong';
        wrongCount++;
    }
    
    correctAnswer.innerHTML = `<strong>正確答案：</strong>${currentWord.word} ${currentWord.pronunciation}`;
    testExample.textContent = currentWord.example;
    
    updateStats();
    
    // 自動聚焦到下一個輸入框（如果有的話）
    setTimeout(() => {
        if (currentIndex < words.length - 1) {
            testInput.focus();
        }
    }, 500);
}

// 更新統計資訊
function updateStats() {
    if (currentMode === 'review') {
        reviewedCountElement.textContent = reviewedCount;
        remainingCountElement.textContent = words.length - reviewedCount;
    } else {
        correctCountElement.textContent = correctCount;
        wrongCountElement.textContent = wrongCount;
    }
}

// 更新進度條
function updateProgress() {
    const progress = ((currentIndex + 1) / words.length) * 100;
    progressFill.style.width = progress + '%';
}

// 隨機排序
shuffleBtn.addEventListener('click', function() {
    // Fisher-Yates 洗牌算法
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }
    currentIndex = 0;
    reviewedCount = 0;
    correctCount = 0;
    wrongCount = 0;
    
    if (currentMode === 'review') {
        updateWord();
    } else {
        updateTestWord();
    }
    updateStats();
    updateButtons();
    
    // 視覺反饋
    shuffleBtn.textContent = '✓ 已隨機排序';
    setTimeout(() => {
        shuffleBtn.textContent = '🔀 隨機排序';
    }, 2000);
});

// 重新開始
resetBtn.addEventListener('click', function() {
    currentIndex = 0;
    reviewedCount = 0;
    correctCount = 0;
    wrongCount = 0;
    words = [...wordsData];
    
    if (currentMode === 'review') {
        updateWord();
    } else {
        updateTestWord();
    }
    updateStats();
    updateButtons();
    
    // 視覺反饋
    resetBtn.textContent = '✓ 已重置';
    setTimeout(() => {
        resetBtn.textContent = '🔄 重新開始';
    }, 2000);
});

// 鍵盤快捷鍵
document.addEventListener('keydown', function(e) {
    if (currentMode === 'review') {
        if (e.key === 'ArrowRight' && currentIndex < words.length - 1) {
            nextBtn.click();
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            prevBtn.click();
        } else if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (!cardBack.classList.contains('hidden')) {
                revealBtn.click();
            }
        }
    } else {
        if (e.key === 'ArrowRight' && currentIndex < words.length - 1) {
            nextBtn.click();
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            prevBtn.click();
        }
    }
});

// 初始化應用程式
init();

