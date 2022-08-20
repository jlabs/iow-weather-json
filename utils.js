//utils.js
function getReqData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            // listen to data sent by client
            req.on("data", (chunk) => {
                // append the string version to the body
                body += chunk.toString();
            });
            // listen till the end
            req.on("end", () => {
                // send back the data
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
}

function toPascalCase(str){
    return (' ' + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => {
        return chr.toUpperCase()});
}

module.exports = { getReqData, toPascalCase };