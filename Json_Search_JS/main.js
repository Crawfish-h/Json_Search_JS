import * as Json_Create from "./Json_Creator.js";
import * as Json_Search from "./Json_Searcher.js";
import prompt_Sync from "prompt-sync";
const prompt = prompt_Sync();

let json_Creator = new Json_Create.Json_Creator();
let json_Searcher = new Json_Search.Json_Searcher();

while (true)
{
    console.clear();
    let user_Input = prompt("Enter 'j' to create a json, 's' to search the json database and then modify it, and q to quit the program. ");

    switch (user_Input)
    {
        case "j":
            json_Creator.Create_Json();
            break;
        case "s":
            json_Searcher.Search();
            break;
        case "r":
            // WIP: add code that allows for removing entries from the json database.
            break;
        case "q":  
            throw("Program was terminated by input from user.");
            break;
        default:
            prompt("Please enter valid input.");
    }
    

}