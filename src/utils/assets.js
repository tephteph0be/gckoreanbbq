export const getAssetUrl = (path) => {
  if (!path) return '';
  // If it's an external URL, base64, or already resolved absolute path
  if (
    path.startsWith('http://') || 
    path.startsWith('https://') || 
    path.startsWith('data:')
  ) {
    return path;
  }
  
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // If the path already has the base URL prepended (e.g. from Vite's import statements)
  if (baseUrl !== '/' && path.startsWith(baseUrl)) {
    return path;
  }
  
  // Remove leading './' or '/'
  const cleanPath = path.replace(/^\.?\//, '');
  return `${baseUrl}${cleanPath}`;
};
