const LOCAL_USER_ID = 'LOCAL_USER_ID';

export const getLocalUserId = () => (
    localStorage.getItem(LOCAL_USER_ID)
);

export const storeLocalUserId = (userId) => {
    localStorage.setItem(LOCAL_USER_ID, userId);
};

export const clearLocalUserId = () => {
    localStorage.removeItem(LOCAL_USER_ID);
};
