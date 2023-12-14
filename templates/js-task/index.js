module.exports = async function () {
    await new Promise(res => setTimeout(res, 10000));
    return "Your result";
}