class ChromeStoreAPi {

    public saveDateToStore = async (data: any) => {
        await chrome.storage.local.set(data);
    }

    public getDataFromStore = async (dataKey: any) => {
        let result: any;
        await new Promise((resolve, reject) => {
            chrome.storage.local.get(dataKey, (data) => {
                if (Object.keys(data).length !== 0) {
                    result = data[dataKey];
                } else {
                    result = undefined;
                }
                resolve();
            });
        });
        return result;
    }
}
export const chromeStoreApi = new ChromeStoreAPi();
