import type { Preview } from '@storybook/react';

import '../../../packages/icons/dist/icons.css';
import '../../../packages/ui/dist/index.css';
import './markdown.css';
import '../../../packages/ui/public/styles/components.css';

const preview: Preview = {
  decorators: [
    Story => {
      return <Story />;
    },
  ],
};

export default preview;
