import { useLocation } from 'react-router-dom'
import style from './Stepindicator.module.css'

export type TSteps = { [path: string]: number }

export type TStepindicator = {
  steps: TSteps
  className?: string
}

export const Stepindicator = ({ steps, className }: TStepindicator) => {
  const location = useLocation()
  const currentStep = steps[location.pathname as keyof typeof steps]

  return (
    <div className={`${style.container} ${className ?? ''}`}>
      <p className={style.header}>{`Шаг ${currentStep} из ${Object.keys(steps).length}`}</p>
      <ul className={style.stepContainer}>
        {Object.entries(steps).map(([path, step]) => {
          return (
            <li
              aria-hidden="true"
              key={path}
              className={`${style.step} ${step <= currentStep ? style.active : ''}`}
            ></li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * Индикатор шагов: подпись «Шаг N из M» и полосок прогресса.
 *
 * Рассчитан на layout-роут — рендерится рядом с `<Outlet />` и берёт номер шага
 * из текущего `pathname`. Обязан находиться внутри `<Router>`, иначе упадёт.
 *
 * `steps` — словарь «путь → номер шага»:
 * - пути должны точно совпадать с `path` из конфига роутера;
 * - номера возрастают в том же порядке, что и ключи — от него зависит порядок полосок;
 * - общее число шагов = количество ключей;
 * - если текущего пути в словаре нет, подпись покажет «Шаг undefined», полоски останутся неактивными.
 *
 * @example
 * <Stepindicator steps={{ '/register': 1, '/register/step2': 2, '/register/step3': 3 }} />
 */