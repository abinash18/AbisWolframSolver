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
"use strict";

window.MathJax = {
    loader: {
        load: ["input/asciimath"],
    },
    asciimath: {
        delimiters: [
            ["$$", "$$"],
            ["`", "`"],
        ],
    },
};

/**
 * I did some bullshit to get these don't @ me; its legal as far as I know.
 * Its 25k calls a month 1 MB file size limit and 3 page pdf limit.
 * The response time is about 3.45s, its free, fight me
 * nvm dosnt work with math
 */
const ocrAPPID = ["1f95b3d90088957", "63f10d2d1988957", "07f4e6b88688957"];

/**
 * Wolfram Alpha Developer AppID Keys. Since Each free key only allows 2000 API calls a month.
 */
const wolframAPPID = [
    "26LQEH-YT3P6T3YY9",
    "K49A6Y-4REWHGRWW6",
    "J77PG9-UY8A3WQ2PG",
    "P3WLYY-2G9GA6RQGE",
    "P7JH3K-27RHWR53JQ",
    "L349HV-29P5JV8Y7J",
    "77PP56-XLQK5GKUAA",
    "59EQ3X-HE26TY2W64",
    "8Q68TL-QA8W9GEXAA",
    "KQRKKJ-8WHPY395HA",
    "AAT4HU-Q3RETTGY93",
    "7JKH84-T648HW2UV9",
    "WYEQU3-2T55JP3WUG",
    "T2XT8W-57PJW3L433",
    "2557YT-52JEY65G9K",
    "UVPKUJ-X9Q365R7E3",
    "W85VHP-E6WH3U78EE",
    "W33433-AKRV98E5AT",
    "3A3P8J-XA4UTGKAH5",
    "QGK5UA-HGUK7AP5LY",
    "8EL8GA-7W6EVYTQ5X",
    "W4TUXQ-GA2H8KUULA",
    "UGHH75-YPX2RVU4E4",
    "26LQEH-YT3P6T3YY9",
    "K49A6Y-4REWHGRWW6",
    "J77PG9-UY8A3WQ2PG",
    "P3WLYY-2G9GA6RQGE",
    "P7JH3K-27RHWR53JQ",
    "L349HV-29P5JV8Y7J",
    "77PP56-XLQK5GKUAA",
    "59EQ3X-HE26TY2W64",
    "8Q68TL-QA8W9GEXAA",
    "KQRKKJ-8WHPY395HA",
    "AAT4HU-Q3RETTGY93",
    "7JKH84-T648HW2UV9",
    "WYEQU3-2T55JP3WUG",
    "T2XT8W-57PJW3L433",
    "2557YT-52JEY65G9K",
];

const sectionFooter = `<div class="dd">
                    <div class="dd2">
                        <div class="dd3"><button type="button" class="dd3ab"><svg class="_1zLOS" viewBox="0 0 16 16">
                                    <defs>
                                        <path
                                            d="M4.05025253,12 L12,12 L12,10 L14,10 L14,14 L12,14 L2,14 L2,12 L2.05025253,12 L2.05025253,10 L4.05025253,10 L4.05025253,12 Z M9.96428571,2 L9.96428571,6.15384615 L12.75,6.15384615 L7.875,11 L3,6.15384615 L5.78571429,6.15384615 L5.78571429,2 L9.96428571,2 Z"
                                            id="path-download"></path>
                                    </defs>
                                    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="icons/trays/subpod/ic_subpod_download">
                                            <mask id="mask-2" fill="white">
                                                <use xlink:href="#path-download"></use>
                                            </mask>
                                            <use class="dd3abu" id="Combined-Shape" fill="#F96932"
                                                xlink:href="#path-download"></use>
                                        </g>
                                    </g>
                                </svg><span><span>Download Page</span></span></button></div><a target="_blank"
                            rel="noopener noreferrer" href="https://www.wolfram.com/language/index.html.en"
                            class="dd3a"><span>POWERED BY THE <span class="dd3as"><span>WOLFRAM
                                        LANGUAGE</span></span></span></a>
                    </div>
                    <div class="loading-bar"></div>
                </div>`;

