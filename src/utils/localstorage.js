const localStorageKeyName = "notes";

export const getLocalStorage = () => {
  try {
    const jsonStorage = localStorage.getItem(localStorageKeyName);
    const localStorageValue = JSON.parse(jsonStorage);
    
    if (!localStorageValue) {
      return [];
    }

    return localStorageValue;
  } catch (error) {
    console.log(error);
  }
};

export const saveLocalStorage = (state) => {
  try {
    localStorage.setItem(localStorageKeyName, JSON.stringify(state));
  } catch (error) {
    console.log(error);
  }
};
