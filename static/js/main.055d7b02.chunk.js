(this.webpackJsonpzshaderviewer=this.webpackJsonpzshaderviewer||[]).push([[0],{14:function(e){e.exports=JSON.parse('{"name":"zshaderviewer","version":"0.1.1","author":"owlzou","private":true,"homepage":".","dependencies":{"@geist-ui/core":"^2.3.0","@geist-ui/icons":"^1.0.1","@testing-library/jest-dom":"^5.11.4","@testing-library/react":"^11.1.0","@testing-library/user-event":"^12.1.10","@types/node":"^15.0.2","@types/react":"^17.0.5","@types/react-dom":"^17.0.3","codemirror":"^5.59.0","react":"^17.0.1","react-codemirror2":"^7.2.1","react-dom":"^17.0.1","react-scripts":"4.0.1","typescript":"^4.2.4","web-vitals":"^0.2.4"},"scripts":{"start":"react-scripts start","build":"react-scripts build","test":"react-scripts test","eject":"react-scripts eject"},"eslintConfig":{"extends":["react-app","react-app/jest"]},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]}}')},21:function(e,t,n){},22:function(e,t,n){},346:function(e,t,n){"use strict";n.r(t);var r=n(5),c=n(0),o=n.n(c),a=n(8),i=n.n(a),s=(n(21),n(9)),l=n(7),u=(n(22),n(6)),d=n(10),j=n(13);n(344),n(345);function b(e){var t={tabSize:4,mode:"x-shader/x-vertex",theme:e.theme,matchBrackets:!0,lineNumbers:!0};return Object(r.jsx)(j.Controlled,{value:e.value,onBeforeChange:function(t,n,r){e.onChange(r)},options:t})}var m="attribute vec3 aPosition;\nattribute vec2 aTexCoord;\nvarying lowp vec2 vTexCoord;\nvoid main(){\n    vTexCoord = aTexCoord;\n    gl_Position=vec4(aPosition,1.0);\n}",h=[{vex:m,frag:"#ifdef GL_ES\nprecision mediump float;\n#endif\nvarying lowp vec2 vTexCoord;\nuniform sampler2D uSampler;\nvoid main(){\n    // vTexCoord\u662f\u5f53\u524d\u5904\u7406\u7684\u70b9\u5728\u56fe\u7247\u91cc\u7684\u5750\u6807 \n    // texture2D \u662f\u63d0\u53d6\u7eb9\u7406\u4e2d\u5bf9\u5e94\u5750\u6807\u7684\u989c\u8272\n    gl_FragColor = texture2D(uSampler,vTexCoord);\n}",name:"\u56fe\u7247-\u57fa\u7840"},{vex:m,frag:"#ifdef GL_ES\nprecision mediump float;\n#endif\nvarying lowp vec2 vTexCoord;\nuniform sampler2D uSampler;\nvoid main(){\n    lowp vec4 color = texture2D(uSampler,vTexCoord);\n    lowp float gray = color[0]*0.3 + color[1]*0.59 + color[2]*0.11;\n    lowp vec4 new_color = vec4(gray,gray,gray,1);\n    gl_FragColor = new_color;\n}",name:"\u56fe\u7247-\u7070\u5ea6"},{vex:m,frag:"#ifdef GL_ES\nprecision mediump float;\n#endif\nvarying lowp vec2 vTexCoord;\nuniform sampler2D uSampler;\nuniform lowp vec2 uResolution;\n\nlowp vec4 getColor(lowp vec2 pos) {\n  // step(a,b) b>=a \u8fd4\u56de1 \u5426\u5219\u4e3a0\n  lowp float valid =\n      step(0.0, pos.x) * step(pos.x, 1.0) * step(0.0, pos.y) * step(pos.y, 1.0);\n  ; //\u5982\u679c\u5408\u6cd5\u8fd4\u56de1\n  return valid * texture2D(uSampler, pos) + vec4(.0, .0, .0, .0);\n}\n\nlowp vec4 getAdv(lowp float rad) {\n  lowp vec2 texel = vec2(1.0 / uResolution.x, 1.0 / uResolution.y);\n\n  lowp vec4 c1 = getColor(vTexCoord + texel * rad * vec2(-1, 1));\n  lowp vec4 c2 = getColor(vTexCoord + texel * rad * vec2(1, 1));\n  lowp vec4 c3 = getColor(vTexCoord + texel * rad * vec2(1, -1));\n  lowp vec4 c4 = getColor(vTexCoord + texel * rad * vec2(1, 1));\n\n  lowp vec4 color = c1 + c2 + c3 + c4;\n\n  return color * 0.25;\n}\n\nvoid main() {\n  // \u6a21\u7cca\u534a\u5f84\n  lowp float rad = 4.0;\n  // \u53d6\u7279\u5b9a\u70b9\u7684\u989c\u8272\n  gl_FragColor = getAdv(rad);\n}",name:"\u5747\u503c\u6a21\u7cca\uff08\u6d4b\u8bd5\uff09"},{vex:m,frag:"#ifdef GL_ES\nprecision mediump float;\n#endif\nuniform float uTime;\nuniform lowp vec2 uResolution;\n\nvoid main(){\n    vec2 st = gl_FragCoord.xy/uResolution.xy;\n    gl_FragColor = vec4(abs(sin(uTime))*st.x,abs(cos(uTime))*st.y,1.0,1.0);\n}",name:"\u65f6\u95f4\u6d4b\u8bd5"},{vex:m,frag:"#ifdef GL_ES\nprecision mediump float;\n#endif\nvarying lowp vec2 vTexCoord;\nuniform sampler2D uSampler;\nuniform vec2 uResolution;\nuniform float uTime;\n\nfloat random (in float x) {\n    return fract(sin(x)*1e4);\n}\n\nvoid main(){\n    float wave = 0.08; //\u504f\u79fb\u7cfb\u6570\n    vec2 grid = vec2(80,100);\n\n    vec2 st = vTexCoord * grid; //\u7ec6\u5206\u884c\u6570\n    vec2 ipos = floor(st); // \u63d0\u53d6\u6574\u6570\u90e8\u5206\n    \n    float dir = (mod(ipos.y,2.0)-0.5)*2.0; // \u8fd0\u52a8\u65b9\u5411\n\n    float x = vTexCoord.x + random(ipos.y*uTime)*wave*dir; // \u79fb\u52a8\u540e\u7684x\n\tvec2 newCoord = vec2(x,vTexCoord.y);\n    vec4 color = texture2D(uSampler,newCoord);\n\n    // \u6dfb\u52a0\u4e00\u4e9b\u626b\u63cf\u7ebf\u8272\u5757\n    // color *= step(random(ipos.y*uTime),0.95);\n\n    // \u6dfb\u52a0\u5de6\u53f3\u504f\u79fb\u8272\u5757\n    color *= step(random(ipos.x+random(ipos.y*uTime)*dir*wave),0.95);\n  \n    gl_FragColor = color;\n}",name:"\u6545\u969c\u56fe\u50cf"}],p=[{attribute:"attribute",type:"vec3",name:"aPosition",description:"\u8f93\u5165\u5750\u6807"},{attribute:"attribute",type:"vec2",name:"aTexCoord",description:"\u9876\u70b9\u7684\u7eb9\u7406\u5750\u6807"},{attribute:"uniform",type:"sampler2D",name:"uSampler",description:"\u7eb9\u7406\u6570\u636e"},{attribute:"uniform",type:"vec2",name:"uResolution",description:"\u753b\u5e03\u7684\u5927\u5c0f"},{attribute:"uniform",type:"float",name:"uTime",description:"Shader \u8fd0\u884c\u7684\u65f6\u95f4\uff08\u79d2\uff09"}],f=["3024-day","3024-night","abbott","abcdef","ambiance-mobile","ambiance","ayu-dark","ayu-mirage","base16-dark","base16-light","bespin","blackboard","cobalt","colorforth","darcula","dracula","duotone-dark","duotone-light","eclipse","elegant","erlang-dark","gruvbox-dark","hopscotch","icecoder","idea","isotope","juejin","lesser-dark","liquibyte","lucario","material-darker","material-ocean","material-palenight","material","mbo","mdn-like","midnight","monokai","moxer","neat","neo","night","nord","oceanic-next","panda-syntax","paraiso-dark","paraiso-light","pastel-on-dark","railscasts","rubyblue","seti","shadowfox","solarized","ssms","the-matrix","tomorrow-night-bright","tomorrow-night-eighties","ttcn","twilight","vibrant-ink","xq-dark","xq-light","yeti","yonce","zenburn"];function x(e,t,n){var r=e.createShader(n);if(e.shaderSource(r,t),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw new Error("ShaderInfoLog:\n".concat(e.getShaderInfoLog(r)));return r}function v(e,t,n){var r=x(e,t,e.VERTEX_SHADER),c=x(e,n,e.FRAGMENT_SHADER),o=e.createProgram();if(e.attachShader(o,r),e.attachShader(o,c),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS))throw new Error("ProgramInfoLog:\n".concat(e.getProgramInfoLog(o)));return o}function g(e,t,n,r,c,o,a){var i=arguments.length>7&&void 0!==arguments[7]?arguments[7]:null,s=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,s),e.bufferData(e.ARRAY_BUFFER,new Float32Array(r),e.STATIC_DRAW);var l=e.getAttribLocation(t,n);if(e.vertexAttribPointer(l,c,e.FLOAT,!1,o,a),null!=i){var u=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,u),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(i),e.STATIC_DRAW)}return e.enableVertexAttribArray(l),s}function O(e,t,n){var r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_NEAREST),e.generateMipmap(e.TEXTURE_2D),e.uniform1i(e.getUniformLocation(t,"uSampler"),0)}var w=n.p+"static/media/jessica-pamp-sGRMspZmfPE-unsplash.5cffdaca.jpg",y=n.p+"static/media/anh-nguyen-_Uqj5BQb-mw-unsplash.a6275f3c.jpg";var T=function(e){var t=Object(c.useRef)(null),n=Object(c.useState)(null),o=Object(l.a)(n,2),a=o[0],i=o[1],j=Object(c.useState)({background:"Image"}),b=Object(l.a)(j,2),m=b[0],h=b[1],p=Object(c.useState)(0),f=Object(l.a)(p,2),x=f[0],T=f[1],C=Object(c.useState)(null),S=Object(l.a)(C,2),k=S[0],E=S[1],R=Object(c.useState)(!0),A=Object(l.a)(R,2),F=A[0],I=A[1],D=Object(c.useState)(void 0),N=Object(l.a)(D,2),G=N[0],U=N[1],L=Object(c.useCallback)((function(e){if("object"!=typeof e){console.log("Load Image");var n=new Image;n.src=e||w,n.onload=function(){console.log("Image loaded"),t.current.width=n.width,t.current.height=n.height;var e=t.current.getContext("webgl2");e.viewport(0,0,e.canvas.width,e.canvas.height),i(n)}}}),[t]);return Object(c.useEffect)((function(){try{if(!F)return;var n=t.current.getContext("webgl2",{preserveDrawingBuffer:!0});a&&function(e,t,n,r){var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=[-1,-1,0,-1,1,0,1,-1,0,1,1,0],a=[0,1,0,0,1,1,1,0];e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT);var i=v(e,t,n);g(e,i,"aPosition",o,3,0,0),g(e,i,"aTexCoord",a,2,0,0),e.useProgram(i),e.uniform2f(e.getUniformLocation(i,"uResolution"),parseFloat(r.width),parseFloat(r.height)),e.uniform1f(e.getUniformLocation(i,"uTime"),c),O(e,i,r),e.drawArrays(e.TRIANGLE_STRIP,0,4)}(n,e.vertexSource,e.fragmentSource,a,x);if(e.fragmentSource.match(/uTime/g)){if(null==k){T(0);var r=window.setInterval((function(){return T((function(e){return e+.1}))}),100);E(r)}}else null!=k&&(window.clearInterval(k),E(null));U("")}catch(c){null!=k&&(window.clearInterval(k),E(null)),U(c.message)}}),[a,e,x,k,F]),Object(c.useEffect)((function(){switch(m.background){case"Image":L(w);break;case"Image2":L(y)}}),[m.background,L]),Object(r.jsxs)(u.h.Container,{direction:"column",children:[Object(r.jsx)("div",{style:{textAlign:"center"},children:Object(r.jsx)("canvas",{ref:t,style:{height:"50vh",width:"100%",objectFit:"contain"}})}),Object(r.jsx)(u.f,{}),Object(r.jsxs)("form",{children:[Object(r.jsxs)("div",{className:"row",children:[Object(r.jsx)(u.n,{children:"\u80cc\u666f"}),Object(r.jsxs)(u.k,{placeholder:"\u9009\u62e9\u80cc\u666f",onChange:function(e){if("string"==typeof e){var t=Object(s.a)(Object(s.a)({},m),{},{background:e});h(t)}},value:m.background,children:[Object(r.jsx)(u.k.Option,{value:"Image",children:"\u56fe\u7247\u4e00"}),Object(r.jsx)(u.k.Option,{value:"Image2",children:"\u56fe\u7247\u4e8c"}),Object(r.jsx)(u.k.Option,{value:"CustomImage",children:"\u81ea\u5b9a\u4e49\u56fe\u7247"})]}),"CustomImage"===m.background&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(u.b,{scale:.8,icon:Object(r.jsx)(d.Upload,{}),type:"secondary",onClick:function(){var e=document.createElement("input");e.type="file",e.accept="image/*",e.onchange=function(){if(e.files[0]){var t=new FileReader;t.onload=function(e){L(e.target.result)},t.readAsDataURL(e.files[0])}},e.click()},auto:!0,children:"\u4e0a\u4f20\u56fe\u7247"}),Object(r.jsx)(u.b,{scale:.8,icon:Object(r.jsx)(d.Download,{}),onClick:function(){var e=t.current.toDataURL("image/png"),n=document.createElement("a");n.download="download",n.href=e,document.body.appendChild(n),n.click(),n.remove()},auto:!0,children:"\u4e0b\u8f7d\u56fe\u7247"})]})]}),Object(r.jsxs)("div",{className:"row",children:[Object(r.jsx)(u.n,{children:"\u81ea\u52a8\u8fd0\u884c"}),Object(r.jsx)(u.q,{checked:F,onChange:function(e){return I(e.target.checked)}})]}),Object(r.jsx)(u.o,{value:G||"",width:"100%",style:{minHeight:"150px"},readOnly:!0})]})]})},C=n(15);function S(){var e=Object(c.useState)(""),t=Object(l.a)(e,2),n=t[0],o=t[1],a=Object(c.useState)(""),i=Object(l.a)(a,2),s=i[0],d=i[1];return Object(c.useEffect)((function(){var e="";try{e=function(e){var t=Object(C.a)(/#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/g,{R:1,G:2,B:3}).exec(e.toLowerCase());if(t){var n=(parseInt(t.groups.R,16)/255).toFixed(2),r=(parseInt(t.groups.G,16)/255).toFixed(2),c=(parseInt(t.groups.B,16)/255).toFixed(2);return"(".concat(n,",").concat(r,",").concat(c,")")}throw new Error("Invaild Input")}(n)}catch(t){}d(e)}),[n]),Object(r.jsxs)("div",{className:"row",children:[Object(r.jsx)(u.n,{children:"RGB \u8f6c vec3"}),Object(r.jsx)(u.i,{value:n,placeholder:"#79FFE1",onChange:function(e){return o(e.target.value)}}),Object(r.jsx)(u.i,{readOnly:!0,value:s,placeholder:"(0.47,1.00,0.88)"})]})}var k=function(){return Object(r.jsx)(u.c,{children:Object(r.jsx)(S,{})})},E={cmTheme:"3024-day",theme:"light"},R=function(e){var t=function(){return Object(r.jsxs)("div",{className:"row",children:[Object(r.jsx)(u.n,{children:"\u9009\u62e9 CodeMirror \u4e3b\u9898"}),Object(r.jsx)(u.k,{placeholder:"\u9009\u62e9\u4e3b\u9898",value:e.prop.cmTheme,onChange:function(t){return e.onChange(Object(s.a)(Object(s.a)({},e.prop),{},{cmTheme:t}))},children:f.map((function(e){return Object(r.jsx)(u.k.Option,{value:e,children:e},e)}))})]})};return Object(r.jsx)(u.c,{children:Object(r.jsx)(t,{})})};var A=function(e){var t=function(){e.onClose()};return Object(r.jsxs)(u.j,{visible:e.visible,onClose:t,width:"30rem",children:[Object(r.jsx)(u.j.Title,{children:"\u9009\u62e9\u9884\u8bbe"}),Object(r.jsx)(u.j.Content,{children:Object(r.jsx)(u.h.Container,{gap:2,children:h.map((function(n,c){return Object(r.jsx)(u.h,{xs:12,children:Object(r.jsx)(u.b,{onClick:function(){e.onPreset(n),t()},style:{width:"100%"},children:n.name},c)},c)}))})}),Object(r.jsx)(u.j.Action,{passive:!0,onClick:t,children:"\u5173\u95ed"})]})};var F=function(e){var t=function(){e.onClose()},n=p.map((function(e){return Object(s.a)(Object(s.a)({},e),{},{name:Object(r.jsx)(u.d,{children:e.name})})}));return Object(r.jsxs)(u.j,{visible:e.visible,onClose:t,width:"35rem",children:[Object(r.jsx)(u.j.Content,{children:Object(r.jsxs)(u.l,{data:n,children:[Object(r.jsx)(u.l.Column,{prop:"attribute",label:"\u5c5e\u6027"}),Object(r.jsx)(u.l.Column,{prop:"type",label:"\u7c7b\u578b"}),Object(r.jsx)(u.l.Column,{prop:"name",label:"\u540d\u79f0"}),Object(r.jsx)(u.l.Column,{prop:"description",label:"\u63cf\u8ff0"})]})}),Object(r.jsx)(u.j.Action,{passive:!0,onClick:t,children:"\u5173\u95ed"})]})},I=n(14);var D=function(e){return Object(r.jsxs)(u.j,{visible:e.visible,onClose:e.onClose,width:"35rem",children:[Object(r.jsxs)(u.j.Content,{children:[Object(r.jsxs)("p",{children:[Object(r.jsx)("b",{children:"Z Shader Viewer "}),Object(r.jsxs)(u.a,{scale:.8,children:["v.",I.version]})]}),Object(r.jsxs)("p",{children:["2020 - ",(new Date).getFullYear()," By owlzou"]}),Object(r.jsx)("p",{children:"\u9e23\u8c22\uff1a"}),Object(r.jsxs)("ul",{children:[Object(r.jsx)("li",{children:Object(r.jsx)("a",{href:"https://github.com/facebook/create-react-app",children:"create-react-app"})}),Object(r.jsx)("li",{children:Object(r.jsx)("a",{href:"https://github.com/scniro/react-codemirror2",children:"react-codemirror2"})}),Object(r.jsx)("li",{children:Object(r.jsx)("a",{href:"https://github.com/geist-org/react",children:"geist-ui"})})]}),Object(r.jsx)("p",{children:"APP\u4e2d\u4f7f\u7528\u7684\u9ed8\u8ba4\u56fe\u7247\u6765\u81ea\u4e8eUnsplash\uff1a"}),Object(r.jsxs)("ul",{children:[Object(r.jsxs)("li",{children:["Photo by"," ",Object(r.jsx)("a",{href:"https://unsplash.com/@yessijes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",children:"Jessica Pamp"})," ","on"," ",Object(r.jsx)("a",{href:"https://unsplash.com/@yessijes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",children:"Unsplash"})]}),Object(r.jsxs)("li",{children:["Photo by"," ",Object(r.jsx)("a",{href:"https://unsplash.com/@pwign?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",children:"Anh Nguyen"})," ","on"," ",Object(r.jsx)("a",{href:"https://unsplash.com/@pwign?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",children:"Unsplash"})]})]})]}),Object(r.jsx)(u.j.Action,{passive:!0,onClick:e.onClose,children:"\u5173\u95ed"})]})};var N=function(){var e=Object(c.useState)(h[0].vex),t=Object(l.a)(e,2),n=t[0],o=t[1],a=Object(c.useState)(h[0].frag),i=Object(l.a)(a,2),j=i[0],m=i[1],p=Object(c.useState)(!1),f=Object(l.a)(p,2),x=f[0],v=f[1],g=Object(c.useState)(!1),O=Object(l.a)(g,2),w=O[0],y=O[1],C=Object(c.useState)(!1),S=Object(l.a)(C,2),I=S[0],N=S[1],G=Object(c.useState)(E),U=Object(l.a)(G,2),L=U[0],P=U[1];Object(c.useEffect)((function(){var e=window.localStorage;try{P(JSON.parse(e.settings))}catch(t){}}),[]);var V=u.p.createFromDark({type:"softDark",palette:{}}),B=function(){return Object(r.jsxs)(u.h.Container,{gap:2,alignContent:"center",children:[Object(r.jsxs)(u.h,{sm:24,md:12,children:[Object(r.jsx)("img",{src:"data:image/png;base64,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",style:{marginRight:"10px"},alt:"logo"}),Object(r.jsxs)(u.a.Anchor,{children:[Object(r.jsx)(u.n,{h4:!0,style:{margin:"0"},children:"Z ShaderViewer"}),Object(r.jsx)(u.a,{scale:.8,children:"Beta"})]})]}),Object(r.jsxs)(u.h.Container,{justify:"flex-end",alignContent:"center",sm:24,md:12,children:[Object(r.jsx)(u.h,{children:Object(r.jsx)(u.b,{icon:"light"===L.theme?Object(r.jsx)(d.Sun,{}):Object(r.jsx)(d.Moon,{}),auto:!0,type:"abort",onClick:function(){return function(){var e=Object(s.a)(Object(s.a)({},L),{},{theme:"softDark"===L.theme?"light":"softDark"});P(e),window.localStorage.settings=JSON.stringify(e)}()},children:"light"===L.theme?"\u767d\u5929":"\u9ed1\u591c"})}),Object(r.jsx)(u.h,{children:Object(r.jsx)(u.b,{icon:Object(r.jsx)(d.Lambda,{}),auto:!0,type:"abort",onClick:function(){return N(!0)},children:"\u53d8\u91cf\u652f\u6301"})}),Object(r.jsx)(u.h,{children:Object(r.jsx)(u.b,{icon:Object(r.jsx)(d.Folder,{}),auto:!0,type:"abort",onClick:function(){return v(!0)},children:"\u52a0\u8f7d\u9884\u8bbe"})}),Object(r.jsx)(u.h,{children:Object(r.jsx)(u.b,{icon:Object(r.jsx)(d.Info,{}),auto:!0,type:"abort",onClick:function(){return y(!0)},children:"\u5173\u4e8e"})}),Object(r.jsx)(u.h,{children:Object(r.jsx)(u.b,{icon:Object(r.jsx)(d.Github,{}),auto:!0,type:"abort",onClick:function(){window.open("https://github.com/owlzou/zsv","_blank")},children:"Github"})})]})]})};return Object(r.jsxs)(u.g,{themes:[V],themeType:L.theme,children:[Object(r.jsx)(u.e,{}),Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)(B,{}),Object(r.jsxs)(u.h.Container,{gap:2,style:{padding:"0 20px"},children:[Object(r.jsx)(u.h,{sm:24,md:12,children:Object(r.jsx)(T,{vertexSource:n,fragmentSource:j})}),Object(r.jsxs)(u.h,{sm:24,md:12,children:[Object(r.jsx)("link",{rel:"stylesheet",href:"https://unpkg.com/codemirror@5.59.0/theme/".concat(L.cmTheme,".css")}),Object(r.jsxs)(u.m,{initialValue:"2",style:{width:"100%"},children:[Object(r.jsx)(u.m.Item,{label:"\u9876\u70b9\u7740\u8272\u5668",value:"1",children:Object(r.jsx)(b,{value:n,theme:L.cmTheme,onChange:function(e){o(e)}})}),Object(r.jsx)(u.m.Item,{label:"\u7247\u6bb5\u7740\u8272\u5668",value:"2",children:Object(r.jsx)(b,{value:j,theme:L.cmTheme,onChange:function(e){return m(e)}})}),Object(r.jsx)(u.m.Item,{label:"\u5de5\u5177",value:"3",children:Object(r.jsx)(k,{})}),Object(r.jsx)(u.m.Item,{label:"\u8bbe\u7f6e",value:"4",children:Object(r.jsx)(R,{prop:L,onChange:function(e){window.localStorage.settings=JSON.stringify(e),P(e)}})})]})]})]})]}),Object(r.jsx)(A,{onPreset:function(e){console.log("Load preset ".concat(e.name)),o(e.vex),m(e.frag)},visible:x,onClose:function(){return v(!1)}}),Object(r.jsx)(F,{visible:I,onClose:function(){return N(!1)}}),Object(r.jsx)(D,{visible:w,onClose:function(){return y(!1)}})]})};i.a.render(Object(r.jsx)(o.a.StrictMode,{children:Object(r.jsxs)(u.g,{children:[Object(r.jsx)(u.e,{}),Object(r.jsx)(N,{})]})}),document.getElementById("root"))}},[[346,1,2]]]);
//# sourceMappingURL=main.055d7b02.chunk.js.map