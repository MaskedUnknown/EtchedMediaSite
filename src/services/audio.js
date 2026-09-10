/**
 * Centralized Workstation Interface Sound System Engine
 */

// Global state trackers
let isSoundEnabled = true;
let lastPlayedTimestamps = {};
const SOUND_SPAM_COOLDOWN = 180;

export const setSoundSystemState = (enabled) => {
    isSoundEnabled = enabled;
    console.log(`[Audio Engine] System sounds toggled: ${isSoundEnabled ? 'ENABLED' : 'MUTED'}`);
};

export const getSoundSystemState = () => isSoundEnabled;

/**
 * Core Play Engine with Built-in Cooldowns & Pitch Randomization
 */
const playEngineAsset = (audioPath, soundId) => {
    if (!isSoundEnabled) return;

    const now = Date.now();
    const lastPlayed = lastPlayedTimestamps[soundId] || 0;

    // 🛡️ LIMITER LOOP: Protect against spamming
    if (now - lastPlayed < SOUND_SPAM_COOLDOWN) {
        return;
    }

    lastPlayedTimestamps[soundId] = now;

    try {
        const fxNode = new Audio(audioPath);
        fxNode.volume = 0.35; // Respectful base volume profile

        // ── 🎲 AUTOMATED PITCH RANDOMIZATION CORE ──
        // 1. Calculate a random speed value bounding multiplier between 0.85 and 1.35
        // (Standard web audio playback rates map 1.0 to normal, below 1.0 lower pitch, above 1.0 higher pitch)
        const randomPitchFactor = 0.85 + Math.random() * 0.5;

        // 2. Instruct the browser engine to dynamically warp the sound pitch curve rather than preserving it
        fxNode.preservesPitch = false;
        fxNode.playbackRate = randomPitchFactor;

        fxNode.play();
    } catch (err) {
        console.warn(`[Audio Engine Error] Standalone node block tracking:`, err);
    }
};

// ── 🎛️ PUBLIC TRIGGER MATRIX ──
// Replace the relative strings down below with your exact filenames inside src/assets/sounds/
export const playSound = {
    // Point directly to your public folder's subdirectories using flat paths
    click: () => playEngineAsset('/sounds/click.mp3', 'click'),
    open: () => playEngineAsset('/sounds/open.mp3', 'open'),
    close: () => playEngineAsset('/sounds/close.mp3', 'close'),
};
