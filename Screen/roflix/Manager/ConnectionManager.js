// 
const KEY = 'f89bb50c9cbb995279461a40f5ffcefc'
const base = 'https://api.themoviedb.org/3/movie/'
const TVbase = 'https://api.themoviedb.org/3/tv/'
const maxRequestTime = 2000

export const connectionconstant = {
    toprated: 'top_rated',
    popular: 'popular',
}

export function timeout(milliseconds, promise) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Request Timeout"))
        }, milliseconds)
        promise.then(resolve, reject)
    })
}

export function getTopRateMovie(page) {
    return timeout(maxRequestTime, movieFetcher('top_rated', page))
}
export function getPopularMovie(page) {
    return timeout(maxRequestTime, movieFetcher('popular', page))
}
export function getPopularTV(page) {
    return timeout(maxRequestTime, TVFetcher('popular', page))
}

export async function movieFetcher(type, page) {

    try {
        let question = await fetch(base + type + '?api_key=' + KEY + '&language=en-US&page=' + page
            , {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

        let result = await question.json();
        question = null
        return result
    }
    catch (error) {
        throw error;
    }
}

export async function TVFetcher(type, page) {
    try {
        let question = await fetch(TVbase + type + '?api_key=' + KEY + '&language=en-US&page=' + page
            , {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

        let result = await question.json();
        question = null
        return result
    }
    catch (error) {
        throw error;
    }
}  