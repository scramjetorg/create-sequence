function getPageFromApi(){
    return "Your result";
};

export default async function* () {
    await new Promise(resolve => setTimeout(resolve, 10000));
    yield await getPageFromApi();
}