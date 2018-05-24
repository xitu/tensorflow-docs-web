$(document).ready(() => {
    $('pre code').each((i, block) => {
        try {
            hljs.highlightBlock(block);
        } catch (e) {
            console.log(e)
        }
    });
    // 如果 nav 数据存在则渲染左侧菜单
    if (!!window.nav) {
        nav.forEach((e, i) => {
            if (e.type === "child") {
                $("#left-nav").html($("#left-nav").html() + firstClassChildNav(e.title, e.link))
            } else {
                $("#left-nav").html($("#left-nav").html() + parentNav(e.title, e.sub_class))
            }
        })
    }
    // 渲染顶部导航
    head.forEach((e, i) => {
        $(".navbar-nav").html($(".navbar-nav").html() + headNav(e.name, e.link, e.selected))
    })
    // 渲染 contributors 列表
    contributors.forEach((e, i) => {
        $("#contributors").html($("#contributors").html() + contributorInfo(e))
    })
    // 封装原生 table
    $("table").each((i, e) => {
        if (!$(e).parent().hasClass("table-wrapper")) {
            e.outerHTML = `<div class="table-wrapper">${e.outerHTML}</div>`
        }
    })
    new needShareButton($('#share-button')[0])
});

docsearch({
    apiKey: '80483bd052fa7562fd902b7ef6c06497',
    indexName: 'tensorflow',
    inputSelector: '#search',
    debug: true // Set debug to true if you want to inspect the dropdown
});

function contributorInfo(person) {
    let name = Object.keys(person)[0]
    let avatar = person[name] || "data:image/png;base64,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"
    return `<a href="https://github.com/${name}"><img src="${avatar}"/>${name}</a>`
}


function firstClassChildNav(name, link) {
    return `
<ul class="nav flex-column mb-2">
<li class="nav-item">
            <a class="nav-link" href="${link}">
            <span data-feather="file-text"></span>
        ${name}
        </a>
        </li>
</ul>`
}

function parentNav(name, child) {
    var item = document.createElement("div");
    item.innerHTML = `<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>${name}</span>
        <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
        </a>
    </h6>
    <ul class="nav flex-column mb-2">
    </ul>`
    child.forEach((e, i) => {
        $(item.getElementsByClassName("nav")[0]).append(childNav(e.title, e.link))
    })
    return item.innerHTML
}

function childNav(name, link) {
    return `<li class="nav-item">
            <a class="nav-link" href="${link}">
            <span data-feather="file-text"></span>
        ${name}
        </a>
        </li>`
}

function headNav(name, link, select) {
    return `
    <li class="nav-item ${select === 1 ? 'active' : ''}">
                <a class="nav-link" href="${link}">${name}
                    ${select === 1 ? "<span class=\"sr-only\">(current)</span>" : ""}
                </a>
            </li>`
}