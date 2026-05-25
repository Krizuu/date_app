'use client'

import { useState, useCallback } from 'react'

type Screen = 'ask' | 'surprised' | 'schedule' | 'food' | 'final'

const FLOWERS = [
  { id: 0,  left: '3%',  top: '8%',  size: 16, delay: '0s',    dur: '1.8s' },
  { id: 1,  left: '12%', top: '75%', size: 18, delay: '0.5s',  dur: '1.6s' },
  { id: 2,  left: '22%', top: '28%', size: 12, delay: '0.2s',  dur: '2.2s' },
  { id: 3,  left: '35%', top: '88%', size: 16, delay: '0.9s',  dur: '1.9s' },
  { id: 4,  left: '48%', top: '4%',  size: 20, delay: '0.1s',  dur: '1.7s' },
  { id: 5,  left: '58%', top: '92%', size: 14, delay: '0.7s',  dur: '2.0s' },
  { id: 6,  left: '68%', top: '18%', size: 16, delay: '0.3s',  dur: '1.5s' },
  { id: 7,  left: '78%', top: '65%', size: 12, delay: '1.1s',  dur: '2.1s' },
  { id: 8,  left: '88%', top: '38%', size: 18, delay: '0.4s',  dur: '1.6s' },
  { id: 9,  left: '93%', top: '14%', size: 14, delay: '0.1s',  dur: '1.8s' },
  { id: 10, left: '7%',  top: '50%', size: 16, delay: '0.6s',  dur: '1.7s' },
  { id: 11, left: '28%', top: '16%', size: 20, delay: '0.4s',  dur: '1.9s' },
  { id: 12, left: '42%', top: '72%', size: 12, delay: '1.0s',  dur: '1.5s' },
  { id: 13, left: '62%', top: '46%', size: 18, delay: '0.3s',  dur: '2.3s' },
  { id: 14, left: '76%', top: '83%', size: 14, delay: '0.8s',  dur: '1.8s' },
  { id: 15, left: '85%', top: '9%',  size: 16, delay: '0.2s',  dur: '1.6s' },
  { id: 16, left: '95%', top: '56%', size: 12, delay: '0.9s',  dur: '2.0s' },
  { id: 17, left: '52%', top: '33%', size: 16, delay: '0.5s',  dur: '1.5s' },
]

const TIMES = [
  { value: '17:00', label: "17:00 — jemy z seniorami 👴" },
  { value: '18:00', label: "18:00 — to jest dobra odpowiedź tbh" },
  { value: '19:00', label: "19:00 — już mi ślinka cieknie" },
  { value: '20:00', label: "20:00 — to kolacja czy śniadanie?" },
]

const FOODS = [
  { name: 'Pizza',   emoji: '🍕' },
  { name: 'Sushi',   emoji: '🍣' },
  { name: 'Burgery', emoji: '🍔' },
  { name: 'Makaron', emoji: '🍝' },
  { name: 'Kebab',   emoji: '🥙' },
  { name: 'Ramen',   emoji: '🍜' },
]

const NO_BTN_CLASSES = 'bg-[#c9b8e8] hover:bg-[#b5a0d8] text-white font-semibold px-8 py-3 rounded-full transition-colors cursor-pointer'

const HEART_OFFSETS = [-44, -22, 0, 22, 44]
const HEART_CHARS   = ['💕', '💗', '💓', '💗', '💕']

function Hearts({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <>
      {HEART_CHARS.map((heart, i) => (
        <span
          key={i}
          className="heart-rise"
          style={{ left: `calc(50% + ${HEART_OFFSETS[i]}px)`, animationDelay: `${i * 0.09}s` }}
        >
          {heart}
        </span>
      ))}
    </>
  )
}

