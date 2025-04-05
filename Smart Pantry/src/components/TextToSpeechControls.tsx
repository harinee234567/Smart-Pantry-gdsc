
import { useState, useEffect } from "react";
import { Play, Pause, StopCircle, Volume2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import tts from "@/utils/textToSpeech";

interface TextToSpeechControlsProps {
  title: string;
  ingredients: { name: string; amount: string; unit: string }[];
  instructions: string[];
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
}

const TextToSpeechControls = ({
  title,
  ingredients,
  instructions,
  isPlaying,
  onPlay,
  onPause,
  onStop
}: TextToSpeechControlsProps) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [rate, setRate] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (!tts.isSupported()) return;
    
    // Load initial voices
    const loadVoices = () => {
      const availableVoices = tts.getVoices();
      setVoices(availableVoices);
      
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name);
        tts.setVoice(availableVoices[0]);
      }
    };
    
    loadVoices();
    
    // Re-load voices when they're available
    if (window.speechSynthesis) {
      window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    }
    
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      }
    };
  }, []);

  useEffect(() => {
    setIsPaused(tts.isPausedState());
  }, [isPlaying]);

  const handleVoiceChange = (voiceName: string) => {
    const voice = voices.find(v => v.name === voiceName);
    if (voice) {
      setSelectedVoice(voiceName);
      tts.setVoice(voice);
    }
  };

  const handleRateChange = (value: number[]) => {
    const newRate = value[0];
    setRate(newRate);
    tts.setRate(newRate);
  };

  const handlePitchChange = (value: number[]) => {
    const newPitch = value[0];
    setPitch(newPitch);
    tts.setPitch(newPitch);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    tts.setVolume(newVolume);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      if (isPaused) {
        tts.resume();
        setIsPaused(false);
        onPlay();
      } else {
        tts.pause();
        setIsPaused(true);
        onPause();
      }
    } else {
      onPlay();
    }
  };

  return (
    <div className="flex items-center gap-2 bg-pantry-cream/60 p-3 rounded-lg">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePlayPause}
        className={isPlaying && !isPaused ? "bg-pantry-sage text-white hover:text-pantry-brown" : ""}
        aria-label={isPlaying && !isPaused ? "Pause" : "Play"}
      >
        {isPlaying && !isPaused ? <Pause size={18} /> : <Play size={18} />}
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={onStop}
        disabled={!isPlaying && !isPaused}
        aria-label="Stop"
      >
        <StopCircle size={18} />
      </Button>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Voice settings">
            <Settings size={18} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Voice Settings</h4>
            
            <div className="space-y-2">
              <Label htmlFor="voice-select">Voice</Label>
              <Select 
                value={selectedVoice} 
                onValueChange={handleVoiceChange}
                disabled={voices.length === 0}
              >
                <SelectTrigger id="voice-select">
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="rate-slider">Speed: {rate.toFixed(1)}x</Label>
              </div>
              <Slider
                id="rate-slider"
                value={[rate]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={handleRateChange}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="pitch-slider">Pitch: {pitch.toFixed(1)}</Label>
              </div>
              <Slider
                id="pitch-slider"
                value={[pitch]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={handlePitchChange}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="volume-slider">Volume</Label>
                <Volume2 size={16} />
              </div>
              <Slider
                id="volume-slider"
                value={[volume]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TextToSpeechControls;
