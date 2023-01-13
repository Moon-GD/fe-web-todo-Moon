class SearchLogManager {
    #searchLog;

    constructor() {
        this.#searchLog = [];
    }

    // 새로운 검색 기록을 삽입합니다.
    addNewSearchLog(searchLog) {
        this.#searchLog.push(searchLog)
    }

    // 최근 검색 기록을 기반으로 검색어를 추천해줍니다.
    suggestLog() {
        if(this.#searchLog.length == 0) { return null; }

        let countSet = {};
        let maxCount = 0;
        let maxLog = "";

        this.#searchLog.forEach((log) => {
            if(countSet[log]) { countSet[log] += 1; }
            else { countSet[log] = 1; }

            if(countSet[log] >= maxCount) {
                maxCount = countSet[log];
                maxLog = log;
            }
        })

        return maxLog;
    }
}

// 싱글톤 패턴 (검색어 기록을 한 군데에서 유지하기 위해)
const searchLogManger = new SearchLogManager();

export { searchLogManger }