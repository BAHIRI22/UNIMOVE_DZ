class SoundManager {
  private ctx: AudioContext | null = null;

  private init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // A clean friendly "ding" notification sound
  playNotification() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now); // A5 note
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.15); // E6 note
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      console.warn('Audio play failed:', e);
    }
  }

  // A warm rising chime for app start / connection success
  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      const playTone = (freq: number, start: number, duration: number) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.08, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + duration);
      };

      // Play C major arpeggio
      playTone(523.25, now, 0.3); // C5
      playTone(659.25, now + 0.08, 0.3); // E5
      playTone(783.99, now + 0.16, 0.3); // G5
      playTone(1046.50, now + 0.24, 0.4); // C6
    } catch (e) {
      console.warn('Audio play failed:', e);
    }
  }

  // A low double-beep for failure
  playError() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const playTone = (freq: number, start: number, duration: number) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.08, start);
        gain.gain.linearRampToValueAtTime(0.001, start + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + duration);
      };

      playTone(140, now, 0.12);
      playTone(110, now + 0.15, 0.22);
    } catch (e) {
      console.warn('Audio play failed:', e);
    }
  }

  // Welcome / start sound (gentle swelling pad or chime)
  playWelcome() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Soft swelling sine tone with minor harmony/warmth
      const playSoftTone = (freq: number, start: number, duration: number, maxVolume = 0.05) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(maxVolume, start + 0.25); // swell
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration); // fade
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + duration);
      };

      playSoftTone(440, now, 0.8, 0.04); // A4
      playSoftTone(554.37, now + 0.1, 0.8, 0.03); // C#5
      playSoftTone(659.25, now + 0.2, 1.0, 0.03); // E5
      playSoftTone(880, now + 0.3, 1.2, 0.02); // A5
    } catch (e) {
      console.warn('Audio play failed:', e);
    }
  }
}

export const sound = new SoundManager();
