const {PassThrough} = require("stream");

module.exports = async function () {
    
	const out = new PassThrough ();
	 
	out.write("Hello World")
	return out;
}
