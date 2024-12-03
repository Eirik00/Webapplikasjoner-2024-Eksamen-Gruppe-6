import { Event } from "@/types/eventSchema";
import { Mal } from "@/types/malSchema";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Ai kode:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//

const filePathMal = path.resolve(__dirname, "../../data/dataMal.json");
const filePathEvent = path.resolve(__dirname, "../../data/dataEvent.json");

export const readMalData = (): Mal[] => {
    try {
        const data = fs.readFileSync(filePathMal, "utf-8");
        return JSON.parse(data);
    }catch (err: any){
        if(err.code === "ENOENT"){
            return [];
        }
        throw err;
    }
};

export const writeMalData = (data: Mal[]): void => {
    fs.writeFileSync(filePathMal, JSON.stringify(data, null, 2));
}

export const readEventData = (): Event[] => {
    try {
        const data = fs.readFileSync(filePathEvent, "utf-8");
        return JSON.parse(data);
    }
    catch (err: any){
        if(err.code === "ENOENT"){
            return [];
        }
        throw err;
    }
};

export const writeEventData = (data: Event[]): void => {
    fs.writeFileSync(filePathEvent, JSON.stringify(data, null, 2));
}