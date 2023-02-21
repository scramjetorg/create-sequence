import { WritableApp  } from "@scramjet/types";
const {PassThrough} = require("stream");


const mod: WritableApp  = function(_input) {
	return PassThrough.from(_input)
        .map((chunk) => {
            return `${chunk}`;
        })
}

export default mod;
