'use client'

import { useState, useCallback } from 'react'

type Screen = 'name-input' | 'ask' | 'surprised' | 'schedule' | 'food' | 'final'

const ALLOWED_NAMES = ['ania', 'aniula', 'ewa', 'ewula', 'justyna', 'juti', 'patrycja', 'pati']
const SIBLING_NAMES = ['ania', 'aniula', 'ewa', 'ewula',]
const KASIA_NAMES   = ['kasia', 'katarzyna']

const FLOWERS = [
  { id: 0,  left: '2%',  top: '5%',  size: 14, delay: '0s',    dur: '1.8s' },
  { id: 1,  left: '8%',  top: '75%', size: 18, delay: '0.5s',  dur: '1.6s' },
  { id: 2,  left: '15%', top: '28%', size: 12, delay: '0.2s',  dur: '2.2s' },
  { id: 3,  left: '22%', top: '88%', size: 16, delay: '0.9s',  dur: '1.9s' },
  { id: 4,  left: '30%', top: '4%',  size: 20, delay: '0.1s',  dur: '1.7s' },
  { id: 5,  left: '38%', top: '92%', size: 14, delay: '0.7s',  dur: '2.0s' },
  { id: 6,  left: '45%', top: '12%', size: 16, delay: '0.3s',  dur: '1.5s' },
  { id: 7,  left: '52%', top: '82%', size: 12, delay: '1.1s',  dur: '2.1s' },
  { id: 8,  left: '60%', top: '38%', size: 18, delay: '0.4s',  dur: '1.6s' },
  { id: 9,  left: '68%', top: '6%',  size: 14, delay: '0.1s',  dur: '1.8s' },
  { id: 10, left: '75%', top: '55%', size: 16, delay: '0.6s',  dur: '1.7s' },
  { id: 11, left: '82%', top: '18%', size: 20, delay: '0.4s',  dur: '1.9s' },
  { id: 12, left: '88%', top: '72%', size: 12, delay: '1.0s',  dur: '1.5s' },
  { id: 13, left: '93%', top: '40%', size: 18, delay: '0.3s',  dur: '2.3s' },
  { id: 14, left: '97%', top: '85%', size: 14, delay: '0.8s',  dur: '1.8s' },
  { id: 15, left: '5%',  top: '45%', size: 16, delay: '0.2s',  dur: '1.6s' },
  { id: 16, left: '12%', top: '60%', size: 12, delay: '0.9s',  dur: '2.0s' },
  { id: 17, left: '20%', top: '15%', size: 16, delay: '0.5s',  dur: '1.5s' },
  { id: 18, left: '28%', top: '50%', size: 14, delay: '1.3s',  dur: '1.7s' },
  { id: 19, left: '35%', top: '70%', size: 18, delay: '0.6s',  dur: '2.0s' },
  { id: 20, left: '42%', top: '30%', size: 12, delay: '0.8s',  dur: '1.6s' },
  { id: 21, left: '50%', top: '95%', size: 20, delay: '0.2s',  dur: '1.9s' },
  { id: 22, left: '57%', top: '22%', size: 14, delay: '1.0s',  dur: '1.5s' },
  { id: 23, left: '64%', top: '65%', size: 16, delay: '0.4s',  dur: '2.2s' },
  { id: 24, left: '71%', top: '8%',  size: 12, delay: '0.7s',  dur: '1.8s' },
  { id: 25, left: '78%', top: '48%', size: 18, delay: '1.2s',  dur: '1.6s' },
  { id: 26, left: '85%', top: '90%', size: 14, delay: '0.3s',  dur: '2.1s' },
  { id: 27, left: '91%', top: '25%', size: 16, delay: '0.9s',  dur: '1.7s' },
  { id: 28, left: '96%', top: '60%', size: 12, delay: '0.5s',  dur: '1.9s' },
  { id: 29, left: '4%',  top: '20%', size: 20, delay: '1.1s',  dur: '1.5s' },
  { id: 30, left: '16%', top: '80%', size: 14, delay: '0.6s',  dur: '2.0s' },
  { id: 31, left: '33%', top: '35%', size: 16, delay: '0.2s',  dur: '1.8s' },
  { id: 32, left: '55%', top: '55%', size: 12, delay: '0.8s',  dur: '1.6s' },
  { id: 33, left: '72%', top: '78%', size: 18, delay: '1.4s',  dur: '2.2s' },
  { id: 34, left: '89%', top: '10%', size: 14, delay: '0.1s',  dur: '1.7s' },
  { id: 35, left: '10%', top: '95%', size: 16, delay: '0.7s',  dur: '1.5s' },
]

