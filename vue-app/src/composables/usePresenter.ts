import { ref, onMounted, type Ref } from 'vue'
import { AbstractPresenter } from 'abstract-mvvp'

export type Constructor<T> = new () => T

export type ViewModel<Presenter> =
  Presenter extends AbstractPresenter<any, infer VM> ? VM : never

export type Modifier<Presenter, Args, Returns = void> = (
  presenter: Presenter,
  ...args: Args[]
) => Returns

export function usePresenter<
  Presenter extends AbstractPresenter<any, any>,
  Args = any,
>(
  PresenterConstructor: Constructor<Presenter>,
  defaultViewModel?: ViewModel<Presenter>,
  onStateChange?: Modifier<Presenter, [Args]>,
): [Ref<ViewModel<Presenter>>, Presenter] {
  const presenter = new PresenterConstructor()

  const viewModel = ref(
    defaultViewModel ?? presenter.defaultViewModel,
  ) as Ref<ViewModel<Presenter>>

  onMounted(() => {
    presenter.load((data) => {
      viewModel.value = data
      onStateChange?.(presenter)
    })
  })

  return [viewModel, presenter]
}
