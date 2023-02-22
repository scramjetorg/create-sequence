import { TransformApp  } from "@scramjet/types";
const {PassThrough} = require("stream");


const mod: TransformApp  = async function*(_input) {
	for await (const id of _input) {
        	yield id;
    	}
}
export default mod;
