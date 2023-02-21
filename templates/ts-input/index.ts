import { ReadableApp  } from "@scramjet/types";
const {PassThrough} = require("stream");


const mod: ReadableApp  = function(_input) {
	return PassThrough.from(_input)
        .map((chunk) => {
            return `${chunk}`;
        })
}

export default mod;
