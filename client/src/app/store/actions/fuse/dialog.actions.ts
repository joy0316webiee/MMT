export const OPEN_DIALOG = '[DIALOG] OPEN';
export const CLOSE_DIALOG = '[DIALOG] CLOSE';

export const closeDialog = () => ({
  CLOSE_DIALOG
});

export const openDialog = (options: any) => ({
  type: OPEN_DIALOG,
  options
});
