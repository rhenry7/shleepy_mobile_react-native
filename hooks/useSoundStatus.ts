import { useSelector } from 'react-redux'
import { RootState } from '../src/app/reducer/store'

// figure out how to move these to a different folder
const useSoundStatus = () => {
  const { rainSound, seagullsSound, spaceSound, windSound } = useSelector(
    (state: RootState) => state.sounds,
  )

  return { rainSound, seagullsSound, spaceSound, windSound }
}

export default useSoundStatus
