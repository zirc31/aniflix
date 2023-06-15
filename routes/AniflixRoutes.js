const router = require('express').Router();
// const axios = require('axios');

const ApiBaseURL = process.env.APP_API_BASE_URL;
// const ApiProvider = process.env.APP_API_PROVIDER;

const enableDevMode = true; // set to false for Production / Live. true for dev mode.

const fs = require('fs');
const dataSearchJson = '../aniflix/data/dataSearch.json';
const dataInfoJson = '../aniflix/data/dataInfo.json';
const dataWatchJson = '../aniflix/data/dataWatch.json';

const dataRecentRelease = '../aniflix/data/dataRecentRelease.json';
const dataNewSeason = '../aniflix/data/dataNewSeason.json';
const dataPopular = '../aniflix/data/dataPopular.json';
const dataAnimeMovies = '../aniflix/data/dataAnimeMovies.json';
const dataTopAiring = '../aniflix/data/dataTopAiring.json';

let aniflixSearchData;
let aniflixInfoData;
let aniflixWatchData;

let aniflixRecentRelease;
let aniflixNewSeason;
let aniflixPopular;
let aniflixAnimeMovies;
let aniflixTopAiring;

// for search and room data endpoint.
fs.readFile( dataSearchJson, (error, data) => {
    if (error) {
        return console.error(error);
    }
    console.log(`JSON File for "aniflixSearchData" loaded successfully!`);
    aniflixSearchData = JSON.parse(data.toString());
});
fs.readFile( dataInfoJson, (error, data) => {
    if (error) {
        return console.error(error);
    }
    console.log(`JSON File for "aniflixInfoData" loaded successfully!`);
    aniflixInfoData = JSON.parse(data.toString());
});
fs.readFile( dataWatchJson, (error, data) => {
    if (error) {
        return console.error(error);
    }
    console.log(`JSON File for "aniflixWatchData" loaded successfully!`);
    aniflixWatchData = JSON.parse(data.toString());
});

// for Frontpage data endpoint.
fs.readFile( dataRecentRelease, (error, data) => {
    if (error) {
        return console.error(error);
    }
    console.log(`JSON File for "aniflixRecentRelease" loaded successfully!`);
    aniflixRecentRelease = JSON.parse(data.toString());
});
fs.readFile( dataNewSeason, (error, data) => {
    if (error) {
        return console.error(error);
    }
    console.log(`JSON File for "aniflixNewSeason" loaded successfully!`);
    aniflixNewSeason = JSON.parse(data.toString());
});
fs.readFile( dataPopular, (error, data) => {
    if (error) {
        return console.error(error);
    }
    console.log(`JSON File for "aniflixPopular" loaded successfully!`);
    aniflixPopular = JSON.parse(data.toString());
});
fs.readFile( dataAnimeMovies, (error, data) => {
    if (error) {
        return console.error(error);
    }
    console.log(`JSON File for "aniflixAnimeMovies" loaded successfully!`);
    aniflixAnimeMovies = JSON.parse(data.toString());
});
fs.readFile( dataTopAiring, (error, data) => {
    if (error) {
        return console.error(error);
    }
    console.log(`JSON File for "aniflixTopAiring" loaded successfully!`);
    aniflixTopAiring = JSON.parse(data.toString());
});