export default function DateApp() {
  const [screen, setScreen] = useState<Screen>('ask')
  const [noFixed, setNoFixed] = useState(false)
  const [noX, setNoX] = useState(0)
  const [noY, setNoY] = useState(0)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedFood, setSelectedFood] = useState('')
  const [yesHovered, setYesHovered] = useState(false)
  const [scheduleHovered, setScheduleHovered] = useState(false)
  const [foodHovered, setFoodHovered] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [shrekError, setShrekError] = useState(false)

  const moveNoButton = useCallback(() => {
    const pad = 60
    const btnW = 130
    const btnH = 52
    const x = pad + Math.random() * (window.innerWidth - pad * 2 - btnW)
    const y = pad + Math.random() * (window.innerHeight - pad * 2 - btnH)
    setNoFixed(true)
    setNoX(x)
    setNoY(y)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center p-4">

      {FLOWERS.map((f) => (
        <span
          key={f.id}
          className="flower"
          style={{ left: f.left, top: f.top, fontSize: f.size, animationDelay: f.delay, animationDuration: f.dur }}
        >
          🌸
        </span>
      ))}

      <div className="relative z-10 bg-white/90 rounded-3xl shadow-2xl p-10 w-full max-w-md text-center">

        {screen === 'ask' && (
          <>
            {imgError ? (
              <div className="w-28 h-28 rounded-2xl mx-auto mb-6 bg-pink-50 flex items-center justify-center text-6xl shadow-md">
                🐾
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/cat.gif"
                alt="słodki koteł"
                onError={() => setImgError(true)}
                className="w-28 h-28 rounded-2xl mx-auto mb-6 object-cover shadow-md"
              />
            )}
            <h1 className="text-2xl font-bold text-[#5c1a1a] mb-8 leading-snug">
              🌸 Czy pójdziesz ze mną na randkę, Pati? 🌸
            </h1>
            <div className="flex gap-4 justify-center flex-wrap">
              <div className="relative">
                <Hearts show={yesHovered} />
                <button
                  onClick={() => setScreen('surprised')}
                  onMouseEnter={() => setYesHovered(true)}
                  onMouseLeave={() => setYesHovered(false)}
                  className="bg-[#f4a7b9] hover:bg-[#e8839c] text-white font-semibold px-8 py-3 rounded-full transition-colors cursor-pointer"
                >
                  TAK 💕
                </button>
              </div>
              {!noFixed && (
                <button onMouseEnter={moveNoButton} onTouchStart={moveNoButton} className={NO_BTN_CLASSES}>
                  nie... 🙈
                </button>
              )}
            </div>
          </>
        )}

        {screen === 'surprised' && (
          <>
            <div className="text-8xl mb-4">🧽</div>
            <h1 className="text-3xl font-extrabold text-[#5c1a1a] mb-2 uppercase leading-tight">
              SERIO POWIEDZIAŁAŚ TAK?? 😭
            </h1>
            <p className="text-gray-400 text-sm mb-8">byłem gotowy na odmowę 😌</p>
            <button
              onClick={() => setScreen('schedule')}
              className="bg-[#f4a7b9] hover:bg-[#e8839c] text-white font-semibold px-8 py-3 rounded-full transition-colors cursor-pointer"
            >
              no dobra! →
            </button>
          </>
        )}

        {screen === 'schedule' && (
          <>
            <div className="text-5xl mb-4">📅🐾</div>
            <h1 className="text-2xl font-bold text-[#5c1a1a] mb-6">No to... kiedy idziemy?</h1>
            <div className="text-left space-y-5 mb-6">
              <div>
                <label className="text-sm font-semibold text-[#5c1a1a] block mb-1">Wybierz dzień słodziaczku ✨</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#f4a7b9] bg-transparent text-gray-700"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#5c1a1a] block mb-1">O której? ⏰</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#f4a7b9] bg-transparent text-gray-700"
                >
                  <option value="">Wybierz godzinę moja ukochana...</option>
                  {TIMES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="relative">
              <Hearts show={scheduleHovered && !!(selectedDate && selectedTime)} />
              <button
                onClick={() => { if (selectedDate && selectedTime) setScreen('food') }}
                onMouseEnter={() => setScheduleHovered(true)}
                onMouseLeave={() => setScheduleHovered(false)}
                className={`w-full py-3 rounded-full font-semibold text-white transition-colors ${
                  selectedDate && selectedTime
                    ? 'bg-[#f4a7b9] hover:bg-[#e8839c] cursor-pointer'
                    : 'bg-gray-200 cursor-not-allowed text-gray-400'
                }`}
              >
                ustawiamy randkę! 💕
              </button>
            </div>
          </>
        )}

        {screen === 'food' && (
          <>
            <h1 className="text-2xl font-bold text-[#5c1a1a] mb-6">Na co mamy ochotę? 🍜✨</h1>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {FOODS.map((food) => (
                <button
                  key={food.name}
                  onClick={() => setSelectedFood(food.name)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all cursor-pointer ${
                    selectedFood === food.name
                      ? 'ring-2 ring-[#f4a7b9] bg-[#fdf0f4]'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-3xl">{food.emoji}</span>
                  <span className="text-sm text-gray-600">{food.name}</span>
                </button>
              ))}
            </div>
            <div className="relative">
              <Hearts show={foodHovered && !!selectedFood} />
              <button
                onClick={() => { if (selectedFood) setScreen('final') }}
                onMouseEnter={() => setFoodHovered(true)}
                onMouseLeave={() => setFoodHovered(false)}
                className={`w-full py-3 rounded-full font-semibold text-white transition-colors ${
                  selectedFood
                    ? 'bg-[#f4a7b9] hover:bg-[#e8839c] cursor-pointer'
                    : 'bg-gray-200 cursor-not-allowed text-gray-400'
                }`}
              >
                to to! →
              </button>
            </div>
          </>
        )}

        {screen === 'final' && (
          <>
            {shrekError ? (
              <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center text-5xl mx-auto mb-6 shadow-md">
                😊
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/shrek.jpg"
                alt="shrek"
                onError={() => setShrekError(true)}
                className="w-24 h-24 rounded-full mx-auto mb-6 object-cover shadow-md"
              />
            )}
            <h1 className="text-2xl font-bold text-[#5c1a1a] mb-2 leading-snug">
              Dobrze że nie powiedziałaś nie, nie pożałujesz. Bądź gotowa na 18 Ty super ślicznotko 🚗
            </h1>
            <p className="text-gray-400 text-xs mt-5 italic">
              P.S. mam olbrzymie szczęście, że taka super bomba jak Ty mnie wybrała
            </p>
            <div className="flex justify-center gap-2 mt-6">
              {(['💕', '💗', '💓', '💕', '💗'] as const).map((heart, i) => (
                <span key={i} className="text-lg">{heart}</span>
              ))}
            </div>
          </>
        )}

      </div>

      {screen === 'ask' && noFixed && (
        <button
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          style={{ position: 'fixed', left: noX, top: noY, zIndex: 100 }}
          className={NO_BTN_CLASSES}
        >
          nie... 🙈
        </button>
      )}

    </div>
  )
}
