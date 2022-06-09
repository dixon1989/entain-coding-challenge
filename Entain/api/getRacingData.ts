import axios from "axios";

// Using Axios as mock retrieving json data
export const getNedsResults = async () => {
  try {
    /* Only use local data for further presentation */
    const req = await axios.get(`https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10`);
    if (req.status === 200) {
      let data = req.data;
      return data;
    }
  } catch (error) {
    console.log("Couldnt Retrieve Data: ", error);
  }
};
