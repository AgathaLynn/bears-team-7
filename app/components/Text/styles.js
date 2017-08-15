import { create } from 'react-native-platform-stylesheet';
import colors from '../../config/colors';

export default create({
  header: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.defaultText,
    marginVertical: 20,
  },
  large: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.defaultText,
  },
  error: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.red,
  },
});
