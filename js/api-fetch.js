const url = "./data/data.json"

export const listProducts = async () => {
    try {
      const response = await fetch(url);
      const products = await response.json();

      return products;
  
    } catch (error) {
      console.log(error);
    }
  };