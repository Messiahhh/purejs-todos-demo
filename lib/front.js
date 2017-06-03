const Ajax = ({
    method = 'get',
    url = '/',
    async = 'true',
    header = 'application/x-www-form-urlencoded',
    data,
}) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let res = JSON.parse(xhr.responseText)
                resolve(res)
            }
        }
        xhr.open(method, url, async)
        if (method === 'get') {
            xhr.send()
        }
        if (method === 'post') {
            xhr.setRequestHeader('Content-type', header)
            xhr.send(data)
        }
    })
}


const $ = (selector) => document.querySelectorAll(selector).length === 1 ? document.querySelector(selector) : document.querySelectorAll(selector)