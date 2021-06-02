import { BoxProps, SystemContext } from 'lib';
import { useContext, useState } from 'react';
import { MdCode } from 'react-icons/md';
import { Highlight } from './Highlight';
import { Box, Button, Collapse } from './registry';

export interface DemoProps extends BoxProps {
  code?: string;
  contentProps?: BoxProps;
}

export const Demo = ({ code, contentProps, children, ...rest }: DemoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useContext(SystemContext);

  const codeButton = (
    <Button
      onClick={() => setIsOpen(!isOpen)}
      border="none"
      color="#777777"
      padding="small"
      font="small"
      css={{
        position: 'absolute',
        top: '7px',
        right: '10px',
        fontFamily: '"Roboto Mono", monospace',
        '&:hover': {
          color: theme.variables?.palette?.primary
        }
      }}
    >
      <MdCode size="1.2rem" />
    </Button>
  );

  return (
    <Box css={{ position: 'relative' }} {...rest}>
      {code && codeButton}
      <Box
        background="lighterGrey"
        padding="50px"
        direction="row"
        align="center"
        justify="center"
        css={{ overflow: 'hidden' }}
      >
        <Box {...contentProps}>{children}</Box>
      </Box>
      {code && (
        <Collapse isOpen={isOpen}>
          <Highlight code={code.trim()} />
        </Collapse>
      )}
    </Box>
  );
};
