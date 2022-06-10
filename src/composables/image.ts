import TheImage from '../components/TheImage.vue'
import { createFloating } from './floating'

export const {
  container: TheImageContainer,
  proxy: TheImageProxy,
} = createFloating(TheImage)

// export {
//   TheImageContainer,
//   TheImageProxy,
// }
