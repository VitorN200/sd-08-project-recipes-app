// ACTION DE LOGIN
export const IS_LOADING = 'IS_LOADING';

export const FINISHED_LOADING = 'FINISHED_LOADING';

export const actionStartLogin = () => ({
  type: IS_LOADING,
});

export const actionFinishedLogin = () => ({
  type: FINISHED_LOADING,
});
