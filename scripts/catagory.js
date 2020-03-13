/* eslint-disable require-jsdoc */
function img_create(src) {
  const img = new Image();
  img.src = src;
  return img;
}

function redirect() {
  const host = location.host;
  window.location = `https://${host}/index.html`;
}

function redirect_profile() {
  const host = location.host;
  window.location = `https://${host}/profile.html`;
}

function click_men() {
  const host = location.host;
  document.getElementById('men').addEventListener('click', function() {
    window.location = `https://${host}/index.html?catagory=men`;
  });
}
click_men();

function click_women() {
  const host = location.host;
  document.getElementById('women').addEventListener('click', function() {
    window.location = `https://${host}/index.html?catagory=women`;
  });
}
click_women();

function click_acce() {
  const host = location.host;
  document.getElementById('acce').addEventListener('click', function() {
    window.location = `https://${host}/index.html?catagory=accessories`;
  });
}
click_acce();


function women() {
  const host = location.host;
  window.location = `http://${host}/index.html?catagory=women`;
  const url = new URL(window.location.href);
  console.log(url.searchParams.get('catagory'));
  // document.getElementsByClassName('main').innerHTML="";
  $('.main').empty();
  const getData = async () => {
    try {
      for (let i = 0; i < 3; i++) {
        const data_fetch = await fetch(`http://${host}/products/women?paging=${i}`, { method: 'GET' })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data.data;
          });

        console.log(`http://3.19.121.116/products/women?paging=${i}`);

        for (let j = 0; j < 2; j++) {
          const id = data_fetch[j].id;

          const color_div = document.createElement('div');
          color_div.className = 'color_div';
          for (k = 0; k < data_fetch[j].color.length; k++) {
            const color_i = document.createElement('div');
            color_i.className = 'color_i';
            color_i.style.backgroundColor = data_fetch[j].color[k].color_code;

            color_div.appendChild(color_i);
          }

          const main_div = document.getElementsByClassName('main');
          const product = document.createElement('div');
          const name_div = document.createElement('div');
          const price_div = document.createElement('div');
          const photo_div = document.createElement('div');


          product.className = 'product';
          name_div.className = 'name';
          price_div.className = 'price';
          photo_div.className = 'photo';

          const name = document.createTextNode(data_fetch[j].title);
          const price = document.createTextNode('TWD. ' + data_fetch[j].price);
          const pic = img_create(data_fetch[j].main_image[0]);

          // 塞連結進圖片裡
          const img_a = document.createElement('a');
          img_a.href = `http://${host}/product.html?id=${id}`;
          img_a.appendChild(pic);

          name_div.appendChild(name);
          photo_div.appendChild(img_a);
          price_div.appendChild(price);

          product.appendChild(photo_div);
          product.appendChild(color_div);
          product.appendChild(name_div);
          product.appendChild(price_div);
          main_div[0].appendChild(product);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  getData();
}

function men() {
  // let host = location.host;
  // window.location = `http://${host}/index.html?catagory=men`;
  $('.main').empty();
  // let cat;
  // let url = new URLSearchParams(location.href);
  // for (let [key, value] of url.entries()) {
  //     cat = value;
  // }

  const getData = async () => {
    try {
      const host = location.host;

      for (let i = 0; i < 3; i++) {
        const data_fetch = await fetch(`http://${host}/products/men?paging=${i}`, { method: 'GET' })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data.data;
          });

        console.log(`http://3.19.121.116/products/men?paging=${i}`);

        for (let j = 0; j < 2; j++) {
          const id = data_fetch[j].id;

          const color_div = document.createElement('div');
          color_div.className = 'color_div';
          for (k = 0; k < data_fetch[j].color.length; k++) {
            const color_i = document.createElement('div');
            color_i.className = 'color_i';
            color_i.style.backgroundColor = data_fetch[j].color[k].color_code;

            color_div.appendChild(color_i);
          }

          const main_div = document.getElementsByClassName('main');
          const product = document.createElement('div');
          const name_div = document.createElement('div');
          const price_div = document.createElement('div');
          const photo_div = document.createElement('div');


          product.className = 'product';
          name_div.className = 'name';
          price_div.className = 'price';
          photo_div.className = 'photo';

          const name = document.createTextNode(data_fetch[j].title);
          const price = document.createTextNode('TWD. ' + data_fetch[j].price);
          const pic = img_create(data_fetch[j].main_image[0]);

          // 塞連結進圖片裡
          const img_a = document.createElement('a');
          img_a.href = `http://${host}/product.html?id=${id}`;
          img_a.appendChild(pic);

          name_div.appendChild(name);
          photo_div.appendChild(img_a);
          price_div.appendChild(price);

          product.appendChild(photo_div);
          product.appendChild(color_div);
          product.appendChild(name_div);
          product.appendChild(price_div);
          main_div[0].appendChild(product);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  getData();
}

function accessories() {
  const host = location.host;
  // window.location = `http://${host}/index.html`
  $('.main').empty();
  const getData = async () => {
    try {
      const host = location.host;

      for (let i = 0; i < 3; i++) {
        const data_fetch = await fetch(`http://${host}/products/accessories?paging=${i}`, { method: 'GET' })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data.data;
          });

        console.log(`http://3.19.121.116/products/accessories?paging=${i}`);

        for (let j = 0; j < 2; j++) {
          const id = data_fetch[j].id;

          const color_div = document.createElement('div');
          color_div.className = 'color_div';
          for (k = 0; k < data_fetch[j].color.length; k++) {
            const color_i = document.createElement('div');
            color_i.className = 'color_i';
            color_i.style.backgroundColor = data_fetch[j].color[k].color_code;

            color_div.appendChild(color_i);
          }

          const main_div = document.getElementsByClassName('main');
          const product = document.createElement('div');
          const name_div = document.createElement('div');
          const price_div = document.createElement('div');
          const photo_div = document.createElement('div');


          product.className = 'product';
          name_div.className = 'name';
          price_div.className = 'price';
          photo_div.className = 'photo';

          const name = document.createTextNode(data_fetch[j].title);
          const price = document.createTextNode('TWD. ' + data_fetch[j].price);
          const pic = img_create(data_fetch[j].main_image[0]);

          // 塞連結進圖片裡
          const img_a = document.createElement('a');
          img_a.href = `http://${host}/product.html?id=${id}`;
          img_a.appendChild(pic);

          name_div.appendChild(name);
          photo_div.appendChild(img_a);
          price_div.appendChild(price);

          product.appendChild(photo_div);
          product.appendChild(color_div);
          product.appendChild(name_div);
          product.appendChild(price_div);
          main_div[0].appendChild(product);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  getData();
}

function all() {
  const url = new URL(window.location.href);
  let cat = url.searchParams.get('catagory');
  console.log(url.searchParams.get('catagory'));
  if (url.searchParams.get('catagory') == null) {
    cat = 'all';
  }
  const getData = async () => {
    try {
      const host = location.host;

      for (let i = 0; i < 3; i++) {
        const data_fetch = await fetch(`http://${host}/products/${cat}?paging=${i}`, { method: 'GET' })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data.data;
          });

        console.log(`http://3.19.121.116/products/${cat}?paging=${i}`);

        for (let j = 0; j < 2; j++) {
          const id = data_fetch[j].id;

          const color_div = document.createElement('div');
          color_div.className = 'color_div';
          for (k = 0; k < data_fetch[j].color.length; k++) {
            const color_i = document.createElement('div');
            color_i.className = 'color_i';
            color_i.style.backgroundColor = data_fetch[j].color[k].color_code;

            color_div.appendChild(color_i);
          }

          const main_div = document.getElementsByClassName('main');
          const product = document.createElement('div');
          const name_div = document.createElement('div');
          const price_div = document.createElement('div');
          const photo_div = document.createElement('div');


          product.className = 'product';
          name_div.className = 'name';
          price_div.className = 'price';
          photo_div.className = 'photo';

          const name = document.createTextNode(data_fetch[j].title);
          const price = document.createTextNode('TWD. ' + data_fetch[j].price);
          const pic = img_create(data_fetch[j].main_image[0]);

          // 塞連結進圖片裡
          const img_a = document.createElement('a');
          img_a.href = `https://${host}/product.html?id=${id}`;
          img_a.appendChild(pic);

          name_div.appendChild(name);
          photo_div.appendChild(img_a);
          price_div.appendChild(price);

          product.appendChild(photo_div);
          product.appendChild(color_div);
          product.appendChild(name_div);
          product.appendChild(price_div);
          main_div[0].appendChild(product);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  getData();
}

function add(x) {
  const getData = async (x) => {
    try {
      const host = location.host;
      const url = new URL(window.location.href);
      let cat = url.searchParams.get('catagory');
      if (url.searchParams.get('catagory') == null) {
        cat = 'all';
      }
      for (let i = x; i < x + 3; i++) {
        const data_fetch = await fetch(`https://${host}/products/${cat}?paging=${i}`, { method: 'GET' })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data.data;
          });

        console.log(`https://${host}/products/${cat}?paging=${i}`);

        if (data_fetch == '{"data":[]}') {
          return;
        } else {
          for (let j = 0; j < 2; j++) {
            const id = data_fetch[j].id;

            const color_div = document.createElement('div');
            color_div.className = 'color_div';
            for (k = 0; k < data_fetch[j].color.length; k++) {
              const color_i = document.createElement('div');
              color_i.className = 'color_i';
              color_i.style.backgroundColor = data_fetch[j].color[k].color_code;

              color_div.appendChild(color_i);
            }

            const main_div = document.getElementsByClassName('main');
            const product = document.createElement('div');
            const name_div = document.createElement('div');
            const price_div = document.createElement('div');
            const photo_div = document.createElement('div');


            product.className = 'product';
            name_div.className = 'name';
            price_div.className = 'price';
            photo_div.className = 'photo';

            const name = document.createTextNode(data_fetch[j].title);
            const price = document.createTextNode('TWD. ' + data_fetch[j].price);
            const pic = img_create(data_fetch[j].main_image[0]);

            // 塞連結進圖片裡
            const img_a = document.createElement('a');
            img_a.href = `https://${host}/product.html?id=${id}`;
            img_a.appendChild(pic);

            name_div.appendChild(name);
            photo_div.appendChild(img_a);
            price_div.appendChild(price);

            product.appendChild(photo_div);
            product.appendChild(color_div);
            product.appendChild(name_div);
            product.appendChild(price_div);
            main_div[0].appendChild(product);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  getData(x);
}

function product() {
  all();
}

product();
// //