const TIMES = [
  { value: '17:00', label: "17:00 - jemy z seniorami 👴" },
  { value: '18:00', label: "18:00 - to jest dobra odpowiedź tbh" },
  { value: '19:00', label: "19:00 - najpierw zjem kolacje, potem Ciebie" },
  { value: '20:00', label: "20:00 - najpierw kolacja, potem Cie ululam" },
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
  const [screen, setScreen] = useState<Screen>('name-input')
  const [nameInput, setNameInput] = useState('')
  const [name, setName] = useState('Pati')
  const [isSibling, setIsSibling] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [kasiaError, setKasiaError] = useState(false)
  const [noFixed, setNoFixed] = useState(false)
  const [noX, setNoX] = useState(0)
  const [noY, setNoY] = useState(0)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedFood, setSelectedFood] = useState('')
  const [yesHovered, setYesHovered] = useState(false)
  const [nameHovered, setNameHovered] = useState(false)
  const [scheduleHovered, setScheduleHovered] = useState(false)
  const [scheduleClicked, setScheduleClicked] = useState(false)
  const [foodHovered, setFoodHovered] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [shrekError, setShrekError] = useState(false)
  const [kevinError, setKevinError] = useState(false)
  const [michaelError, setMichaelError] = useState(false)
  const [catclockError, setCatclockError] = useState(false)

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

  const submitName = () => {
    const trimmed = nameInput.trim()
    if (!trimmed) return
    const lower = trimmed.toLowerCase()
    if (ALLOWED_NAMES.includes(lower)) {
      setName(trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase())
      setIsSibling(SIBLING_NAMES.includes(lower))
      setNameError(false)
      setKasiaError(false)
      setScreen('ask')
    } else if (KASIA_NAMES.includes(lower)) {
      setKasiaError(true)
      setNameError(false)
    } else {
      setNameError(true)
      setKasiaError(false)
    }
  }

  const handleScheduleClick = () => {
    setScheduleClicked(true)
    setTimeout(() => setScheduleClicked(false), 800)
    if (selectedDate && selectedTime) setScreen('food')
  }

  const formattedDate = selectedDate ? selectedDate.split('-').reverse().join('.') : ''

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

        {/* ── Ekran 0: Podaj imię ── */}
        {screen === 'name-input' && (
          <>
            {kevinError ? (
              <div className="text-6xl mb-5">🌸</div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/kevin.jpg"
                alt="to ja"
                onError={() => setKevinError(true)}
                className="w-32 h-32 rounded-full mx-auto mb-5 object-cover shadow-md"
              />
            )}
            <h1 className="text-2xl font-bold text-[#5c1a1a] mb-2 leading-snug">
              Podaj swoje imię słodziaku
            </h1>
            <p className="text-gray-400 text-sm mb-6">żebym wiedział kto pisze 🥺</p>
            <div className="mb-4">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => { setNameInput(e.target.value); setNameError(false); setKasiaError(false) }}
                onKeyDown={(e) => { if (e.key === 'Enter') submitName() }}
                placeholder="Twoje imię..."
                className="w-full border-b-2 border-gray-200 focus:border-[#f4a7b9] py-2 px-1 text-center text-lg text-gray-700 bg-transparent outline-none transition-colors placeholder:text-gray-300"
              />
            </div>
            {nameError && (
              <p className="text-sm text-[#c0392b] mb-4 leading-snug">
                Nie jesteś osobą, która mnie interesuje.<br />
                Szukaj sobie innego księcia... 👑
              </p>
            )}
            {kasiaError && (
              <p className="text-sm text-[#c0392b] mb-4 leading-snug">
                Ty nie masz tutaj wstępu, idź słuchać sobie piosenek Ewy i umów się z mężem... 💍
              </p>
            )}
            <div className="relative mt-2">
              <Hearts show={nameHovered && nameInput.trim().length > 0} />
              <button
                onClick={submitName}
                onMouseEnter={() => setNameHovered(true)}
                onMouseLeave={() => setNameHovered(false)}
                className={`w-full py-3 rounded-full font-semibold text-white transition-colors ${
                  nameInput.trim()
                    ? 'bg-[#f4a7b9] hover:bg-[#e8839c] cursor-pointer'
                    : 'bg-gray-200 cursor-not-allowed text-gray-400'
                }`}
              >
                to ja! 💕
              </button>
            </div>
          </>
        )}

        {/* ── Ekran 1: Pytanie ── */}
        {screen === 'ask' && (
          <>
            {imgError ? (
              <div className="w-36 h-36 rounded-2xl mx-auto mb-6 bg-pink-50 flex items-center justify-center text-6xl shadow-md">
                🐾
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/cat.gif"
                alt="słodki koteł"
                onError={() => setImgError(true)}
                className="w-36 h-36 rounded-2xl mx-auto mb-6 object-cover shadow-md"
              />
            )}
            <h1 className="text-2xl font-bold text-[#5c1a1a] mb-8 leading-snug">
              {isSibling
                ? `🌸 Wyjdziesz ze swoim ulubionym bratem (jedynym) na super randewu ${name}? 🌸`
                : `🌸 Czy pójdziesz ze mną na randeczkę ${name}? 🌸`}
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
                  {isSibling ? 'NO DOBRA 😂' : 'TAK 💕'}
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

        {/* ── Ekran 2: Zaskoczenie ── */}
        {screen === 'surprised' && (
          <>
            {michaelError ? (
              <div className="text-8xl mb-4">{isSibling ? '😂' : '🧽'}</div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/michael.gif"
                alt="zaskoczony"
                onError={() => setMichaelError(true)}
                className="w-36 h-36 rounded-2xl mx-auto mb-4 object-cover shadow-md"
              />
            )}
            <h1 className="text-3xl font-extrabold text-[#5c1a1a] mb-2 uppercase leading-tight">
              {isSibling
                ? `NO WIADOMO, ŻE PÓJDZIESZ :)))))))))`
                : 'SERIO POWIEDZIAŁAŚ TAK?? 😭'}
            </h1>
            <p className="text-gray-400 text-sm mb-8">
              {isSibling
                ? 'Jebać innych facetów, są do dupy 😌'
                : 'byłem gotowy na odmowę 😌'}
            </p>
            <button
              onClick={() => setScreen('schedule')}
              className="bg-[#f4a7b9] hover:bg-[#e8839c] text-white font-semibold px-8 py-3 rounded-full transition-colors cursor-pointer"
            >
              {isSibling ? 'LECIMY! 🎉' : 'LECIMY! 🎉'}
            </button>
          </>
        )}

        {/* ── Ekran 3: Termin ── */}
        {screen === 'schedule' && (
          <>
            {catclockError ? (
              <div className="text-5xl mb-4">📅🐾</div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/catclock.gif"
                alt="cat clock"
                onError={() => setCatclockError(true)}
                className="w-32 h-32 rounded-2xl mx-auto mb-4 object-cover shadow-md"
              />
            )}
            <h1 className="text-2xl font-bold text-[#5c1a1a] mb-6">
              {isSibling ? 'Kiedy pasuje Ci spotkanko?' : 'No to... kiedy idziemy?'}
            </h1>
            <div className="text-left space-y-5 mb-6">
              <div>
                <label className="text-sm font-semibold text-[#5c1a1a] block mb-1">
                  {isSibling ? 'Wybierz dzień sis ✨' : 'Wybierz dzień słodziaczku ✨'}
                </label>
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
                  <option value="">
                    {isSibling ? 'Wybierz godzinę zanim się rozmyślę...' : 'Wybierz godzinę moja ukochana...'}
                  </option>
                  {TIMES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="relative">
              <Hearts show={scheduleHovered || scheduleClicked} />
              <button
                onClick={handleScheduleClick}
                onMouseEnter={() => setScheduleHovered(true)}
                onMouseLeave={() => setScheduleHovered(false)}
                className={`w-full py-3 rounded-full font-semibold text-white transition-colors ${
                  selectedDate && selectedTime
                    ? 'bg-[#f4a7b9] hover:bg-[#e8839c] cursor-pointer'
                    : 'bg-gray-200 cursor-not-allowed text-gray-400'
                }`}
              >
                {isSibling ? 'zapisuję w kalendarzu! 📅' : 'ustawiamy randkę! 💕'}
              </button>
            </div>
          </>
        )}

        {/* ── Ekran 4: Jedzenie ── */}
        {screen === 'food' && (
          <>
            <h1 className="text-2xl font-bold text-[#5c1a1a] mb-6">
              {isSibling ? 'Co chcesz zjeść, siostro? 🍜' : 'Na co mamy ochotę? 🍜✨'}
            </h1>
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

        {/* ── Ekran 5: Finał ── */}
        {screen === 'final' && (
          <>
            {shrekError ? (
              <div className="w-32 h-32 rounded-full bg-amber-100 flex items-center justify-center text-5xl mx-auto mb-6 shadow-md">
                {isSibling ? '🤝' : '😊'}
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/shrek.jpg"
                alt="shrek"
                onError={() => setShrekError(true)}
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-md"
              />
            )}
            <h1 className="text-2xl font-bold text-[#5c1a1a] mb-2 leading-snug">
              {isSibling
                ? `Siostra płaci, brat je 💗 Bądź gotowa ${formattedDate} o ${selectedTime}, przyjadę po Ciebie swoim batmobilem 🚗`
                : `Dobrze że nie powiedziałaś nie, uff... nie pożałujesz :))) Bądź gotowa ${formattedDate} o ${selectedTime} Ty super ślicznotko 🚗`}
            </h1>
            <p className="text-gray-400 text-xs mt-5 italic">
              {isSibling
                ? `P.S. normalni bracia piszą SMSy. Ja zrobiłam stronę w przerwie obiadowej, dla ciebie, siostra. nic wielkiego.`
                : `P.S. mam olbrzymie szczęście, że taka super bomba jak Ty mnie wybrała`}
            </p>
            <div className="flex justify-center gap-2 mt-6">
              {(isSibling
                ? ['🤝', '💪', '🥹', '💪', '🤝']
                : ['💕', '💗', '💓', '💕', '💗']
              ).map((icon, i) => (
                <span key={i} className="text-lg">{icon}</span>
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
