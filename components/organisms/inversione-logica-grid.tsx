import { CountdownTimer } from '@/components/molecules/countdown-timer'
import { PhaseShell } from '@/components/organisms/phase-shell'
import { LOGIC_QUESTIONS, LOGIC_TOTAL_STEPS } from '@/lib/battle-night/types'
import { cn } from '@/lib/utils'

interface InversioneLogicaGridProps {
  logicStep: number
  timer: number
  timerRunning: boolean
}

export function InversioneLogicaGrid({ logicStep, timer, timerRunning }: InversioneLogicaGridProps) {
  const complete = logicStep >= LOGIC_TOTAL_STEPS
  // Current question is 0-indexed: step 1 = question[0], step 2 = question[1], etc.
  // Before the first step is advanced, show question 0 (the next to answer)
  const questionIndex = Math.min(logicStep, LOGIC_TOTAL_STEPS - 1)
  const currentQuestion = LOGIC_QUESTIONS[questionIndex]

  return (
    <PhaseShell
      title="L'Inversione Logica"
      subtitle="Quattordici passi in sequenza inversa. Un errore riporta la squadra all'inizio."
    >
      <CountdownTimer seconds={timer} running={timerRunning} size="md" />
      {complete ? (
        /* ── Completion state ── */
        <div className="flex flex-col items-center gap-6">
          <p
            className="font-display text-5xl font-bold uppercase tracking-wide text-accent"
            style={{ textShadow: '0 0 32px var(--color-accent)' }}
          >
            Sequenza completata!
          </p>
          {/* Progress dots — full */}
          <ProgressDots logicStep={LOGIC_TOTAL_STEPS} />
        </div>
      ) : (
        /* ── Active question state ── */
        <div className="flex w-full max-w-4xl flex-col items-center gap-4">
          {/* Question card */}
          <div
            className="relative flex w-full flex-col items-center gap-4 rounded-3xl border px-8 py-6"
            style={{
              borderColor: 'color-mix(in oklch, var(--color-primary) 50%, transparent)',
              boxShadow:
                '0 0 50px color-mix(in oklch, var(--color-primary) 20%, transparent), inset 0 0 30px color-mix(in oklch, var(--color-primary) 6%, transparent)',
              background: 'color-mix(in oklch, var(--color-card) 80%, transparent)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Step badge */}
            <span
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border px-4 py-0.5 text-xs font-bold uppercase tracking-widest"
              style={{
                borderColor: 'color-mix(in oklch, var(--color-primary) 60%, transparent)',
                background: 'var(--color-background)',
                color: 'var(--color-primary)',
              }}
            >
              Passo {logicStep + 1} di {LOGIC_TOTAL_STEPS}
            </span>

            {/* Question text */}
            <p className="font-display text-center text-2xl font-bold leading-tight text-foreground md:text-3xl">
              {currentQuestion.question}
            </p>

            {/* Options */}
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <OptionCard label="A" text={currentQuestion.optionA} accent="var(--color-primary)" />
              <OptionCard label="B" text={currentQuestion.optionB} accent="var(--color-accent)" />
            </div>
          </div>

          {/* Progress dots — subtle, secondary info */}
          <ProgressDots logicStep={logicStep} />
        </div>
      )}
    </PhaseShell>
  )
}

/* ── Sub-components ────────────────────────────────────────────────── */

function OptionCard({
  label,
  text,
  accent,
}: {
  label: string
  text: string
  accent: string
}) {
  return (
    <div
      className="flex flex-1 items-center gap-3 rounded-2xl border px-5 py-3 transition-all duration-200"
      style={{
        borderColor: `color-mix(in oklch, ${accent} 40%, transparent)`,
        background: `color-mix(in oklch, ${accent} 6%, transparent)`,
      }}
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-display text-lg font-bold"
        style={{
          background: `color-mix(in oklch, ${accent} 20%, transparent)`,
          color: accent,
          border: `1.5px solid color-mix(in oklch, ${accent} 50%, transparent)`,
        }}
      >
        {label}
      </span>
      <span className="font-display text-xl font-bold text-foreground md:text-2xl">
        {text}
      </span>
    </div>
  )
}

function ProgressDots({ logicStep }: { logicStep: number }) {
  const steps = Array.from({ length: LOGIC_TOTAL_STEPS }, (_, i) => i + 1)
  return (
    <div className="flex flex-wrap justify-center gap-1.5">
      {steps.map((n) => {
        const reached = n <= logicStep
        const current = n === logicStep
        return (
          <div
            key={n}
            title={`Passo ${n}`}
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold transition-all duration-300',
              reached
                ? 'bg-primary text-primary-foreground'
                : 'border border-border bg-card/40 text-muted-foreground/50',
              current && 'ring-2 ring-accent ring-offset-1 ring-offset-background',
            )}
          >
            {n}
          </div>
        )
      })}
    </div>
  )
}
