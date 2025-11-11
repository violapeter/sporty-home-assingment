import React from 'react'
import { AbstractPresenter } from 'abstract-mvvp'

export type Constructor<T> = new () => T

export type ViewModel<Presenter> =
  Presenter extends AbstractPresenter<object, infer VM> ? VM : never

export type Modifier<Presenter, Args, Returns = void> = (
  presenter: Presenter,
  ...args: Args[]
) => Returns

export function usePresenter<
  Presenter extends AbstractPresenter<object, any>,
  Args = object,
>(
  PresenterConstructor: Constructor<Presenter>,
  defaultViewModel?: ViewModel<Presenter>,
  onStateChange?: Modifier<Presenter, [Args]>,
) {
  const presenter = new PresenterConstructor()

  const [viewModel, setViewModel] = React.useState<ViewModel<Presenter>>(
    defaultViewModel ?? presenter.defaultViewModel,
  )

  React.useEffect(() => {
    presenter.load((data) => {
      setViewModel(data)
      onStateChange?.(presenter)
    })
  }, [])

  return [viewModel, presenter] as const
}
