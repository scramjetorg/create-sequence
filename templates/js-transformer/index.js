async function getDbEntryForId(data){
    result = "Your result: " + data;
    return result;
}

module.exports = async function* (input) {
    for await (const chunk of input) {
        yield await getDbEntryForId(chunk);
    }
 }
