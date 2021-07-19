/**
 * 
 * NOTE: I am using the original creator's API Interaction script as a reference and boiler plate.
 * None of the API keys you see here are mine. CORS Proxy is not mine either.
 * All credit goes to the original creator, who unfortunately dose not have a public github 
 * account for me to link to so here is the original repository instead:
 * https://github.com/WolfreeAlpha/WolfreeAlpha.github.io'
 * 
 * @author Abinash Singh
 */
'use strict'

window.MathJax = {
    loader: {
        load: ['input/asciimath']
    },
    asciimath: {
        delimiters: [
            ["$$", "$$"],
            ['`', '`']
        ]
    }
};

/**
 * Wolfram Alpha Developer AppID Keys. Since Each free key only allows 2000 API calls a month.
 */
const appid = [
    '26LQEH-YT3P6T3YY9',
    'K49A6Y-4REWHGRWW6',
    'J77PG9-UY8A3WQ2PG',
    'P3WLYY-2G9GA6RQGE',
    'P7JH3K-27RHWR53JQ',
    'L349HV-29P5JV8Y7J',
    '77PP56-XLQK5GKUAA',
    '59EQ3X-HE26TY2W64',
    '8Q68TL-QA8W9GEXAA',
    'KQRKKJ-8WHPY395HA',
    'AAT4HU-Q3RETTGY93',
    '7JKH84-T648HW2UV9',
    'WYEQU3-2T55JP3WUG',
    'T2XT8W-57PJW3L433',
    '2557YT-52JEY65G9K',
    'UVPKUJ-X9Q365R7E3',
    'W85VHP-E6WH3U78EE',
    'W33433-AKRV98E5AT',
    '3A3P8J-XA4UTGKAH5',
    'QGK5UA-HGUK7AP5LY',
    '8EL8GA-7W6EVYTQ5X',
    'W4TUXQ-GA2H8KUULA',
    'UGHH75-YPX2RVU4E4',
    '26LQEH-YT3P6T3YY9',
    'K49A6Y-4REWHGRWW6',
    'J77PG9-UY8A3WQ2PG',
    'P3WLYY-2G9GA6RQGE',
    'P7JH3K-27RHWR53JQ',
    'L349HV-29P5JV8Y7J',
    '77PP56-XLQK5GKUAA',
    '59EQ3X-HE26TY2W64',
    '8Q68TL-QA8W9GEXAA',
    'KQRKKJ-8WHPY395HA',
    'AAT4HU-Q3RETTGY93',
    '7JKH84-T648HW2UV9',
    'WYEQU3-2T55JP3WUG',
    'T2XT8W-57PJW3L433',
    '2557YT-52JEY65G9K',
];

const fixedEncodeURI = string => (
    encodeURIComponent(string)
    .replace(
        /[-_.!~*'()]/g,
        char => '%' + char.charCodeAt(0).toString(16)
    )
)

const loadingURL = "./loading.gif";
const canvas = $("#dataInsertion");
const searchBar = $("#search");
$(document).ready(function () {
    function preQuery(podstate) {
        var q = `https://api.wolframalpha.com/v2/query?${fixedEncodeURI($("#search").val())}
        &appid=${appid[Date.now() % appid.length]}
        &input=${location.hash = fixedEncodeURI(document.title = $("#search").val())}
        &output=json
        &podstate = Step-by-step+solution
        &podstate = Step-by-step
        &podstate = Show+all+steps
        &podstate = ${podstate?.replaceAll(' ', '+')}
        &format = image, plaintext, mathml
        &scantimeout = 30
        &podtimeout = 30
        &timeout = 30
        &parsetimeout = 30
        &totaltimeout = 30
    `;
        q = q.replaceAll("\n", '');
        q = q.replaceAll("\t", '');
        q = q.replaceAll(" ", '');
        //q = fixedEncodeURI(q);
        console.log(q);
        query(q, podstate);
    };
    $("#clearInput").click(function () {
        $("#search").val("");
    });

    /**
     * 
     * @param {string} queryURL The input to the wolfram api  
     * @param {string} usingState If there was a previous state
     *  that was used, so we can use that in the state select drop down.
     */
    async function query(queryURL, usingState) {
        var _result;
        // AJAX cause why not. And cause it is a CORS workaround
        $.ajax({
            type: "GET",
            url: queryURL,
            success: function (result) {
                console.log(result);
            },
            dataType: "jsonp",
            async: true,
            cache: false,
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            beforeSend: function (result) {
                $("#loading").toggleClass("loadingHidden");
            },
            complete: function (result) {
                $("#loading").toggleClass("loadingHidden");

            },
            error: function (xhr, status, error) {
                console.log(xhr + status + error);
            }
        }).done(function (data) {
            showResults(data);
            MathJax.Hub.Typeset();
        });
    }

    /**
     * 
     */
    function showResults(results) {
        $("#dataInsertion").html("");
        if (!results.queryresult.success) {
            alert("Error" + results.queryresult.error.code + " " +
                results.queryresult.error.msg);
            $("#loading").toggleClass("loadingHidden");
        }
        var pods = results.queryresult.pods;
        /* console.log(pods = results.queryresult.pods); */
        /* pods.forEach(pod => {
            console.log(pod.title);
        }); */
        createSections(pods);
    }

    function createInfos(pod) {
        var _infos = "";
        var infos = pod.infos;
        // checks if there is a infos element
        if (infos) {
            // checks if the infos element is an traversable array.
            if (!Array.isArray(infos)) {
                console.log(infos.text);
                _infos +=
                    `<button tabindex = "0" type = "button" class = "ib">
                <p class = "ib">${infos.text}</p>
                </button>`
            } else {
                infos.forEach((info) => {
                    _infos +=
                        `<button tabindex = "0" type = "button" class = "ib">
                    <p class = "ib">${info.text}</p>
                    </button>`
                });
            }
        }

        return _infos;
    }

    function createImages(pod) {
        console.log(pod.subpods);
        var i = "";
        var _subpods = pod.subpods;

        _subpods.forEach(im => {
            var _i = im.img;
            i +=
                `<div class="c4" max-width: ${_i.width}px; max-height: ${_i.height}px;>
                <img src="${_i.src}" alt="${_i.alt}">
                </img>
                $${_i.alt}$
                <p>
                
                    ${
                        im.mathml?.replaceAll(" </mtext>", "&nbsp;</mtext>")?.replaceAll("<mtext> ", "<mtext>&nbsp;")
                    }
                
                </p>
            </div>
            <hr class="s"> `
        });

        return i;
    }

    function createSections(pods) {
        pods.forEach((pod, i) => {
            console.log(pod.title);
            $("#dataInsertion").html(function () {
                var r = `
                    <section class = "s2">
                    <header class = "h1">
                    <h2 class = "head1">${pod.title}:</h2>
                    </header>
                    <div class = "math">
                        ${createImages(pod)}
                    </div>
                    <hr class = "s">
                    <div id = "infos" class = "i1">
                    <div id = "info1" class = "i2">
                        ${createInfos(pod)}
                    <div id = "infosWithMenu">
                        
                    </div>
                    </div>
                    </div>
                    </section>
                    `
                return $("#dataInsertion").html() + r;
            })
        });

    }

    $("form").submit(function (event) {
        event.preventDefault();
        preQuery();

    });
    /* $('#form').submit(function (e) {
        e.preventDefault();
    }); */

    window.onhashchange = event => {
        $("#search").focus();
        $("#search").val(decodeURIComponent(location.hash.slice(1)));
    };

    window.onhashchange();

    function showError(xhr, status, error) {
        console.log(error, status, xhr);
    }
});