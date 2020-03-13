/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
// 將product的key,value分開

function insertData(totalItem, totalPage, paging, productSet, campaignProduct, campaignImages) {
  let nextPaging;
  let start;
  let end;

  if (Number(totalPage) <= Number(Number(paging) + 1)) {
    nextPaging = '';
  } else {
    nextPaging = Number(Number(paging) + 1);
  }


  if (productSet * (paging + 1) > totalItem) {
    start = Number(productSet * paging);
    end = totalItem;
  } else {
    start = Number(productSet * paging);
    end = productSet * (paging + 1);
  }

  let campaignImages_count = 0;
  for (let i = start; i < end; i++) {
    const campaignProduct_id = campaignProduct[i].product_id;
    // console.log('product_id is :' + campaignProduct_id);
    for (let j = 0; j < campaignImages.length; j++) {
      if (campaignImages[j].product_id == campaignProduct_id) {
        campaignImages_count++;
      }
    }
  }
//   console.log('Sum of campaign images is :' + campaignImages_count);


  const Package = [];
  const Data = {};
  for (let i = start; i < end; i++) {
    const campaignProduct_id = campaignProduct[i].product_id;
    const inputcampaignImages = [];
    const data = {};

    for (let k = 0; k < campaignImages.length; k++) {
      if (campaignImages[k].product_id == campaignProduct_id) {
        inputcampaignImages.push(campaignImages[k].campaign_images);
      }
    }

    data.id = i + 1;
    data.product_id = campaignProduct[i].product_id;
    data.picture = inputcampaignImages[0];
    data.story = campaignProduct[i].campaign_story;
    Package.push(data);
  }

  Data.data = Package;
  Data.next_paging = nextPaging;

  if (nextPaging == '') {
    delete Data.next_paging;
  }

  for (let i = 0; i < Data.data.length; i++) {
    for (let j = 0; j < Data.data[i].picture.length; j++) {
      delete Data.data[i].picture[j].product_id;
    }
  }
  return Data;
}

module.exports = {
  insertData,
};
