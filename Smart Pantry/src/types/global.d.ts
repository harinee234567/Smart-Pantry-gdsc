interface Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
  speechSynthesis: SpeechSynthesis;
  SpeechSynthesisUtterance: typeof SpeechSynthesisUtterance;
}

interface SpeechSynthesisUtterance extends EventTarget {
  text: string;
  lang: string;
  voice: SpeechSynthesisVoice | null;
  volume: number;
  rate: number;
  pitch: number;
  onstart: (ev: Event) => void;
  onend: (ev: Event) => void;
  onerror: (ev: Event) => void;
  onpause: (ev: Event) => void;
  onresume: (ev: Event) => void;
  onboundary: (ev: Event) => void;
  onmark: (ev: Event) => void;
}

interface SpeechSynthesisEvent extends Event {
  readonly charIndex: number;
  readonly charLength: number;
  readonly elapsedTime: number;
  readonly name: string;
  readonly utterance: SpeechSynthesisUtterance;
}

interface SpeechSynthesisVoice {
  readonly default: boolean;
  readonly lang: string;
  readonly localService: boolean;
  readonly name: string;
  readonly voiceURI: string;
}

interface SpeechSynthesis {
  pending: boolean;
  speaking: boolean;
  paused: boolean;
  onvoiceschanged: (ev: Event) => void;
  getVoices(): SpeechSynthesisVoice[];
  speak(utterance: SpeechSynthesisUtterance): void;
  cancel(): void;
  pause(): void;
  resume(): void;
  addEventListener(type: 'voiceschanged', listener: (ev: Event) => void): void;
  removeEventListener(type: 'voiceschanged', listener: (ev: Event) => void): void;
}
