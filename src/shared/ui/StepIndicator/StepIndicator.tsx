import style from './StepIndicator.module.css'

export type TStepIndicator = {
  stepsQuantity: number
  activeStep: number
  className?: string
}

export const StepIndicator = ({ stepsQuantity, activeStep, className }: TStepIndicator) => {
  let active = activeStep
  if (active < 1) active = 1
  if (active > stepsQuantity) active = stepsQuantity
  return (
    <div className={`${style.container} ${className ?? ''}`}>
      <p className={style.header}>{`Шаг ${active} из ${stepsQuantity}`}</p>
      <ul className={style.stepContainer}>
        {Array.from({ length: stepsQuantity }, (_, index) => (
          <li
            key={index}
            aria-hidden="true"
            className={`${style.step} ${index < active ? style.active : ''}`}
          />
        ))}
      </ul>
    </div>
  )
}