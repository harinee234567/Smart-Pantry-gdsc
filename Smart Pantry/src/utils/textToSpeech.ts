
interface TTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice | null;
}

class TextToSpeech {
  private static instance: TextToSpeech;
  private utterance: SpeechSynthesisUtterance | null = null;
  private isPaused: boolean = false;
  private textQueue: string[] = [];
  private currentIndex: number = 0;
  private options: TTSOptions = {
    rate: 1,
    pitch: 1,
    volume: 1,
    voice: null
  };

  private constructor() {
    // Initialize utterance only if speech synthesis is available
    if (this.isSupported()) {
      this.utterance = new SpeechSynthesisUtterance();
      this.loadVoices();
      
      // Handle the end of speech event
      this.utterance.onend = () => {
        if (this.currentIndex < this.textQueue.length - 1) {
          this.currentIndex++;
          this.speakCurrentText();
        }
      };
    }
  }

  public static getInstance(): TextToSpeech {
    if (!TextToSpeech.instance) {
      TextToSpeech.instance = new TextToSpeech();
    }
    return TextToSpeech.instance;
  }

  public isSupported(): boolean {
    return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (!this.isSupported()) return [];
    return window.speechSynthesis.getVoices();
  }

  private loadVoices(): void {
    if (!this.isSupported()) return;
    
    // Set default voice (first available)
    const voices = this.getVoices();
    if (voices.length > 0) {
      this.options.voice = voices[0];
    }

    // If voices aren't loaded yet, wait for them
    if (voices.length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        const updatedVoices = this.getVoices();
        if (updatedVoices.length > 0) {
          this.options.voice = updatedVoices[0];
        }
      });
    }
  }

  public setVoice(voice: SpeechSynthesisVoice): void {
    this.options.voice = voice;
    if (this.utterance) {
      this.utterance.voice = voice;
    }
  }

  public setRate(rate: number): void {
    this.options.rate = rate;
    if (this.utterance) {
      this.utterance.rate = rate;
    }
  }

  public setPitch(pitch: number): void {
    this.options.pitch = pitch;
    if (this.utterance) {
      this.utterance.pitch = pitch;
    }
  }

  public setVolume(volume: number): void {
    this.options.volume = volume;
    if (this.utterance) {
      this.utterance.volume = volume;
    }
  }

  public speak(textItems: string[]): void {
    if (!this.isSupported() || !this.utterance) return;
    
    // Cancel any ongoing speech
    this.stop();
    
    this.textQueue = textItems;
    this.currentIndex = 0;
    
    if (this.textQueue.length > 0) {
      this.speakCurrentText();
    }
  }

  private speakCurrentText(): void {
    if (!this.isSupported() || !this.utterance || this.currentIndex >= this.textQueue.length) return;
    
    const text = this.textQueue[this.currentIndex];
    this.utterance.text = text;
    this.utterance.rate = this.options.rate || 1;
    this.utterance.pitch = this.options.pitch || 1;
    this.utterance.volume = this.options.volume || 1;
    
    if (this.options.voice) {
      this.utterance.voice = this.options.voice;
    }
    
    window.speechSynthesis.speak(this.utterance);
  }

  public pause(): void {
    if (!this.isSupported()) return;
    
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      this.isPaused = true;
    }
  }

  public resume(): void {
    if (!this.isSupported()) return;
    
    if (this.isPaused) {
      window.speechSynthesis.resume();
      this.isPaused = false;
    }
  }

  public stop(): void {
    if (!this.isSupported()) return;
    
    window.speechSynthesis.cancel();
    this.isPaused = false;
    this.textQueue = [];
    this.currentIndex = 0;
  }

  public isPlaying(): boolean {
    if (!this.isSupported()) return false;
    return window.speechSynthesis.speaking && !this.isPaused;
  }

  public isPausedState(): boolean {
    return this.isPaused;
  }
}

export default TextToSpeech.getInstance();
