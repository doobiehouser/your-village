import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

/**
 * Root HTML document for the web build (Expo Router convention). We add an explicit
 * `color-scheme: light` so mobile browsers with an automatic/forced dark mode (e.g.
 * Chrome's "Dark mode for web contents") don't invert this light-themed app's colors —
 * without this, some browsers apply their own dark heuristic since the app never
 * declares a light-only theme.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="color-scheme" content="light" />
        <ScrollViewStyleReset />
        <style>{`html, body { background-color: #FBF5F2; }`}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
