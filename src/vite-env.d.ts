/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_GITHUB_TOKEN: string;
  // Legacy support
  REACT_APP_GITHUB_TOKEN?: string;
}
