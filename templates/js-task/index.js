async function getPageFromAPI() {
    return "Your result";
}

module.exports = async function (_stream, timeout = 10000) {
    await new Promise(res => setTimeout(res, timeout));
    return getPageFromAPI();
}