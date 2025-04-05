
import { useState, useRef, useEffect } from "react";
import { PantryHeader } from "@/components/PantryHeader";
import { Button } from "@/components/ui/button";
import { Camera, StopCircle } from "lucide-react";

const ContainerScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopScanner = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-soft">
      <PantryHeader />
      <main className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
          <h1 className="text-2xl font-semibold text-pantry-brown mb-6">Container Scanner</h1>
          
          <div className="space-y-6">
            <div className="flex justify-center">
              {isScanning ? (
                <Button 
                  onClick={stopScanner}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <StopCircle size={20} />
                  Stop Scanner
                </Button>
              ) : (
                <Button 
                  onClick={startScanner}
                  className="bg-pantry-sage hover:bg-pantry-sage/90 flex items-center gap-2"
                >
                  <Camera size={20} />
                  Start Scanner
                </Button>
              )}
            </div>

            <div className="relative aspect-video max-w-2xl mx-auto rounded-lg overflow-hidden bg-black/5 border-2 border-dashed border-gray-200">
              {isScanning ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <Camera size={48} />
                </div>
              )}
            </div>

            <p className="text-center text-gray-600 text-sm">
              Position your container in front of the camera to scan
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContainerScanner;
