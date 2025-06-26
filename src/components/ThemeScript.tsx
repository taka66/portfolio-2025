export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var stored = localStorage.getItem('darkMode');
              var isDark = stored !== null 
                ? stored === 'true' 
                : window.matchMedia('(prefers-color-scheme: dark)').matches;
              
              document.documentElement.classList.toggle('dark', isDark);
              document.documentElement.classList.toggle('light', !isDark);
            } catch (e) {}
          })();
        `,
      }}
    />
  );
}