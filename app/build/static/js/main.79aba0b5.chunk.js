(this["webpackJsonpcookbook-app"]=this["webpackJsonpcookbook-app"]||[]).push([[0],{14:function(n,e,t){n.exports=t(22)},22:function(n,e,t){"use strict";t.r(e);var r=t(0),a=t.n(r),c=t(8),l=t.n(c),u=t(1),i=t(2);function o(){var n=Object(u.a)(["\n    * {\n        box-sizing: border-box;\n    }\n    body, html {\n        margin: 0;\n        font-family: sans-serif;\n        heigth: 100%;\n        width: 100%;\n    }\n"]);return o=function(){return n},n}var m=Object(i.a)(o());function f(){var n=Object(u.a)(["\n        color: red;\n        padding: 10px 25px;\n    "]);return f=function(){return n},n}function d(){var n=Object(u.a)(["\n        list-style: none;\n        display: flex;\n    "]);return d=function(){return n},n}function s(){var n=Object(u.a)(["\n        height: ",";\n    "]);return s=function(){return n},n}function p(){var n=Object(u.a)(["\n        min-height: calc(100vh - "," - ",");\n        ","\n    "]);return p=function(){return n},n}function b(){var n=Object(u.a)(["\n        height: ",";\n        width: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: space-around;\n        padding: 0 25px;\n    "]);return b=function(){return n},n}function E(){var n=Object(u.a)(["\n        max-width: 860px;\n        margin: auto;\n    "]);return E=function(){return n},n}var h=function(n){var e=n.children,t=Object(i.b)(E()),r=i.c.header(b(),"85px"),c=i.c.main(p(),"85px","50px",t),l=i.c.footer(s(),"50px"),u=i.c.ul(d()),o=i.c.li(f());return a.a.createElement(a.a.Fragment,null,a.a.createElement(r,null,"Header",a.a.createElement(u,null,a.a.createElement(o,null,"Home"),a.a.createElement(o,null,"Recipe"),a.a.createElement(o,null,"Ingredient"))),a.a.createElement(c,null,e),a.a.createElement(l,null,"Footer"))},g=(t(5),t(12),t(13));function v(){var n=Object(u.a)(["\n    // List with all recipe objects.\n    list-style: none;\n    width: 100%;\n"]);return v=function(){return n},n}function j(){var n=Object(u.a)(["\n    // Style the ingredients inside recipe\n    color: red;\n"]);return j=function(){return n},n}var x=i.c.ul(j()),O=i.c.ul(v()),y=function(n){var e=n.recipe,t=e.name,r=e.instructions,c=e.rating;e.ingredients;return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",null,a.a.createElement("div",null,t,", ",r,", ",c),a.a.createElement(x,null,"ingredients")))},w=function(){var n=Object(r.useState)([]),e=Object(g.a)(n,2),t=e[0];e[1];return a.a.createElement(a.a.Fragment,null,a.a.createElement(O,null,t.map((function(n){return a.a.createElement(y,{recipe:n})}))))},k=function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(m,null),a.a.createElement(h,null,a.a.createElement("div",null,"Hello World"),a.a.createElement(w,null)))};l.a.render(a.a.createElement(k,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.79aba0b5.chunk.js.map