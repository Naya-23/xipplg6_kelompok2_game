console.log("ival")


if (timeLeft > 0 && timeLeft <= 5) {
    playCountdownNumber(timeLeft);
}
function playCountdownNumber(number) {
    if (!soundEnabled || !audioContext) return;
    
    const pitchMap = {
        5: 400,
        4: 450,
        3: 500,
        2: 550,
        1: 600
    };
    const frequency = pitchMap[number] || 400;
    const duration = 0.25;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}


let countdownInterval;
function startCountdown() {
    clearInterval(countdownInterval);
    timeLeft = 30; // Reset to 30 seconds
    updateTimerDisplay();
}