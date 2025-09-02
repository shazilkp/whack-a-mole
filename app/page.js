"use client"

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function WhackAMole() {
  const [score, setScore] = useState(0);
  const [activeMole, setActiveMole] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);

  // Randomly show moles
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setActiveMole(Math.floor(Math.random() * 9));
    }, 500);
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const countdown = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [timeLeft]);

  const hitMole = (index) => {
    if (index === activeMole) {
      setScore(score + 1);
      setActiveMole(null);
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setActiveMole(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-500 to-purple-700 p-4">
      <Card className="w-full max-w-md text-center shadow-xl rounded-2xl bg-white">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-purple-700">Whack a Mole</h1>
          

          <div className="flex justify-between mb-4 text-lg font-semibold">
            <span>⏱ {timeLeft}s</span>
            <span>⭐ {score}</span>
          </div>

          {/* Game grid */}
          {/* Game grid */}
          <div className="grid grid-cols-3 gap-6 justify-items-center">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                onClick={() => hitMole(i)}
                className="relative flex items-center justify-center w-24 h-24 bg-green-300 rounded-full shadow-inner cursor-pointer"
              >
                {activeMole === i && (
                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 40, opacity: 0 }}
                    className="flex items-center justify-center"
                  >
                    <span className="text-4xl">🐹</span>
                  </motion.div>
                )}
              </div>
            ))}
          </div>


          {/* Restart button */}
          {timeLeft <= 0 && (
            <div className="mt-6">
              <p className="text-lg font-bold text-purple-700 mb-2">
                Game Over! Final Score: {score}
              </p>
              <Button onClick={resetGame} className="bg-purple-600 text-white">
                Restart
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
