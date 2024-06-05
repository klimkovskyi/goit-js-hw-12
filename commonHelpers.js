import{S as m,i as l}from"./assets/vendor-8c59ed88.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();function p(i){const r="https://pixabay.com/api/",o=new URLSearchParams({key:"13983728-c7bbdcf2d20cfa49f01a0b8c6",q:i,image_type:"photo",orientation:"horizontal",safesearch:!0}),s=`${r}?${o}`;return fetch(s).then(e=>{if(!e.ok)throw new Error(e.statusText);return e.json()})}function d(i){return i.map(({webformatURL:r,largeImageURL:o,tags:s,likes:e,views:t,comments:a,downloads:u})=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${o}">
                <img class="gallery-image" src="${r}" alt="${s}">
                <ul class="wrapper">
                    <li>Likes<span>${e}</span></li>
                    <li>Views<span>${t}</span></li>
                    <li>Comments<span>${a}</span></li>
                    <li>Downloads<span>${u}</span></li>
                </ul>
            </a>
        </li>
    `).join("")}const f=document.querySelector(".search-form"),c=document.querySelector(".gallery-list"),n=document.querySelector(".loader"),y=new m(".gallery-list a",{animationSpeed:200,animationSlide:!0,disableScroll:!1,history:!1,captionsData:"alt",captionDelay:250});f.addEventListener("submit",i=>{i.preventDefault();const r=i.target.elements.search.value.trim();if(c.innerHTML="",!r){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}n.classList.remove("hidden"),n.style.display="block",p(r).then(o=>{if(!o.total)return l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),n.style.display="none";const s=d(o.hits);c.innerHTML=s,n.classList.add("hidden"),n.style.display="none"}).catch(o=>console.log(o)).finally(()=>y.refresh())});
//# sourceMappingURL=commonHelpers.js.map
