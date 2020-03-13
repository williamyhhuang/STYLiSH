const variant = (data) => {
  const productID = data.productID;
  const colors = data.colors;
  const sizes = data.sizes;
  const stock = data.stock;
  const colorsTransfer = [];

  for (let i = 0; i < colors.length; i++) {
    switch (colors[i]) {
      case 'yellow':
        colors[i] = '#FFFF00';
        break;
      case 'green':
        colors[i] = '#008000';
        break;
      case 'red':
        colors[i] = '#FF0000';
    }
    colorsTransfer.push(colors[i]);
  }

  const result = {
    productID: productID,
    color_code: colorsTransfer,
    size: sizes,
    stock: stock,
  };
  return result;
};

const color = (data) => {
  const originColor = data.colors.map((x) => x);
  const colors = data.colors;
  const colorsTransfer = [];

  for (let i = 0; i < colors.length; i++) {
    switch (colors[i]) {
      case 'yellow':
        colors[i] = '#FFFF00';
        break;
      case 'green':
        colors[i] = '#008000';
        break;
      case 'red':
        colors[i] = '#FF0000';
    }
    colorsTransfer.push(colors[i]);
  }

  const result = {
    productID: data.productID,
    name: originColor,
    color_code: colorsTransfer,
  };
  return result;
};

module.exports = {
  variant,
  color,
};
