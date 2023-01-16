class SearchLogManager {
    #searchLog;
    #searchCount;
    #maxCount = 0;
    #maxLog = "";

    constructor() {
        this.#searchLog = [];
        this.#searchCount = {};
    }

    // 새로운 검색 기록을 삽입합니다
    addNewSearchLog(searchLog) {
        this.#searchLog.push(searchLog);

        if(this.#searchCount[searchLog]) { this.#searchCount[searchLog] += 1; }
        else { this.#searchCount[searchLog] = 1; }

        if(this.#searchCount[searchLog] >= this.#maxCount) {
            this.#maxCount = this.#searchCount[searchLog];
            this.#maxLog = searchLog;
        }
    }

    // 최근 검색 기록을 기반으로 검색어를 추천해줍니다
    suggestLog() {
        if(this.#searchLog.length == 0) { return null; }

        return this.#maxLog;
    }

    // 검색어의 검색 빈도를 반환합니다
    getSearchCount(searchLog) {
        if(this.#searchCount[searchLog]) {
            return this.#searchCount[searchLog];
        }

        return 0;
    }
}

// 싱글톤 패턴 (검색어 기록을 한 군데에서 유지하기 위해)
const searchLogManger = new SearchLogManager();

export { searchLogManger }