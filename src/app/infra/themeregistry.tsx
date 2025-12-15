'use client';

// import * as React from 'react';
// import { CacheProvider } from '@emotion/react';
// import createCache from '@emotion/cache';
// import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

// const theme = createTheme();

// const cache = createCache({
//   key: 'mui',
//   prepend: true,
// });

// export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
//   return (
//     <CacheProvider value={cache}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         {children}
//       </ThemeProvider>
//     </CacheProvider>
//   );
// }


import * as React from 'react';
import { useServerInsertedHTML } from 'next/navigation'; // <-- 1. Importação ESSENCIAL
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

// 2. O tema pode ser definido aqui ou importado
const theme = createTheme();

// 3. O cache agora deve ser criado DENTRO do componente
// e usado com useState para ser resetado em cada requisição.
export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = React.useState(() => {
    // Configuração do cache do Emotion (key: 'mui', prepend: true)
    const cache = createCache({ key: 'mui', prepend: true });
    cache.compat = true;
    
    // Função para coletar e limpar os estilos após a renderização do servidor
    const prevInsert = cache.insert;
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        // Isso garante que apenas estilos não inseridos sejam rastreados
      }
      prevInsert(...args);
    };
    
    // Função flush() é usada pelo useServerInsertedHTML para obter estilos
    const flush = () => {
        const styles = Object.values(cache.inserted)
          .join('');
        return styles;
    };
    
    return { cache, flush };
  });

  // 4. useServerInsertedHTML: Coleta os estilos gerados pelo SSR
  useServerInsertedHTML(() => {
    const styles = flush();
    if (!styles) {
      return null;
    }
    // 5. Injeta os estilos em uma tag <style> no cabeçalho do HTML
    return (
      <style
        data-emotion={`${cache.key}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {/* Adicione a CssBaseline aqui se você a usa */}
        <CssBaseline /> 
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
