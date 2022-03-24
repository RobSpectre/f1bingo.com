import{d as v,r as u,o as l,c,a as i,b as x,t as g,e as m,f as w,u as y,g as $,h as S,F as B,i as k,w as C,n as M,j as q,k as A,l as F,s as T,m as P}from"./vendor.9d58502e.js";const I=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerpolicy&&(n.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?n.credentials="include":s.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}};I();const _=v("game",{state:()=>({name:"game",board:[]}),getters:{selectedSquares(e){return e.board.filter(function(t){return t.selected==!0})},selectedSquaresIds(e){return this.selectedSquares.map(t=>t.id)},getSquareById(e){return t=>e.board.find(o=>o.id===t)}},actions:{addSquare(e){this.board.push(e)},markSquare(e){this.board.forEach(t=>{t.id===e&&(t.selected===!0?t.selected=!1:t.selected=!0)})},resetBoard(e){this.board=e}}}),N={class:"flex flex-col mt-5 justify-center items-center sm:mt-6"};function V(e,t,o,r,s,n){const a=u("ShareIcon");return l(),c("div",N,[i("button",{class:"inline-flex rounded-md border border-transparent shadow-sm px-4 py-2 bg-green text-base font-medium text-white uppercase mt-14 hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow sm:text-sm sm:mt-24",type:"button",onClick:t[0]||(t[0]=d=>n.shareBoard())},[x(g(o.text)+" ",1),m(a,{class:"ml-2 h-4 w-4 text-white"})])])}var p=(e,t)=>{const o=e.__vccOpts||e;for(const[r,s]of t)o[r]=s;return o};const H={name:"ShareButton",components:{ShareIcon:w},setup(){const e=_(),t=y();return{game:e,toast:t}},props:{text:String},methods:{shareBoard(){let e=`f1bingo.com

`,t=[[],[],[],[],[]],o=0;return this.game.board.forEach(r=>{r.selected===!0?t[o].push("\u{1F7E9}"):t[o].push("\u2B1C"),o++,o>4&&(o=0)}),t.forEach(r=>{r.forEach(s=>{e=e+s}),e=e+`
`}),navigator.clipboard.writeText(e),this.toast("Results copied to your clipboard",{toastClassName:"bg-green"}),e}}};var b=p(H,[["render",V]]);const R={class:"bg-cover bg-no-repeat bg-left flex h-48 relative",id:"header"},E=i("h1",{class:"flex-auto text-center text-6xl text-white hidden"},"Formula 1 Bingo",-1),L={class:"flex-initial absolute right-0 bottom-0 mb-4 mr-24"},j={class:"ml-3 shadow-sm rounded-md flex-initial absolute right-0 bottom-0 mb-4 mr-2"};function G(e,t,o,r,s,n){const a=u("ShareButton");return l(),c("div",R,[E,i("span",L,[m(a,{text:"Share"})]),i("span",j,[i("button",{class:"inline-flex items-center p-2 border border-transparent text-large leading-5 font-medium rounded-md text-white bg-orange transition duration-150 ease-in-out uppercase hover:bg-yellow focus:outline-none",type:"button",onClick:t[0]||(t[0]=d=>n.resetBoard())},"Reset")])])}const D={name:"Header",components:{ShareButton:b},methods:{resetBoard(){this.emitter.emit("reset-board",{}),this.$gtag.event("Click",{event_category:"Reset",event_label:"Board"})}}};var O=p(D,[["render",G]]);const z={name:"Footer"},W={class:"bg-gray rounded-b-lg"},K=$('<div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8"><div class="flex justify-center md:order-2"><a href="https://twitter.com/dn0t" class="ml-6 text-white hover:text-white"><span class="sr-only">Twitter</span><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg></a><a href="https://github.com/RobSpectre/f1bingo.com" class="ml-6 text-white hover:text-white"><span class="sr-only">GitHub</span><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path></svg></a></div><div class="mt-2 md:mt-0 md:order-1"><p class="text-center text-base leading-7 text-white"> Created by <a href="mailto:rob@brooklynhacker.com">Rob Spectre.</a> Made with \u2764\uFE0F in New York. </p></div></div>',1),U=[K];function X(e,t,o,r,s,n){return l(),c("div",W,U)}var Y=p(z,[["render",X]]),J=["Pay driver spins",'"Kerfuffle"',"Vettel > 3 overtakes","Tsunoda crash","VER + HAM incident","Team principal facepalm","Toto slams something","Team orders","Pit stop fail","Porpoising","Clean 1st lap","Checo defence","Mercedes overheat","McLaren brake fail","Mechanical DNF","Two stopper","Reserve gets the drive","Three turn battle","Flat spotted tyre","5 second penalty","Stuck in Gravel","Wheel contact","Merc or Red Bull < P10","Horner F-bomb","Broken front wing","Undercut for podium","Broadcast misses overtake","Stroll curt on radio","P12 gets lapped",'Crofty says "Mazepin"',"Red flag","Double yellow","Kerb damages floor","Multiple tyre failure","Safety car","Virtual safety car","Barely missing DRS","Powerunit fail","Gearbox fail","Turn 1 divebomb","Turn 10 lunge","Sand spinout Turn 14","Puncture","Helicopter"],Q="/assets/les_toreadors.3e6f1f98.mp3";const Z={key:0,class:"fixed z-10 inset-0 overflow-y-auto","aria-labelledby":"modal-title",role:"dialog","aria-modal":"true"},ee={class:"flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"},te=i("div",{class:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity","aria-hidden":"true"},null,-1),oe=i("span",{class:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true"},"\u200B",-1),re={class:"bg-cover relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all h-56 w-64 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:h-80 sm:p-6",id:"winner"};function se(e,t,o,r,s,n){const a=u("ShareButton");return o.winConditionMet?(l(),c("div",Z,[i("div",ee,[te,oe,i("div",re,[i("div",null,[m(a,{text:"Share"})])])])])):S("",!0)}const ne={name:"WinnerCard",components:{ShareButton:b},props:{selectedSquares:Array,winConditionMet:Boolean},computed:{playMusic(){this.winConditionMet===!0&&this.playVictoryMusic()}},methods:{playVictoryMusic(){const e=new Audio(Q);e.volume=.5,e.play()}}};var ae=p(ne,[["render",se]]);const ie={class:"bg-white grid grid-flow-col grid-cols-5 grid-rows-5 gap-4 p-10 mx-auto",id:"board"},de=["onClick"],le=["id"],ce={class:"inline-block p-2"};function ue(e,t,o,r,s,n){const a=u("winner-card");return l(),c("div",ie,[(l(!0),c(B,null,k(r.game.board,d=>(l(),c("div",{key:d.id,onClick:C(f=>n.markSquare(d.id),["prevent"])},[i("a",{class:M(["m-auto text-white flex items-center justify-center sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-32 lg:h-32 w-16 h-16 text-xs p-4 md:text-base lg:text-lg hover:bg-yellow focus:outline-none focus:shadow-outline-none focus:border-none",{"bg-green":d.selected,"bg-gray":!d.selected}]),id:"square-"+d.id},[i("span",ce,g(d.text),1)],10,le)],8,de))),128)),m(a,{selectedSquares:r.game.selectedSquares,winConditionMet:n.winConditionMet},null,8,["selectedSquares","winConditionMet"])])}const me={name:"Board",components:{WinnerCard:ae},setup(){return{game:_()}},mounted(){this.loadBoard(),this.emitter.on("reset-board",e=>{this.loadBoard()})},computed:{winConditionMet(){const e=[[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24],[5,10,15,20,25],[1,7,13,19,25],[5,9,13,17,21]];for(let t=0;t<e.length;t++){let o=0;for(let r=0;r<this.game.selectedSquaresIds.length;r++)e[t].includes(this.game.selectedSquaresIds[r])===!0&&o++;if(o===5)return!0}return!1}},methods:{markSquare(e){return this.game.markSquare(e),this.$gtag.event("Click",{event_category:"Gameplay",event_label:this.game.getSquareById(e).text}),e},loadBoard(){const e=this.shuffle(J);let t=1;const o=[];for(let r=0;r<25;r++)r===12?o.push({id:t,text:"Green Flag (Free)",selected:!0}):o.push({id:t,text:e[t],selected:!1}),t++;this.game.resetBoard(o)},shuffle(e){let t=e.length,o=e.length,r=e.length;for(;t!==0;)r=Math.floor(Math.random()*t),t-=1,o=e[t],e[t]=e[r],e[r]=o;return e}}};var pe=p(me,[["render",ue]]);const he={class:"bg-darkgray py-4",id:"app"},fe={class:"container mx-auto"};function ge(e,t,o,r,s,n){const a=u("Header"),d=u("Board"),f=u("Footer");return l(),c("div",he,[i("div",fe,[m(a),m(d),m(f)])])}const _e={name:"App",components:{Header:O,Footer:Y,Board:pe}};var be=p(_e,[["render",ge]]);const h=q(be),ve=P();h.use(A,{config:{id:"G-9DH48XP22E"}});h.use(F());h.config.globalProperties.emitter=ve;h.use(T,{});h.mount("#app");