const loadingURL = "./loading.gif";
const canvas = $("#dataInsertion");
const searchBar = $("#search");
const recievePodstates =
    "&podstate=Step-by-step+solution&podstate=Step-by-step&podstate=Show+all+steps";
const format = "&format = image, plaintext, mathml";
const timeouts =
    "&scantimeout=60&podtimeout=60&timeout=60&parsetimeout=60&totaltimeout=60";
const output = "&output=json";
var additionalStates = new Array();
function getStates() {
    if (additionalStates.length != 0) {
        return (
            "&podstate=" +
            additionalStates.join("&podstate=").replaceAll(" ", "+")
        );
    } else {
        return "";
    }
}

const fixedEncodeURI = (string) =>
    encodeURIComponent(string).replace(
        /[-_.!~*'()]/g,
        (char) => "%" + char.charCodeAt(0).toString(16)
    );

function addState(state) {
    additionalStates.push(state);
}

function clearStates() {
    additionalStates = new Array();
}

function preQuery(podstate) {
    $("html, body").animate(
        {
            scrollTop: $("#search").offset().top,
        },
        500
    );
    var q = `https://api.wolframalpha.com/v2/query?${fixedEncodeURI(
        $("#search").val()
    )}
        &appid=${wolframAPPID[Date.now() % wolframAPPID.length]}
        &input=${(location.hash = fixedEncodeURI(
            (document.title = $("#search").val())
        ))}
        ${output}
        ${recievePodstates}
        ${getStates()}
        ${format}
        ${timeouts}
        `;
    q = q.replaceAll("\n", "");
    q = q.replaceAll("\t", "");
    q = q.replaceAll(" ", "");
    //q = fixedEncodeURI(q);
    console.log(getStates());
    $("#query").html('<p class="qt">Your Query:' + q + "</p>");
    query(q);
}

var req;
/**
 *
 * @param {string} queryURL The input to the wolfram api
 * @param {string} usingState If there was a previous state
 *  that was used, so we can use that in the state select drop down.
 */
async function query(queryURL) {
    var _result;
    if (req) {
        console.log("Aborting Request");
        req.abort();
    }
    // AJAX cause why not. And cause it is a CORS workaround
    req = $.ajax({
        type: "GET",
        url: queryURL,
        success: function (result) {
            console.log(result);
        },
        dataType: "jsonp",
        async: true,
        cache: false,
        headers: {
            accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        beforeSend: function (result) {
            $("#loading").toggleClass("loadingHidden");
        },
        complete: function (result) {
            $("#loading").toggleClass("loadingHidden");
        },
        error: function (xhr, status, error) {
            console.log(xhr + status + error);
        },
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
        alert(
            "Error" +
                results.queryresult.error.code +
                " " +
                results.queryresult.error.msg
        );
        $("#loading").toggleClass("loadingHidden");
    }
    var pods = results.queryresult.pods;
    /* console.log(pods = results.queryresult.pods); */
    /* pods.forEach(pod => {
                console.log(pod.title);
            }); */
    createSections(pods);
    $("#dataInsertion").html($("#dataInsertion").html() + sectionFooter);
}

function createInfos(pod) {
    var _infos = "";
    var infos = pod.infos;
    // checks if there is a infos element
    if (infos) {
        // checks if the infos element is an traversable array.
        if (!Array.isArray(infos)) {
            //console.log(infos.text);
            if (!Array.isArray(infos.links)) {
                _infos += `<a href="${infos.links.url}" target="_blank" rel="noopener noreferrer" class = "ia">
                ${infos.links.text} »
                </a>`;
            }
        } else {
            infos.forEach((info) => {
                _infos += `<div>
                 <button tabindex="0" type="button" class="ib" onclick="toggleInfoDropDown(this)">
                 <img src="${info.img.src}" alt="${info.img.alt}" class="ibi" style="width: ${info.img.width};height: ${info.img.height};">
                 </button>
                 <div class="ibid dropdown" style="display:none">`;
                info.links.forEach((link) => {
                    _infos += `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="ibida">
                 ${link.text}
                 </a>`;
                });
                _infos += `</div></div>`;
            });
        }
    }
    return _infos;
}

function toggleInfoDropDown(element) {
    $(element).parent().find(".dropdown").toggle();
}

/**
 * TODO: Add subpod states.
 * @param {*} pod
 * @returns
 */
function createSubElements(pod) {
    var i = "";
    var _subpods = pod.subpods;
    _subpods.forEach((_sp) => {
        var _i = _sp.img;
        i += `<div class="c4" max-width: ${_i.width}px; max-height: ${_i.height}px;>
                <img src="${_i.src}" alt="${_i.alt}">
                </img>
                <p>`;
        if (_sp.hasOwnProperty("mathml")) {
        } else if (_sp.hasOwnProperty("plaintext")) {
            i += _sp.plaintext;
        }
        i += '</p></div><hr class="s">';
    });
    return i;
}

function createStateSelectorMenu(pod_state_states, pod_id) {
    var menu = `<select id=${pod_id} class="sel" onchange="queryStateMenu(this)">`;
    pod_state_states.forEach((pod_state_states_state, i) => {
        console.log(i + " " + pod_state_states_state.name);
        menu += `<option class="selo" value="${pod_state_states_state.input}" >`;
        menu += pod_state_states_state.name;
        menu += "</option>";
    });
    menu += "</select>";
    return menu;
}

function createStateSelector(pod) {
    if (pod.states && Array.isArray(pod.states)) {
        console.log(pod);
        var final = '<ul class="sl"> ';
        var pod_states = pod.states;
        pod_states.forEach((pod_state) => {
            var pod_state_states = pod_state.states;
            // If there are more than 1 states we need a dropdown (for now).
            if (pod_state_states && Array.isArray(pod_state_states)) {
                var state_menu = createStateSelectorMenu(
                    pod_state_states,
                    pod.id
                );
                final += `<li class="sll">${state_menu}</li>`;
            }
            if (!Array.isArray(pod_state_states)) {
                // If there is no array of states we create a button
                var btn = `<li class="sll">
                         <button id="${pod_state.input}" class="sllb" type="button" onclick=queryState(this)>
                             <span class="sllbs">
                                 ${pod_state.name}
                             </span>
                         </button></li>`;
                final += btn;
            }
        });
        final += "</ul>";
        return final;
    }
    return "";
}

function queryState(stateElement) {
    console.log("State Called: " + stateElement.id);
    addState(stateElement.id);
    preQuery();
}

function queryStateMenu(stateElement) {
    console.log("State Called: " + stateElement.value + stateElement.value);
    addState(stateElement.value);
    preQuery();
}

/**
 * Creates sections in the data insertion div, complete with infos, states and images.
 * !TODO: create image maps; create subpod titles.
 * @param {JSON} pods
 */
function createSections(pods) {
    pods.forEach((pod, i) => {
        // console.log(pod.title);
        $("#dataInsertion").html(function () {
            var r = `
                    <section class = "s2">
                    <header class = "h1">
                    <h2 class = "head1">
                    ${pod.title}:</h2>
                    ${createStateSelector(pod)}
                    </header>
                    <div class = "math">
                        ${createSubElements(pod)}
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
                    
                    `;
            return $("#dataInsertion").html() + r;
        });
    });
}

$(document).ready(function () {
    $("#form").submit(async function (event) {
        event.preventDefault();
        clearStates();
        preQuery();
    });

    window.onhashchange = (event) => {
        $("#search").focus();
        $("#search").val(decodeURIComponent(location.hash.slice(1)));
    };

    window.onhashchange();

    function showError(xhr, status, error) {
        console.log(error, status, xhr);
    }
    $("#eowa").click(async function () {
        window.location.replace(
            "https://www.wolframalpha.com/input/?i=" +
                fixedEncodeURI($("#search").val())
        );
    });
    $("#clearInput").click(async function () {
        $("#search").val("");
        clearStates();
    });
});
