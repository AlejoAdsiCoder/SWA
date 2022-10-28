import http from "../http-common";

class DataService {
    getAll(params) {
        console.log(params)
        return http.get("people/?", {params})
        
      }
}

export default new DataService();