import fs from 'fs/promises';
import path from 'path';
import { loadEnvConfig } from '@next/env';
import type { Language } from '@/contexts/settings-context';
loadEnvConfig(process.cwd());

const createLocales = async () => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_PATH + '/languages'
    );

    if (response.ok) {
      const languages: Language[] = await response.json();
      const locales = languages.map((language) => language.code);
      await fs.writeFile(
        path.join(process.cwd(), 'public', 'locales.json'),
        JSON.stringify({ locales }),
        'utf8'
      );
    }

    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
};

createLocales();
