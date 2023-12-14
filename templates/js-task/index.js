async function getPageFromAPI() {
    return "Your result";
}

module.exports = async function () {
    await new Promise(res => setTimeout(res, 10000));
    return getPageFromAPI();
}