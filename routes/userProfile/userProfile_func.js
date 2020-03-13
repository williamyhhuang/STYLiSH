const checkData = function(data) {
  if (!data.issue) {
    const package = {};
    const memberData = {
      id: data.signupData[0].id,
      provider: data.signupData[0].provider,
      name: data.signupData[0].name,
      email: data.signupData[0].email,
      picture: data.signupData[0].picturee,
    };
    package.data = memberData;
    return package;
  }
};

module.exports = {
  checkData,
};
