import axios from "axios";


export const fetchRatesFromApiNinja = async () => {
    const data = await axios.get("https://api.api-ninjas.com/v1/mortgagerate", {
        headers: {
            "X-Api-Key": "smbUl9vhAj8dj5bjR2UmSw==EmhsskkmsHnpF5Is"
        }
    });

    if (data.status !== 200) {
        throw new Error("Failed to fetch rates from api ninja!");
    }

    return data;
}

