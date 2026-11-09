export const ADMIN_EMAILS = ['roloquinonesf@gmail.com', 'rquinones@inteligenciaconectada.com'];
export const isAdminEmailAddr = (e?: string | null): boolean => !!e && ADMIN_EMAILS.includes(e.toLowerCase());
