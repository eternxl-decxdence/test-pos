import clsx from 'clsx'
import { type TargetAndTransition } from 'motion/react'

interface StyleConfig {
  layout: string
  animation: string
  colors: string
  sizing: string
}

interface AnimationConfig {
  variants: Record<string, TargetAndTransition>
  gestures: Record<string, TargetAndTransition>
}
type ConfigLogic = (...args: any[]) => any

type ComponentConfig<TKeys extends string> = {
  elements: {
    [T in TKeys]: {
      styles: Partial<StyleConfig>
      animations?: Partial<AnimationConfig>
    }
  }
  logic?: Record<string, ConfigLogic>
}
export default function createConfig<TKeys extends string, TLogic extends ConfigLogic>(
  config: ComponentConfig<TKeys>,
) {
  return {
    ...config,
    logic: {
      ...(config.logic ?? {}),
      composeStyles: (key: TKeys): string => {
        const style = config.elements[key].styles
        return clsx(style.layout, style.animation, style.colors, style.sizing)
      },
    } as { composeStyles: (key: TKeys) => string } & Record<string, ConfigLogic>,
  }
}
