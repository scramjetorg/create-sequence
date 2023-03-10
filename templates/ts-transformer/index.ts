import { TransformApp } from "@scramjet/types";

async function getDbEntryForId(data){
	var result = "Your result: " + data;
	return result;
}

const mod: TransformApp = async function* (_input) {
	for await (const chunk of _input) {
		yield await getDbEntryForId(chunk);
    }
}
export default mod;
