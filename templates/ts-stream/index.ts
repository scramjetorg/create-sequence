import { ReadableApp } from "@scramjet/types";
import { PassThrough } from "stream";

const mod: ReadableApp = function(_input) {
	
	const out = new PassThrough ();
	 
	out.write("Hello World")
	return out;
}

export default mod;
