const setDataInStorage = (key, data)=> {
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error storing data in cache:", error);
    }
  }

const getDataFromStorage = (key)=> {
    try {
      const data = sessionStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error retrieving data from cache:", error);
      return null;
    }
  }

  export { setDataInStorage, getDataFromStorage };