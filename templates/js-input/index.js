
module.exports = async function* (input) {
   for await (const id of input) {
        yield id;
    }
}
