import React, { useState, useEffect, useRef } from "react";
import SpinButton from "./ui/SpinButton";

const LotterySpinner = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showPrize, setShowPrize] = useState(false);

  const [finalNumbers, setFinalNumbers] = useState([1, 2, 3, 4, 5, 6]);
  const [currentNumbers, setCurrentNumbers] = useState([1, 2, 3, 4, 5, 6]);

  const [prizeLabel, setPrizeLabel] = useState("1ST PRIZE");

  const spinTimer = useRef(null);
  const stopTimer = useRef(null);

  const randomDigit = () => Math.floor(Math.random() * 9) + 1;

  const triggerSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowPrize(false);

    const result = Array.from({ length: 6 }, randomDigit);
    setFinalNumbers(result);

    const prizeOptions = ["1ST PRIZE", "2ND PRIZE", "3RD PRIZE"];
    setPrizeLabel(prizeOptions[Math.floor(Math.random() * prizeOptions.length)]);

    let delay = 50;
    let tick = 0;

    spinTimer.current = setInterval(() => {
      setCurrentNumbers(Array.from({ length: 6 }, randomDigit));
      tick++;

      if (tick > 40) {
        delay += 10;
        clearInterval(spinTimer.current);

        spinTimer.current = setInterval(() => {
          setCurrentNumbers(Array.from({ length: 6 }, randomDigit));
        }, delay);
      }
    }, delay);

    stopTimer.current = setTimeout(() => {
      clearInterval(spinTimer.current);
      setCurrentNumbers(result);
      setIsSpinning(false);

      setTimeout(() => setShowPrize(true), 500);
    }, 4000);
  };

  useEffect(() => {
    return () => {
      clearInterval(spinTimer.current);
      clearTimeout(stopTimer.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/src/assets/image/BG_Image.jpg"
          alt="background"
          className="w-full h-full object-cover scale-400"
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/60 via-indigo-950/70 to-purple-950/60" />

      {/* Tiny Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Big stars */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-white text-xl animate-pulse"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            opacity: 0.4,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          ✦
        </div>
      ))}

      <div className="relative w-full max-w-4xl">
        <div className="text-center mb-8">
          <img
            src="/src/assets/image/Congratulation_image.png"
            alt=""
            className="mx-auto"
          />

          {/* Prize block (fixed height to avoid shifting) */}
          <div className="flex items-center justify-center mt-5" style={{ height: "70px" }}>
            {showPrize && (
              <p
                className="text-4xl md:text-5xl font-black tracking-widest animate-prize-flash-smooth"
                style={{
                  letterSpacing: "0.2em",
                  whiteSpace: "nowrap",
                  fontFamily: "Arial Black, sans-serif",
                }}
              >
                {prizeLabel}
              </p>
            )}
          </div>
        </div>

        <div className="relative px-4">
          {/* Hologram Background */}
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{ bottom: "-100px", height: "400px" }}
          >
            <img
              src="/src/assets/image/hologram-image.png"
              alt="hologram"
              className="w-full h-full object-fill opacity-50"
              style={{
                mixBlendMode: "screen",
                transform: "perspective(700px) rotateX(18deg)",
                transformOrigin: "top center",
              }}
            />
          </div>

          {/* Numbers */}
          <div className="relative flex justify-center items-end gap-2 md:gap-3 z-10">
            {currentNumbers.map((digit, idx) => (
              <div
                key={idx}
                className={`relative transition-all duration-300 ${
                  isSpinning ? "animate-number-spin" : "animate-number-drop"
                }`}
                style={{ animationDelay: `${idx * 0.06}s`, perspective: "1000px" }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src="/src/assets/image/hologram-image.png"
                    alt=""
                    className="w-full h-full object-contain opacity-75"
                    style={{ mixBlendMode: "screen" }}
                  />

                  <div className="absolute left-1/4 top-20 bottom-0">
                    <div
                      style={{
                        width: "80px",
                        height: "120px",
                        background:
                          "linear-gradient(to bottom, rgba(109,40,217,0.4), rgba(76,29,149,0.6))",
                        borderRadius: "8px",
                        border: "3px solid rgba(168,85,247,0.8)",
                        boxShadow: `
                          0 1px 10px rgba(168, 85, 247, 0.6),
                          inset 0 2px 10px rgba(167,139,250,0.3)
                        `,
                        backdropFilter: "blur(2px)",
                      }}
                      className="relative"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          className="font-black select-none"
                          style={{
                            fontSize: "56px",
                            background:
                              "linear-gradient(to bottom, #a5f3fc, #22d3ee 40%, #06b6d4)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            filter: "drop-shadow(0 0 8px rgba(34,211,238,0.6))",
                          }}
                        >
                          {digit}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Area */}
      <div className="relative mt-8">
        <img
          src="/src/assets/image/Bottom_Image.png"
          alt="bottom border"
          className="h-full object-contain"
        />
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
          <SpinButton onClick={triggerSpin} disabled={isSpinning} />
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes prize-flash-smooth {
          0% {
            color: white;
            text-shadow: 0 0 15px rgba(255,255,255,0.6);
          }
          50% {
            color: #ef4444;
            text-shadow: 0 0 40px rgba(239,68,68,0.6);
          }
          100% {
            color: white;
          }
        }

        @keyframes number-spin {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes number-drop {
          0% { transform: translateY(-40px) scale(0.8); opacity: 0; }
          60% { transform: translateY(8px) scale(1.05); }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .animate-prize-flash-smooth { animation: prize-flash-smooth 1s infinite; }
        .animate-number-spin { animation: number-spin 0.12s infinite; }
        .animate-number-drop { animation: number-drop 0.8s cubic-bezier(0.34,1.56,0.64,1); }
        .animate-twinkle { animation: twinkle linear infinite; }
      `}</style>
    </div>
  );
};

export default LotterySpinner;
