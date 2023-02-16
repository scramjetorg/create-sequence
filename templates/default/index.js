module.exports = async function* () {
    let i = 0
    while (true) {
        yield new Promise((res) => setTimeout(() => res(`data ${i++}`), 100))
    }
}
