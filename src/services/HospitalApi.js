export const HospitalAPI = {
  getDoctors: async () => {
    const response = await fetch("https://677dc7ba94bde1c1252965c2.mockapi.io/api/v1/doctores");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },
  getServices: async () => {
    const response = await fetch("https://677dc7ba94bde1c1252965c2.mockapi.io/api/v1/services");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }
};