async function saveEntryToDB(data){
    return "saved";
}

module.exports = async function* (input) {
    for await (const chunk of input) {
        await saveEntryToDB(chunk);
    }
 }
