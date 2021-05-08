(this.webpackJsonpzshaderviewer=this.webpackJsonpzshaderviewer||[]).push([[0],{114:function(e,t,n){},115:function(e,t,n){},445:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(19),c=n.n(o),i=(n(114),n(18)),l=(n(115),n(11)),s=n(23),u=n(10),d=[{vex:"attribute vec3 aPosition;\nattribute vec2 aTexCoord;\nvarying lowp vec2 vTexCoord;\nvoid main(){\n    vTexCoord = aTexCoord;\n    gl_Position=vec4(aPosition,1.0);\n}",frag:"varying lowp vec2 vTexCoord;\nuniform sampler2D uSampler;\nvoid main(){\n    // vTexCoord\u662f\u5f53\u524d\u5904\u7406\u7684\u70b9\u5728\u56fe\u7247\u91cc\u7684\u5750\u6807 \n    // texture2D \u662f\u63d0\u53d6\u7eb9\u7406\u4e2d\u5bf9\u5e94\u5750\u6807\u7684\u989c\u8272\n    gl_FragColor = texture2D(uSampler,vTexCoord);\n}",name:"\u56fe\u7247-\u57fa\u7840"},{vex:"attribute vec3 aPosition;\nattribute vec2 aTexCoord;\nvarying lowp vec2 vTexCoord;\nvoid main(){\n    vTexCoord = aTexCoord;\n    gl_Position=vec4(aPosition,1.0);\n}",frag:"varying lowp vec2 vTexCoord;\nuniform sampler2D uSampler;\nvoid main(){\n    lowp vec4 color = texture2D(uSampler,vTexCoord);\n    lowp float gray = color[0]*0.3 + color[1]*0.59 + color[2]*0.11;\n    lowp vec4 new_color = vec4(gray,gray,gray,1);\n    gl_FragColor = new_color;\n}",name:"\u56fe\u7247-\u7070\u5ea6"}],j=[{attribute:"attribute",type:"vec3",name:Object(u.jsx)(l.Code,{children:"aPosition"}),description:"\u8f93\u5165\u5750\u6807"},{attribute:"attribute",type:"vec2",name:Object(u.jsx)(l.Code,{children:"aTexCoord"}),description:"\u9876\u70b9\u7684\u7eb9\u7406\u5750\u6807"},{attribute:"uniform",type:"sampler2D",name:Object(u.jsx)(l.Code,{children:"uSampler"}),description:"\u7eb9\u7406\u6570\u636e"},{attribute:"uniform",type:"vec2",name:Object(u.jsx)(l.Code,{children:"uTextureSize"}),description:"\u56fe\u7247\u7684\u5927\u5c0f"}],b=n(60);function m(e,t,n){var r=e.createShader(n);if(e.shaderSource(r,t),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw new Error("ShaderInfoLog:\n".concat(e.getShaderInfoLog(r)));return r}function f(e,t,n,r,a,o,c){var i=arguments.length>7&&void 0!==arguments[7]?arguments[7]:null,l=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferData(e.ARRAY_BUFFER,new Float32Array(r),e.STATIC_DRAW);var s=e.getAttribLocation(t,n);if(e.vertexAttribPointer(s,a,e.FLOAT,!1,o,c),null!=i){var u=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,u),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(i),e.STATIC_DRAW)}return e.enableVertexAttribArray(s),l}function x(e,t,n,r){e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT);var a=function(e,t,n){var r=m(e,t,e.VERTEX_SHADER),a=m(e,n,e.FRAGMENT_SHADER),o=e.createProgram();if(e.attachShader(o,r),e.attachShader(o,a),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS))throw new Error("ProgramInfoLog:\n".concat(e.getProgramInfoLog(o)));return o}(e,t,n);f(e,a,"aPosition",[-1,-1,0,-1,1,0,1,-1,0,1,1,0],3,0,0),f(e,a,"aTexCoord",[0,1,0,0,1,1,1,0],2,0,0),e.useProgram(a),e.uniform2f(e.getUniformLocation(a,"uTextureSize"),parseFloat(r.width).toFixed(1),parseFloat(r.height).toFixed(1)),function(e,t,n){var r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_NEAREST),e.generateMipmap(e.TEXTURE_2D),e.uniform1i(e.getUniformLocation(t,"uSampler"),0)}(e,a,r),e.drawArrays(e.TRIANGLE_STRIP,0,4)}var v,g=n.p+"static/media/jessica-pamp-sGRMspZmfPE-unsplash.5cffdaca.jpg";function h(e){switch(e){case v.Image:return"Image";case v.CustomImage:return"CustomImage"}}!function(e){e[e.Image=0]="Image",e[e.CustomImage=1]="CustomImage"}(v||(v={}));var O=function(e){var t=Object(r.useRef)(null),n=Object(r.useState)(null),a=Object(i.a)(n,2),o=a[0],c=a[1],d=Object(r.useState)({background:v.Image}),j=Object(i.a)(d,2),m=j[0],f=j[1],O=Object(r.useCallback)((function(e){if("object"!=typeof e){console.log("Load Image");var n=new Image;n.src=e||g,n.onload=function(){console.log("Image loaded"),t.current.width=n.width,t.current.height=n.height;var e=t.current.getContext("webgl2");e.viewport(0,0,e.canvas.width,e.canvas.height),c(n)}}}),[t]);return Object(r.useEffect)((function(){try{var n=t.current.getContext("webgl2",{preserveDrawingBuffer:!0});o&&x(n,e.vertexSource,e.fragmentSource,o),e.onError("")}catch(r){e.onError(r.message)}}),[o,e]),Object(r.useEffect)((function(){O(g)}),[O]),Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("div",{style:{textAlign:"center"},children:Object(u.jsx)("canvas",{ref:t,style:{height:"50vh",width:"100%",objectFit:"contain"}})}),Object(u.jsx)(l.Divider,{}),Object(u.jsx)("form",{className:"control",children:Object(u.jsxs)(l.Row,{gap:.8,style:{flexWrap:"wrap"},children:[Object(u.jsx)(l.Text,{children:"\u80cc\u666f"}),Object(u.jsxs)(l.Select,{placeholder:"\u9009\u62e9\u80cc\u666f",onChange:function(e){if("string"==typeof e){var t=function(e){switch(e){case"Image":return v.Image;case"CustomImage":return v.CustomImage;default:return v.Image}}(e),n=Object(b.a)(Object(b.a)({},m),{},{background:t});f(n)}},value:h(m.background),children:[Object(u.jsx)(l.Select.Option,{value:"Image",children:"\u56fe\u7247\u4e00"}),Object(u.jsx)(l.Select.Option,{value:"CustomImage",children:"\u81ea\u5b9a\u4e49\u56fe\u7247"})]}),m.background===v.CustomImage&&Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(l.Button,{size:"small",icon:Object(u.jsx)(s.Upload,{}),type:"secondary",onClick:function(){var e=document.createElement("input");e.type="file",e.accept="image/*",e.onchange=function(){if(e.files[0]){var t=new FileReader;t.onload=function(e){O(e.target.result)},t.readAsDataURL(e.files[0])}},e.click()},auto:!0,children:"\u4e0a\u4f20\u56fe\u7247"}),Object(u.jsx)(l.Button,{size:"small",icon:Object(u.jsx)(s.Download,{}),onClick:function(){var e=t.current.toDataURL("image/png"),n=document.createElement("a");n.download="download",n.href=e,document.body.appendChild(n),n.click(),n.remove()},auto:!0,children:"\u4e0b\u8f7d\u56fe\u7247"})]})]})})]})};var p=function(e){var t=Object(r.useState)(!1),n=Object(i.a)(t,2),a=n[0],o=n[1],c=function(){o(!1)};return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(l.Button,{icon:Object(u.jsx)(s.Folder,{}),auto:!0,type:"abort",onClick:function(){return o(!0)},children:"\u52a0\u8f7d\u9884\u8bbe"}),Object(u.jsxs)(l.Modal,{open:a,onClose:c,width:"30rem",children:[Object(u.jsx)(l.Modal.Title,{children:"\u9009\u62e9\u9884\u8bbe"}),Object(u.jsx)(l.Modal.Content,{children:Object(u.jsx)(l.Grid.Container,{gap:2,children:d.map((function(t,n){return Object(u.jsx)(l.Grid,{children:Object(u.jsx)(l.Button,{onClick:function(){e.onPreset(t),c()},children:t.name},n)},n)}))})}),Object(u.jsx)(l.Modal.Action,{passive:!0,onClick:function(e){return(0,e.close)()},children:"\u5173\u95ed"})]})]})},T=n(109);n(442),n(443),n(444);function C(e){return Object(u.jsx)(T.Controlled,{value:e.value,onBeforeChange:function(t,n,r){e.onChange(r)},options:{tabSize:4,mode:"x-shader/x-vertex",theme:"dracula",matchBrackets:!0,lineNumbers:!0}})}var w=function(){var e=Object(r.useState)(!1),t=Object(i.a)(e,2),n=t[0],a=t[1],o=j;return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(l.Button,{icon:Object(u.jsx)(s.Lambda,{}),auto:!0,type:"abort",onClick:function(){return a(!0)},children:"\u53d8\u91cf\u652f\u6301"}),Object(u.jsxs)(l.Modal,{open:n,onClose:function(){a(!1)},width:"35rem",children:[Object(u.jsx)(l.Modal.Content,{children:Object(u.jsxs)(l.Table,{data:o,children:[Object(u.jsx)(l.Table.Column,{prop:"attribute",label:"\u5c5e\u6027"}),Object(u.jsx)(l.Table.Column,{prop:"type",label:"\u7c7b\u578b"}),Object(u.jsx)(l.Table.Column,{prop:"name",label:"\u540d\u79f0"}),Object(u.jsx)(l.Table.Column,{prop:"description",label:"\u63cf\u8ff0"})]})}),Object(u.jsx)(l.Modal.Action,{passive:!0,onClick:function(e){return(0,e.close)()},children:"\u5173\u95ed"})]})]})};var S=function(){var e=Object(r.useState)(d[0].vex),t=Object(i.a)(e,2),n=t[0],a=t[1],o=Object(r.useState)(d[0].frag),c=Object(i.a)(o,2),j=c[0],b=c[1],m=Object(r.useState)(void 0),f=Object(i.a)(m,2),x=f[0],v=f[1];return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsxs)(l.Grid.Container,{gap:2,alignContent:"center",style:{padding:"0 32px",height:"70px"},children:[Object(u.jsxs)(l.Grid,{sm:24,md:12,children:[Object(u.jsx)("img",{src:"data:image/png;base64,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",style:{marginRight:"10px",transform:"translateY(25%)"},alt:"logo"}),Object(u.jsx)(l.Text,{h4:!0,style:{margin:"0",display:"inline-block",marginRight:"10px"},children:"Z ShaderViewer"}),Object(u.jsx)(l.Badge,{size:"small",children:"Beta"})]}),Object(u.jsx)(l.Grid,{sm:24,md:12,children:Object(u.jsxs)("div",{className:"nav-right",children:[Object(u.jsx)(w,{}),Object(u.jsx)(p,{onPreset:function(e){console.log("Load preset ".concat(e.name)),a(e.vex),b(e.frag)}}),Object(u.jsx)(l.Button,{icon:Object(u.jsx)(s.Github,{}),auto:!0,type:"abort",onClick:function(){window.open("https://github.com/owlzou/zsv","_blank")},children:"Github"})]})})]}),Object(u.jsxs)(l.Grid.Container,{gap:2,style:{padding:"0 20px"},children:[Object(u.jsxs)(l.Grid,{sm:24,md:12,children:[Object(u.jsx)(O,{vertexSource:n,fragmentSource:j,onError:function(e){return v(e)}}),Object(u.jsx)("div",{className:"control",children:Object(u.jsx)(l.Textarea,{value:x||"",width:"100%",minHeight:"200px",readOnly:!0})})]}),Object(u.jsx)(l.Grid,{sm:24,md:12,children:Object(u.jsxs)(l.Tabs,{initialValue:"1",children:[Object(u.jsx)(l.Tabs.Item,{label:"\u9876\u70b9\u7740\u8272\u5668",value:"1",children:Object(u.jsx)(C,{value:n,onChange:function(e){a(e)}})}),Object(u.jsx)(l.Tabs.Item,{label:"\u7247\u6bb5\u7740\u8272\u5668",value:"2",children:Object(u.jsx)(C,{value:j,onChange:function(e){return b(e)}})})]})})]})]})};c.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsxs)(l.GeistProvider,{children:[Object(u.jsx)(l.CssBaseline,{}),Object(u.jsx)(S,{})]})}),document.getElementById("root"))}},[[445,1,2]]]);
//# sourceMappingURL=main.123110ec.chunk.js.map