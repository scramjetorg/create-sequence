function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getPageFromApi(){
	return "Your result";
}

module.exports = async function* () {
	while(true){
		yield await getPageFromApi();
		await sleep(1000)
	}
 }
