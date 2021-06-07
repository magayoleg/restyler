import React from 'react';
import { Box } from 'src';
import { blueprinted } from 'storybook/decorators';

export default {
  title: 'containers/Box'
};

export const Blueprint = () => {
  return <Box />;
};
Blueprint.decorators = [blueprinted];

export const Basics = () => {
  return <Box>Sample text</Box>;
};

export const Flexbox = () => {
  return (
    <Box direction="row" gap="small">
      <Box padding="medium" background="red">
        A
      </Box>
      <Box padding="medium" background="green">
        B
      </Box>
      <Box padding="medium" background="blue">
        C
      </Box>
    </Box>
  );
};
