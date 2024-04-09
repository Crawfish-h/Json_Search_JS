import prompt_Sync from "prompt-sync";
import * as file_System from 'fs'
const prompt = prompt_Sync();

export class Json_Searcher
{
    constructor()
    {

    }

    Search()
    {
        let files;

        try
        {
            //const data = file_System.readFileSync("./Database.txt", {encoding: 'utf-8', flag: 'r'});
            //console.log(data);

            files = file_System.readdirSync("Database");

            files.forEach(file => 
            {
                console.log(file);
            });

            console.log("");
            let query = prompt("Enter a query: ");

            let valid_Indexes = [];

            for (let i = 0; i < files.length; i++)
            {
                if (files[i].includes(query))
                {
                    const data = file_System.readFileSync("./Database/" + files[i], {encoding: 'utf-8', flag: 'r'});
                    valid_Indexes.push(i);
                    console.log("%d. [", i);
                    console.log("   %s", files[i]);
                    console.log("   %s", data);
                    console.log("]\n");
                }
            }

            /*
            files.forEach(file => 
            {
                if (file.includes(query))
                {
                    const data = file_System.readFileSync("./Database/" + file, {encoding: 'utf-8', flag: 'r'});
                    console.log(data);
                }
            });*/

            let file_Index;
            loop_Index_Check: while (true)
            {
                file_Index = prompt("Enter the index of the file you wish to manage: ");
                
                for (let i = 0; i < valid_Indexes.length; i++)
                {
                    if (file_Index == valid_Indexes[i])
                    {
                        break loop_Index_Check;
                    }
                }

                file_Index = prompt("Please enter a valid index or press q to quit.");
                if (file_Index === "q")
                {
                    return;
                }
            }


            loop_File_Input: while (true)
            {
                let user_Input = prompt("Press c to copy an entry, r to remove it, and q to go back to the main menu: ");
                switch (user_Input)
                {
                    case 'c':
                        file_System.copyFileSync("./Database/" + files[file_Index], "./Database/Copy_" + files[file_Index]);
                        break;
                    case 'r':
                        file_System.unlinkSync("./Database/" + files[file_Index]);
                        break loop_File_Input;
                    case 'q':
                        return;
                        break loop_File_Input;
                    default:
                        prompt("Please enter valid input.");
                        break;
                }
            }
        }catch(error)
        {
            console.log(error);
            prompt("An error occured.");
        }
    }
};