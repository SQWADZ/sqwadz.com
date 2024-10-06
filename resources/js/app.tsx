import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from '@/Components/ThemeProvider';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import ModalsProvider from '@/Components/ModalsProvider';
import { TooltipProvider } from '@/Components/ui/tooltip';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: async (name) => {
    const page = await resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx'));

    // @ts-ignore
    page.default.layout = page.default.layout || ((page) => <WebsiteLayout children={page} />);

    return page;
  },
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <ThemeProvider>
        <TooltipProvider>
          <ModalsProvider>
            <App {...props} />
          </ModalsProvider>
        </TooltipProvider>
      </ThemeProvider>
    );
  },
  progress: {
    color: '#facc15',
  },
});
