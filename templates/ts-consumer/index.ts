import { TransformApp } from "@scramjet/types";

async function saveEntryToDB(data){
    return "saved";
}

const mod: TransformApp = async function* (_input) {
    for await (const chunk of _input) {
        await saveEntryToDB(chunk);
    }
}
export default mod;
