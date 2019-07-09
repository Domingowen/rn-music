import qs from "qs";
const initialOption = {
    method: "get",
    headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
};

const Request = function(url, option = false, parameter = null) {
    let optionSetting = option
        ? { ...option, body: parameter && qs.stringify(parameter) }
        : { ...initialOption, body: parameter && qs.stringify(parameter) };
    console.log(optionSetting);
    let urlSetting =
        url.indexOf("tencent") !== -1
            ? "https://23333333.itooi.cn/" + url
            : url;
    console.log(urlSetting);
    return fetch(urlSetting, optionSetting)
        .then(response => {
            console.log(response);
            let contentType = response.headers.get("content-type");
            if (contentType.includes("application/json")) {
                return response.json();
            } else if (contentType.includes("text/html")) {
                return response.text();
            } else if (contentType.includes("text/json")) {
                return response.json();
            } else {
                return Promise.reject({
                    status: response.status,
                    statusText: response.statusText
                });
            }
        })
        .then(res => {
            console.log(res);
            return Promise.resolve(res);
        })
        .catch(res => {
            console.log(res);
            return Promise.reject(res);
        });
};
export default Request;
