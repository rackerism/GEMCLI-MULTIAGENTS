/**
 * @file script.js
 * @description Logic for the Calm Moment website, including a Zen Quote generator
 * and an interactive breathing exercise controller.
 */

/**
 * @typedef {Object} Quote
 * @property {string} text - The content of the quote.
 * @property {string} author - The author of the quote.
 */

/**
 * List of Zen quotes for the generator.
 * @type {Quote[]}
 */
const quotes = [
    { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha" },
    { text: "Smile, breathe and go slowly.", author: "Thich Nhat Hanh" },
    { text: "The soul always knows what to do to heal itself. The challenge is to silence the mind.", author: "Caroline Myss" },
    { text: "Quiet the mind, and the soul will speak.", author: "Ma Jaya Sati Bhagavati" },
    { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu" },
    { text: "Within you, there is a stillness and a sanctuary to which you can retreat at any time and be yourself.", author: "Hermann Hesse" }
];

/**
 * State management for the breathing exercise.
 */
let breathingInterval = null;
let isBreathing = false;

/**
 * Updates the DOM with a randomly selected Zen quote.
 * @returns {void}
 */
function getRandomQuote() {
    const quoteElement = document.getElementById('zen-quote');
    const authorElement = document.getElementById('quote-author');
    
    if (!quoteElement || !authorElement) return;

    // Fade out effect
    quoteElement.style.opacity = '0';
    authorElement.style.opacity = '0';

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const selectedQuote = quotes[randomIndex];
        
        quoteElement.textContent = `"${selectedQuote.text}"`;
        authorElement.textContent = `- ${selectedQuote.author}`;
        
        quoteElement.style.opacity = '1';
        authorElement.style.opacity = '1';
    }, 300);
}

/**
 * Toggles the breathing exercise state and UI.
 * @returns {void}
 */
function toggleBreathing() {
    const circle = document.getElementById('breathe-circle');
    const text = document.getElementById('breathe-text');
    const button = document.getElementById('start-breathe');
    
    if (!circle || !text || !button) return;

    if (isBreathing) {
        stopBreathing(circle, text, button);
    } else {
        startBreathing(circle, text, button);
    }
}

/**
 * Starts the breathing exercise cycle.
 * @param {HTMLElement} circle - The animated circle element.
 * @param {HTMLElement} text - The status text element.
 * @param {HTMLElement} button - The trigger button.
 */
function startBreathing(circle, text, button) {
    isBreathing = true;
    button.textContent = 'Stop Exercise';
    button.classList.add('active');
    
    // Initial cycle
    runBreatheCycle(circle, text);
    
    // Repeat every 12 seconds (4s inhale, 4s hold, 4s exhale)
    breathingInterval = setInterval(() => {
        runBreatheCycle(circle, text);
    }, 12000);
}

/**
 * Stops the breathing exercise cycle and resets UI.
 * @param {HTMLElement} circle - The animated circle element.
 * @param {HTMLElement} text - The status text element.
 * @param {HTMLElement} button - The trigger button.
 */
function stopBreathing(circle, text, button) {
    clearInterval(breathingInterval);
    isBreathing = false;
    
    circle.style.transform = 'scale(1)';
    text.textContent = 'Prepare to breathe...';
    button.textContent = 'Start Exercise';
    button.classList.remove('active');
}

/**
 * Executes a single breathing cycle: Inhale (4s), Hold (4s), Exhale (4s).
 * @param {HTMLElement} circle - The animated circle element.
 * @param {HTMLElement} text - The status text element.
 * @returns {void}
 */
function runBreatheCycle(circle, text) {
    // Phase 1: Inhale
    text.textContent = 'Inhale...';
    circle.style.transform = 'scale(1.5)';
    circle.style.backgroundColor = 'var(--accent-blue-dark)';
    
    setTimeout(() => {
        // Phase 2: Hold
        if (!isBreathing) return;
        text.textContent = 'Hold...';
        
        setTimeout(() => {
            // Phase 3: Exhale
            if (!isBreathing) return;
            text.textContent = 'Exhale...';
            circle.style.transform = 'scale(1)';
            circle.style.backgroundColor = 'var(--accent-green-dark)';
        }, 4000);
    }, 4000);
}

/**
 * Application Entry Point
 */
document.addEventListener('DOMContentLoaded', () => {
    // Quote generator initialization
    const quoteButton = document.getElementById('new-quote');
    if (quoteButton) {
        quoteButton.addEventListener('click', getRandomQuote);
    }
    
    // Breathing exercise initialization
    const breatheButton = document.getElementById('start-breathe');
    if (breatheButton) {
        breatheButton.addEventListener('click', toggleBreathing);
    }
});
