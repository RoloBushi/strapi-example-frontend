import { ButtonType } from '../constants';

export const getButtonChakraType = (type?: string) => {
  if (
    ButtonType.BUTTON !== type && ButtonType.RESET !== type && ButtonType.SUBMIT !== type
  ) {
    return ButtonType.BUTTON;
  }

  return type;
};
