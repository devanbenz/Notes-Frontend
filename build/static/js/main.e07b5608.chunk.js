(this["webpackJsonppart2-notes"]=this["webpackJsonppart2-notes"]||[]).push([[0],{11:function(t,n,e){},12:function(t,n,e){"use strict";e.r(n);var o=e(5),c=e.n(o),r=e(4),i=e(2),a=e(1),u=e(0),s=function(t){var n=t.note,e=t.toggleImportance,o=n.important?"make not important":"make important";return Object(u.jsxs)("li",{className:"note",children:[n.content,Object(u.jsx)("button",{onClick:e,children:o},n.id)]},n.id)},f="/api/notes",j=function(){return fetch(f,{method:"GET"}).then((function(t){return t.json()}))},d=function(t){return fetch(f,{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}}).then((function(t){return t.json()}))},l=function(t,n){return fetch("".concat(f,"/").concat(t),{method:"PUT",body:JSON.stringify(n),headers:{"Content-Type":"application/json"}}).then((function(t){return t.json()}))},h=function(){var t=Object(a.useState)([]),n=Object(i.a)(t,2),e=n[0],o=n[1],c=Object(a.useState)(""),f=Object(i.a)(c,2),h=f[0],b=f[1],p=Object(a.useState)(!0),m=Object(i.a)(p,2),O=m[0],g=m[1],v=Object(a.useState)("some error occurred..."),x=Object(i.a)(v,2),y=(x[0],x[1]);Object(a.useEffect)((function(){j().then((function(t){return o(t)})).catch((function(t){return console.log(t)}))}),[]);var S=O?e:e.filter((function(t){return t.important}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Notes"}),Object(u.jsxs)("button",{onClick:function(){g(!O)},children:["show ",O?"important":"all"]}),Object(u.jsx)("ul",{children:S.map((function(t){return Object(u.jsx)(s,{note:t,toggleImportance:function(){return function(t){var n=e.find((function(n){return n.id===t})),c=Object(r.a)(Object(r.a)({},n),{},{important:!n.important});l(t,c).then((function(n){o(e.map((function(e){return e.id!==t?e:n})))})).catch((function(c){y("Note ".concat(n.content," was already removed from server.")),setTimeout((function(){y(null)}),5e3),o(e.filter((function(n){return n.id!==t})))}))}(t.id)}},t.id)}))}),Object(u.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={content:h,date:(new Date).toLocaleDateString(),important:Math.random()<.5};d(n).then((function(t){o(e.concat(n)),b("")})).catch((function(t){return console.log(t)}))},children:[Object(u.jsx)("input",{value:h,onChange:function(t){b(t.target.value)}}),Object(u.jsx)("button",{type:"submit",children:"Add Note"})]})]})};e(11);c.a.render(Object(u.jsx)(h,{}),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.e07b5608.chunk.js.map