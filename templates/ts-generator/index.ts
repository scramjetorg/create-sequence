import { ReadableApp } from "@scramjet/types";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getPageFromApi(){
	return "Your result";
};

const mod: ReadableApp = async function* () {
	while(true){
		yield await getPageFromApi();
		await sleep(1000)
	}
}

export default mod;
