const url = "./data/data.json"

export const listProducts = async () => {
    try {
      const response = await fetch(url);
      const products = await response.json();
  
    //   let content = ``;
    //   products.forEach((product, index) => {
    //       content += `
    //       <tr> 
    //           <th scope="row">${index + 1}</th>
    //           <td>${product.name}</td>
    //           <td>${product.area}</td>
    //           <td>${product.lote}</td>
    //           <td>${product.stock}</td>
    //           <td>${product.ingreso}</td>
    //           <td>${product.vence}</td>
    //           <td>
    //               <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>
    //               <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can"></i></button>
    //           </td>
    //       </tr>    
    //       `
    //   });

      return products;
  
    } catch (error) {
      console.log(error);
    }
  };