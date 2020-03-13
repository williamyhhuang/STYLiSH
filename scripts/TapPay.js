/* eslint-disable require-jsdoc */
const app_id = 12348;
const app_key = 'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF';

TPDirect.setupSDK(12348, 'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF', 'sandbox');

// Display ccv fieldÓ
const fields = {
  number: {
    // css selector
    element: '#cardnumber',
    placeholder: '**** **** **** ****',
  },
  expirationDate: {
    // DOM object
    element: document.getElementById('cardexpirationdate'),
    placeholder: 'MM / YY',
  },
  ccv: {
    element: '#cardccv',
    placeholder: 'ccv',
  },
};
TPDirect.card.setup({

  fields: fields,
  styles: {
    // Style all elements
    'input': {
      'color': 'gray',
    },
    // Styling ccv field
    'input.ccv': {
      // 'font-size': '16px'
    },
    // Styling expiration-date field
    'input.expirationdate': {
      // 'font-size': '16px'
    },
    // Styling card-number field
    'input.cardnumber': {
      // 'font-size': '16px'
    },
    // style focus state
    ':focus': {
      // 'color': 'black'
    },
    // style valid state
    '.valid': {
      'color': 'green',
    },
    // style invalid state
    '.invalid': {
      'color': 'red',
    },
    // Media queries
    // Note that these apply to the iframe, not the root window.
    '@media screen and (max-width: 400px)': {
      'input': {
        'color': 'orange',
      },
    },
  },
});

TPDirect.card.getTappayFieldsStatus();

// call TPDirect.card.getPrime when user submit form to get tappay prime
// $('form').on('submit', onSubmit)

function onSubmit(event) {
  // event.preventDefault()

  // 取得 TapPay Fields 的 status
  const tappayStatus = TPDirect.card.getTappayFieldsStatus();

  // 確認是否可以 getPrime
  if (tappayStatus.canGetPrime === false) {
    alert('can not get prime');
    return;
  }

  // Get prime
  TPDirect.card.getPrime((result) => {
    if (result.status !== 0) {
      alert('get prime error ' + result.msg);
      return;
    } else {
      // alert('get prime 成功，prime: ' + result.card.prime)

      const product_each = [];
      const product = {
        id: '111',
        name: 'apple',
        price: 111,
        color: {
          code: '#FFFF00',
          color: 'yellow',
        },
        size: 'S',
        qty: 1,
      };
      product_each.push(product);

      let data = {
        prime: result.card.prime,
        order: {
          shipping: 'delivery',
          payment: 'credit_card',
          subtotal: 111,
          freight: 60,
          total: 171,
          recipient: {
            name: 'test',
            phone: '0912345678',
            email: 'test@test.com',
            address: 'address',
            time: 'morning',
          },
          list: product_each,
        },
      };

      data = JSON.stringify(data);

      $.ajax({
        url: '../order/checkout',
        data: data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        success: function(data) {
          const host = location.host;
          console.log(typeof(data) == String);
          if (typeof(data) == String) {
            alert(data);
          } else {
            const index = JSON.parse(data);
            document.cookie = `order_id=${index.data.number}`;
            window.location = `https://${host}/thankyou.html`;
          }
        },
        error: function() {
          alert('Error from receiving data from checkout function!');
        },
      });
    }

    // send prime to your server, to pay with Pay by Prime API .
    // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
  });
}
