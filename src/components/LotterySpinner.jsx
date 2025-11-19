import React, { useState, useEffect, useRef } from "react";
import SpinButton from "./ui/SpinButton";

const LotterySpinner = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [winningNumbers, setWinningNumbers] = useState([1, 2, 3, 4, 5, 6]);
  const [displayNumbers, setDisplayNumbers] = useState([1, 2, 3, 4, 5, 6]);
  const [prizeType, setPrizeType] = useState("1ST PRIZE");
  const spinIntervalRef = useRef(null);
  const slowDownTimeoutRef = useRef(null);

  const generateRandomNumber = () => Math.floor(Math.random() * 9) + 1;

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowResult(false);

    const newWinningNumbers = Array(6)
      .fill(0)
      .map(() => generateRandomNumber());
    setWinningNumbers(newWinningNumbers);

    const prizes = ["1ST PRIZE", "2ND PRIZE", "3RD PRIZE"];
    setPrizeType(prizes[Math.floor(Math.random() * prizes.length)]);

    let speed = 50;
    let counter = 0;

    spinIntervalRef.current = setInterval(() => {
      setDisplayNumbers(
        Array(6)
          .fill(0)
          .map(() => generateRandomNumber())
      );
      counter++;

      if (counter > 40) {
        speed += 10;
        clearInterval(spinIntervalRef.current);
        spinIntervalRef.current = setInterval(() => {
          setDisplayNumbers(
            Array(6)
              .fill(0)
              .map(() => generateRandomNumber())
          );
        }, speed);
      }
    }, speed);

    slowDownTimeoutRef.current = setTimeout(() => {
      clearInterval(spinIntervalRef.current);
      setDisplayNumbers(newWinningNumbers);
      setIsSpinning(false);

      setTimeout(() => {
        setShowResult(true);
      }, 500);
    }, 4000);
  };

  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
      if (slowDownTimeoutRef.current) clearTimeout(slowDownTimeoutRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/src/assets/image/BG_Image.jpg"
          alt="background"
          className="w-full h-full object-cover scale-400"
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Space Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/60 via-indigo-950/70 to-purple-950/60"></div>

      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(150)].map((_, i) => (
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

      {/* Larger Stars */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`star-${i}`}
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

      {/* Main Container */}
      <div className="relative w-full max-w-4xl">
        {/* Main Content Box */}
        <div className="relative">
          {/* Title Section */}
          <div className="text-center mb-8">
            <img
              src="/src/assets/image/Congratulation_image.png"
              alt=""
              className="mx-auto"
            />

            {/* Prize Container with fixed height — prevents layout jumping */}
            <div
              className="flex items-center justify-center mt-5"
              style={{ height: "70px" }}
            >
              {showResult && (
                <p
                  className="text-4xl md:text-5xl font-black tracking-widest animate-prize-flash-smooth"
                  style={{
                    fontFamily: "Arial Black, sans-serif",
                    letterSpacing: "0.2em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {prizeType}
                </p>
              )}
            </div>
          </div>

          {/* Numbers Display Area */}
          <div className="relative px-4">
            {/* Hologram Background Image*/}
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
                  transformOrigin: "center top",
                }}
              />
            </div>
            {/* Numbers Container */}
            <div className="relative flex justify-center items-end gap-2 md:gap-3 z-10">
              {displayNumbers.map((num, index) => (
                <div
                  key={index}
                  className={`relative transition-all duration-300 ${
                    isSpinning ? "animate-number-spin" : "animate-number-drop"
                  }`}
                  style={{
                    animationDelay: `${index * 0.06}s`,
                    perspective: "1000px",
                  }}
                >
                  {/* Glass Cylinder */}
                  <div className="relative overflow-hidden">
                    <img
                      src="/src/assets/image/hologram-image.png"
                      alt="hologram"
                      className="w-full h-full object-contain opacity-75"
                      style={{ mixBlendMode: "screen" }}
                    />

                    {/* Center Highlight */}
                    <div className="absolute left-1/4 top-20 bottom-0">
                      {/* Purple Rectangle Box with Glow */}
                      <div
                        className="relative"
                        style={{
                          width: "80px",
                          height: "120px",
                          background:
                            "linear-gradient(to bottom, rgba(109, 40, 217, 0.4) 0%, rgba(76, 29, 149, 0.6) 100%)",
                          borderRadius: "8px",
                          border: "3px solid rgba(168, 85, 247, 0.8)",
                          boxShadow: `
                        0 1px 10px rgba(168, 85, 247, 0.6),
                        0 1px 10px rgba(147, 51, 234, 0.4),
                        inset 0 2px 10px rgba(167, 139, 250, 0.3),
                        inset 0 -2px 10px rgba(0, 0, 0, 0.5)
                      `,
                          backdropFilter: "blur(2px)",
                        }}
                      >
                        {/* Number */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className="font-black select-none"
                            style={{
                              fontSize: "56px",
                              background:
                                "linear-gradient(to bottom, #a5f3fc 0%, #22d3ee 40%, #06b6d4 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                              filter:
                                "drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))",
                              fontFamily: "Arial Black, sans-serif",
                            }}
                          >
                            {num}
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
      </div>

      {/* Bottom Tech Border - Image 2 */}
      <div className="relative">
        <div className="w-full flex items-center justify-center">
          <img
            src="/src/assets/image/Bottom_Image.png"
            alt="bottom border"
            className="h-full object-contain"
          />
        </div>
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
          <SpinButton onClick={handleSpin} disabled={isSpinning} />
        </div>
      </div>

      <style jsx>{`
        @keyframes prize-flash-smooth {
          0% {
            color: white;
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.6),
              0 0 30px rgba(255, 255, 255, 0.3);
          }
          50% {
            color: #ef4444;
            text-shadow: 0 0 20px rgba(239, 68, 68, 0.8),
              0 0 40px rgba(239, 68, 68, 0.4);
          }
          100% {
            color: white;
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.6),
              0 0 30px rgba(255, 255, 255, 0.3);
          }
        }

        @keyframes number-spin {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes number-drop {
          0% {
            transform: translateY(-40px) scale(0.8);
            opacity: 0;
          }
          60% {
            transform: translateY(8px) scale(1.05);
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .animate-prize-flash-smooth {
          animation: prize-flash-smooth 1s ease-in-out infinite;
        }

        .animate-number-spin {
          animation: number-spin 0.12s ease-in-out infinite;
        }

        .animate-number-drop {
          animation: number-drop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-twinkle {
          animation: twinkle linear infinite;
        }
      `}</style>
    </div>
  );
};
export default LotterySpinner;
