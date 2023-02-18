import { ReadableApp } from "@scramjet/types";


function* func(){
	yield "Hello world";
};

const mod: ReadableApp = function(_input) {
	return func();
}

export default mod;
