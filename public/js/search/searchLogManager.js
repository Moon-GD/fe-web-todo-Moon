class SearchLogManager {
    #searchLog;
    #searchCount;
    #maxCount = 0;
    #maxLog = "";

    constructor() {
        this.#searchLog = [];
        this.#searchCount = {};
    }

    /** 검색 기록을 삽입합니다. */
    addNewSearchLog(searchLog) {
        this.#searchLog.push(searchLog);

        this.#searchCount[searchLog] ?
            this.#searchCount[searchLog] += 1:
            this.#searchCount[searchLog] = 1;

        if(this.#searchCount[searchLog] >= this.#maxCount) {
            this.#maxCount = this.#searchCount[searchLog];
            this.#maxLog = searchLog;
        }
    }

    /** 검색어를 추천합니다. */
    suggestLog = () => 
        this.#searchLog.length == 0 ? 
            null : this.#maxLog;

    /** 검색어의 빈도를 반환합니다. */
    getSearchCount = (searchLog) => 
        this.#searchCount[searchLog] ? 
            this.#searchCount[searchLog] : 0;
}

// 싱글톤 패턴 (검색어 기록을 한 군데에서 유지하기 위해)
const searchLogManger = new SearchLogManager();

export { searchLogManger }