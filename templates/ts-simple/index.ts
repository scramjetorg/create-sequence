import { TransformApp } from "@scramjet/types";

const mod: TransformApp = async function* (_input) {
	for await (const chunk of _input) {
		yield chunk;
	}
}

export default mod;
