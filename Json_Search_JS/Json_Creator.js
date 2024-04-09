import prompt_Sync from "prompt-sync";
import * as file_System from 'fs'
const prompt = prompt_Sync();

export class Json_Creator
{
    constructor()
    {

    }

    Check_Prompt_Value(data_Member, prompt_Value)
    {
        if (prompt_Value !== "i" && prompt_Value !== "c" && prompt_Value !== "q")
        {
            data_Member.str = prompt_Value;
        }
    }

    Input_Options(obj)
    {
        console.log("Enter 'i' to insert the json into the database, 'q' to quit this json, and 'c' to continue, and 'q' to quit the program.");
        let user_Input = prompt("Input: ");

        switch (user_Input)
        {
            case "i":
                let json_Data = JSON.stringify(obj);
                file_System.writeFileSync("Database/" + obj.Name + ".txt", json_Data, function(error) 
                {
                    if (error)
                    {
                        prompt("An error occured.");
                        console.log(error);
                    }
                });
                this.Input_Options(obj);
                break;
            case "q":
                return true;
                break;
            case "c":
                return false
                break;
            default:
                break;
        }

        return true;
    }

    Create_Json()
    {
        let data_Member = "";
        while (data_Member !== "i" && data_Member !== "c" && data_Member !== "q")
        {
            let obj = 
            {
                Name: ""
            }

            let data_Name;

            while (true)
            {
                data_Name = prompt("Enter a name for the new json: ");
                obj.Name = data_Name;

                if (file_System.existsSync("Database/" + obj.Name + ".txt") == false)
                {
                    break;
                }else
                {
                    prompt("Json name is already taken. ");
                }
            }

            console.clear();
            console.log("Json name: %s", data_Name);
            data_Member = prompt("Enter a name for the data that will be added to the json: ");

            obj[data_Member] = prompt("Enter a value for the data that will be added to the json: ");

            if (this.Input_Options(obj) == true)
            {
                return;
            }
        }
    }
};