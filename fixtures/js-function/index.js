async function func(){

	return "Hello world"
}

module.exports = async function* () {
    yield await func()
}