// GET: http://localhost:8000/api/v1/fetch/get/riimuru/:key
// /recent-release
// /new-season
// /popular
// /anime-movies
// /top-airing
router.get( '/get/:provider/:key', ( request, response ) => {

    const ApiProvider = request.params.provider;
    const paramsKey = request.params.key;
    let apiUrl = ``;
    let aniflixDummyJson = ``;

    if( ApiProvider === 'riimuru' ) {
        apiUrl = `${ApiBaseURL}/${paramsKey}`;
    } else {
        console.log({ status: 400, error: 'Bad Request!', errorCode: '101' });
        return response.status( 400 ).send( { error: 'Bad Request!', errorCode: '101' } );
    }

    if( !paramsKey ) {
        console.log({ status: 400, error: 'Bad Request!', errorCode: '102' });
        return response.status( 400 ).send( { error: 'Bad Request!', errorCode: '102' } );
    }

    // for checking, to view the intended request url and parameters.
    // response.status( 200 ).send( { data: {
    //     apiProvider: ApiProvider,
    //     paramsKey: paramsKey,
    //     apiUrl: apiUrl
    // } } );
    
    console.log({ apiUrl: apiUrl});

    if( paramsKey === 'recent-release' ) {
        aniflixDummyJson = aniflixRecentRelease;
    } else if( paramsKey === 'new-season' ) {
        aniflixDummyJson = aniflixNewSeason;
    } else if( paramsKey === 'popular' ) {
        aniflixDummyJson = aniflixPopular;
    } else if( paramsKey === 'anime-movies' ) {
        aniflixDummyJson = aniflixAnimeMovies;
    } else if( paramsKey === 'top-airing' ) {
        aniflixDummyJson = aniflixTopAiring;
    } else {
        console.log({ status: 400, error: 'Bad Request!', errorCode: '112' });
        return response.status( 400 ).send( { error: 'Bad Request!', errorCode: '112' } );
    }

    
    if( enableDevMode ) {
        let responseMessage = `DevMode Enabled!`;
        console.log({ status: 200, message: responseMessage });
        response.status( 200 ).send({ data: aniflixDummyJson });
    } else {
        const fetchAniList = async () => {
            try {
                const res = await fetch(apiUrl);
                const resData = await res.json();
                let responseMessage = `Successfully Fetch Data Info!`;
                console.log({ status: 200, message: responseMessage });
                response.status( 200 ).send( { data: resData } );
            } catch (error) {
                console.error(error);
                console.log({ status: 400, errorMsg: 'Bad Request!', errorCode: '103', error: error });
                return response.status( 400 ).send( { errorMsg: 'Bad Request!', errorCode: '103', error: error } );
            }
        };
        fetchAniList();
    }

});

// GET: http://localhost:8000/api/v1/fetch/search/:provider/title?keyword=<:keyword>
router.get( '/search/:provider/title', ( request, response ) => {

    const ApiProvider = request.params.provider;
    const queryKeyword = request.query.keyword;
    let apiUrl = '';
    
    if( !queryKeyword ) {
        console.log({ status: 400, error: 'Bad Request!', errorCode: '104' });
        return response.status( 400 ).send( { error: 'Bad Request!', errorCode: '104' } );
    }

    if( ApiProvider === 'riimuru' ) {
        apiUrl = `${ApiBaseURL}/search?keyw=${queryKeyword}`;
    } else {
        apiUrl = `${ApiBaseURL}/${ApiProvider}/search?keyw=${queryKeyword}`;
    }

    console.log({ apiUrl: apiUrl});

    if( enableDevMode ) {
        let responseMessage = `DevMode Enabled!`;
        console.log({ status: 200, message: responseMessage });
        response.status( 200 ).send({ data: aniflixSearchData });
    } else {
        const fetchAniList = async () => {
            try {
                const res = await fetch(apiUrl);
                const resData = await res.json();
                let responseMessage = `Successfully Found Result For ${queryKeyword}!`;
                console.log({ status: 200, message: responseMessage });
                // response.status( 200 ).send({ message: responseMessage, data: resData });
                response.status( 200 ).send({ data: resData });
            } catch (error) {
                // console.error(error);
                console.log({ status: 400, errorMsg: 'Bad Request!', errorCode: '105', error: error });
                return response.status( 400 ).send( { errorMsg: 'Bad Request!', errorCode: '105', error: error } );
            }
        };
        fetchAniList();
    }

});


