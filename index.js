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
            $(".selectable").on({
                mouseenter: async function () {
                    $(this).append(showDropDownMenu(this));
                },
                mouseleave: async function () {
                    $(".smu").remove();
                },
            });
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

function createCopyDropDown(element) {
    var dd = `
    <section class="_2YgTQ">
    <header class="_1gtOE">
        <h2 class="_1n9UK"><img src="/_next/static/images/Download_279EQyPY.svg" alt="DATA_DOWNLOAD_HEADER"
                class="_10on1"><span>Wolfram|Alpha Data Download</span></h2><button aria-label="Close" type="button"
            class="_10um4 _3sfTM _7irlU"><svg class="_1vbKB" viewBox="0 0 12 12">
                <g fill="none" fill-rule="evenodd">
                    <path d="M-9-9h30v30H-9z"></path>
                    <path fill="#939393" class="_3c4p0"
                        d="M6.007 7.53L10.484 12 12 10.485 7.538 6 12 1.515 10.484 0 6.007 4.47 1.517 0 0 1.515 4.476 6 0 10.485 1.516 12z">
                    </path>
                </g>
            </svg></button>
    </header>
    <div class="_3kK32 _1R82D"><a href="https://www.wolframalpha.com/input/pro/downloadexamples/"
            class="_10um4 _3fDji xuFpP"><span class=""><span>View a complete list of available file formats
                    »</span></span></a></div>
    <div class="axWHm">
        <div class="xuFpP _3RJd8"><span>Select a format type:</span></div>
        <ul class="_34sw7">
            <div class="_1dXSN"><button type="button" class="_10um4 _1Jlbf _27ai8"><img
                        src="/_next/static/images/math_2gFtIs_K.png" alt="Math Typesetting icon"><span
                        class="_1cCVO _1vSP9 _31BH7"><span>Math Typesetting</span></span></button></div>
            <div class="_1dXSN"><button type="button" class="_10um4 _1Jlbf _27ai8"><img
                        src="/_next/static/images/raster_35D39Shg.png" alt="Raster Graphics icon"><span
                        class="_1cCVO _1vSP9 _31BH7"><span>Raster Graphics</span></span></button></div>
            <div class="_1dXSN"><button type="button" class="_10um4 _1Jlbf _27ai8"><img
                        src="/_next/static/images/vector_2fc-3y1-.png" alt="Vector Graphics icon"><span
                        class="_1cCVO _1vSP9 _31BH7"><span>Vector Graphics</span></span></button></div>
            <div class="_1dXSN"><button type="button" class="_10um4 _1Jlbf _27ai8"><img
                        src="/_next/static/images/web_2wakh4Ev.png" alt="Web Format icon"><span
                        class="_1cCVO _1vSP9 _31BH7"><span>Web Format</span></span></button></div>
        </ul>
        <ul class="_34sw7">
            <div class="_1dXSN"><button type="button" class="_10um4 _1Jlbf _27ai8"><img
                        src="/_next/static/images/wolfram_2KFuR-rc.png" alt="Wolfram Formats icon"><span
                        class="_1cCVO _1vSP9 _31BH7"><span>Wolfram Formats</span></span></button></div>
        </ul>
        <div class="_3HFUB bfaDi"><span>Not for commercial distribution.</span><a
                href="https://www.wolframalpha.com/termsofuse/" target="_blank" class="_10um4 _3fDji krBQN"><span
                    class=""><span>Terms of use »</span></span></a></div>
    </div>
    <div class="_15X6g _3cHi0">
        <div class="_31YIS HCDrz"><span>Download raw data generated by Wolfram|Alpha for your use.</span></div><a
            href="/pro/pricing/" class="_10um4 _1udgQ _1zuO8 _2kbYx"><span>Go <span class="_25wuH">Pro</span>
                Now</span></a>
        <div class="_3uX0X"><a href="https://www.wolframalpha.com/pro/" class="_10um4 _2JLN4 _2GiwP _4vXPR"><span>Learn
                    more about Wolfram|Alpha Pro »</span></a></div>
        <div class="_3v3Mv"><span>Already have Pro?</span><button type="button"
                class="_10um4 _2JLN4 _2GiwP XVzUN"><span>Sign in »</span></button></div>
    </div><button type="button" class="_10um4 _16RX_ _1v1iJ"><svg class="_2ektY" viewBox="0 0 24 24">
            <path class="_3c4p0"
                d="M11.295 9l-4.59 4.59A.996.996 0 1 0 8.115 15l3.89-3.88 3.88 3.88a.996.996 0 1 0 1.41-1.41L12.705 9a.996.996 0 0 0-1.41 0z">
            </path>
        </svg></button>
</section>`;
}

function showDropDownMenu(element) {
    var menu = `<ul class="smu">
                    <li tabindex="-1" aria-describedby="tooltip195" class="smul">
                        <button type="button" class="smulb">
                            <i class="smulbi fa far fa-copy"></i>
                                <span class="smulbs">
                                    <span>
                                        Download
                                    </span>
                                </span>
                        </button>
                    </li>
                </ul>`;
    return menu;
}
/**
 * TODO: Add subpod states.
 * @param {*} pod
 * @returns
 */
function createSubPods(pod) {
    var sp = '<hr class="s">';
    var _subpods = pod.subpods;
    for (let i = 1; i < _subpods.length; i++) {
        const _sp = _subpods[i];
        var _i = _sp.img;
        sp += `
        <section class="s2 selectable">
        <div class="math">
        <div class="_c4" max-width: ${_i.width}px; max-height: ${_i.height}px;>
        <img class="_c4i"src="${_i.src}" alt="${_i.alt}"></img>
        </div>
        </div>
        </section>
        `;
    }
    return sp;
}

function createSubPod(pod) {
    var _subPods = pod.subpods;
    var _sp = '<div class = "math">';
    var _i = _subPods[0].img;
    _sp += `<div class="c4" max-width: ${_i.width}px; max-height: ${_i.height}px;>
                <img src="${_i.src}" alt="${_i.alt}">
                </img></div></div>`;
    return _sp;
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
                    <section class = "s2 selectable">
                    <header class = "h1">
                    <h2 class = "head1">
                        ${pod.title}:</h2>
                        ${createStateSelector(pod)}
                    </header>
                        ${createSubPod(pod)}
                    <div id = "i1" class = "i1">
                    <div id = "i2" class = "i2">
                        ${createInfos(pod)}
                    <div id = "infosWithMenu">
                    </div>
                    </div>
                    </div>
                    </section>
                    ${pod.subpods.length > 1 ? createSubPods(pod) : ""}
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

    $(".selectable").hover(function () {});
});
