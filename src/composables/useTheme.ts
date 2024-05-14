import { useColorMode } from '@vueuse/core'

type Theme = 'dark' | 'light'

function useTheme() {
  const themePreference = useColorMode()

  function setTheme(theme: Theme) {
    themePreference.value = theme
  }

  return { setTheme, themePreference }
}

export default useTheme