// GET: http://localhost:8000/api/v1/fetch/info/:provider/:animeId
router.get( '/info/:provider/:animeId', ( request, response ) => {
    
    const ApiProvider = request.params.provider;
    const paramsAnimeId = request.params.animeId;
    let apiUrl = '';
    
    if( !paramsAnimeId ) {
        console.log({ status: 400, error: 'Bad Request!', errorCode: '106' });
        return response.status( 400 ).send( { error: 'Bad Request!', errorCode: '106' } );
    }

    if( ApiProvider === 'riimuru' ) {
        apiUrl = `${ApiBaseURL}/anime-details/${paramsAnimeId}`;
    } else if( ApiProvider === 'animix' ) {
        apiUrl = `${ApiBaseURL}/${ApiProvider}/episodes/${paramsAnimeId}`;
    } else {
        apiUrl = `${ApiBaseURL}/${ApiProvider}/info/${paramsAnimeId}`;        
    }

    console.log({ apiUrl: apiUrl});

    if( enableDevMode ) {
        let responseMessage = `DevMode Enabled!`;
        console.log({ status: 200, message: responseMessage });
        response.status( 200 ).send({ data: aniflixInfoData });
    } else {
        const fetchAniList = async () => {
            try {
                const res = await fetch(apiUrl);
                const resData = await res.json();
                let responseMessage = `Successfully Fetch Data Info!`;
                console.log({ status: 200, message: responseMessage });
                response.status( 200 ).send( { data: resData } );
            } catch (error) {
                console.log({ status: 400, errorMsg: 'Bad Request!', errorCode: '107', error: error });
                return response.status( 400 ).send( { errorMsg: 'Bad Request!', errorCode: '107', error: error } );
            }
        };
        fetchAniList();
    }

});

// GET: http://localhost:8000/api/v1/fetch/watch/:provider/:animeId/:episodeId
router.get( '/watch/:provider/:animeId/:episodeId', ( request, response ) => {
    
    const ApiProvider = request.params.provider;
    const paramsAnimeId = request.params.animeId;
    const paramsEpisodeId = request.params.episodeId;
    let apiUrl = '';

    if( !ApiProvider ) {
        console.log({ status: 400, error: 'Bad Request!', errorCode: '108' });
        return response.status( 400 ).send( { error: 'Bad Request!', errorCode: '108' } );
    }

    // when using riimuru
    if( ApiProvider === 'riimuru' ) {
        if( !paramsEpisodeId ) {
            console.log({ status: 400, error: 'Bad Request!', errorCode: '109' });
            return response.status( 400 ).send( { error: 'Bad Request!', errorCode: '109' } );
        }
        apiUrl = `${ApiBaseURL}/vidcdn/watch/${paramsEpisodeId}`;
        // /fembed/watch/:id (deprecated)
        // /vidcdn/watch/:id
        // /streamsb/watch/:id
    }
    
    // when using animepahe
    if( ApiProvider === 'animepahe' ) {
        if( !paramsAnimeId ) {
            console.log({ status: 400, error: 'Bad Request!', errorCode: '110' });
            return response.status( 400 ).send( { error: 'Bad Request!', errorCode: '110' } );
        }
        apiUrl = `${ApiBaseURL}/${ApiProvider}/watch/${paramsAnimeId}/${paramsEpisodeId}`;
    }

    // when using zoro/gogoanime
    if( ApiProvider === 'zoro' || ApiProvider === 'gogoanime' || ApiProvider === 'animix' ) {
        if( !paramsEpisodeId ) {
            console.log({ status: 400, error: 'Bad Request!' });
            return response.status( 400 ).send( { error: 'Bad Request!' } );
        }
    }
    if( ApiProvider === 'zoro' ) {
        apiUrl = `${ApiBaseURL}/${ApiProvider}/watch/${paramsEpisodeId}?type=1`;
    }
    if( ApiProvider === 'gogoanime' || ApiProvider === 'animix' || ApiProvider === 'allanime' ) {
        apiUrl = `${ApiBaseURL}/${ApiProvider}/watch/${paramsEpisodeId}`;
    }

    console.log({ apiUrl: apiUrl});

    if( enableDevMode ) {
        let responseMessage = `DevMode Enabled!`;
        console.log({ status: 200, message: responseMessage });
        response.status( 200 ).send({ data: aniflixWatchData });
    } else {
        const fetchAniList = async () => {
            try {
                const res = await fetch(apiUrl);
                const resData = await res.json();
                let responseMessage = `Successfully Fetch Episode Data!`;
                console.log({ status: 200, message: responseMessage });
                response.status( 200 ).send({ data: resData });
            } catch (error) {
                console.log({ status: 400, errorMsg: 'Bad Request!', errorCode: '111', error: error });
                return response.status( 400 ).send( { errorMsg: 'Bad Request!', errorCode: '111', error: error } );
            }
        };
        fetchAniList();
    }

});

module.exports = router;