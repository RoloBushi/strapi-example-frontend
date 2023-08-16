import { FC } from 'react';

import { Button, ButtonProps } from '@chakra-ui/react';

import { CustomButtonProps } from '@/types/page';

const BaseButton: FC<ButtonProps & CustomButtonProps> = ({
  aria,
  label,
  variant,
  bgColor,
  texrColor,
  actions = {},
  type,
  ...buttonProps
}) => {
  const onClick = actions.onClick;

  return (
    <Button
      aria-label={aria}
      type={type}
      variant={variant}
      {...(!variant && {
        bgColor,
        color: texrColor
      })}
      onClick={eval(onClick)}
      {...buttonProps}
    >   
      {label}
    </Button>
  );
};

export default BaseButton;
