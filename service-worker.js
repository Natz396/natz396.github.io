if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let i=Promise.resolve();return r[e]||(i=new Promise((async i=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=i}else importScripts(e),i()}))),i.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},i=(i,r)=>{Promise.all(i.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(i)};self.define=(i,a,c)=>{r[i]||(r[i]=Promise.resolve().then((()=>{let r={};const s={uri:location.origin+i.slice(1)};return Promise.all(a.map((i=>{switch(i){case"exports":return r;case"module":return s;default:return e(i)}}))).then((e=>{const i=c(...e);return r.default||(r.default=i),r}))})))}}define("./service-worker.js",["./workbox-bed83ea8"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"js/app.min.js",revision:"d77cc17320f2a4d2ff41d957adb25150"},{url:"js/extensions.min.js",revision:"8f6625690fa713232aedd263ba09d115"},{url:"js/stencils.min.js",revision:"0362d7259ad60cb9f1cd7841ee742915"},{url:"js/shapes-14-6-5.min.js",revision:"ba6695ab64bca62059a0ccfebceb1222"},{url:"js/math-print.js",revision:"9d98c920695f6c3395da4b68f723e60a"},{url:"index.html",revision:"28ab148081b0ccd22ad2db634d538b6b"},{url:"open.html",revision:"d71816b3b00e769fc6019fcdd6921662"},{url:"styles/grapheditor.css",revision:"748da0cd0a068a52eac70ee2b2c194fe"},{url:"styles/atlas.css",revision:"e8152cda9233d3a3af017422993abfce"},{url:"styles/dark.css",revision:"3179f617dd02efd2cefeb8c06f965880"},{url:"js/croppie/croppie.min.css",revision:"fc297c9002c79c15a132f13ee3ec427e"},{url:"js/dropbox/Dropbox-sdk.min.js",revision:"4b9842892aa37b156db0a8364b7a83b0"},{url:"js/onedrive/OneDrive.js",revision:"505e8280346666f7ee801bc59521fa67"},{url:"js/viewer-static.min.js",revision:"1fa681927dff436d7ac85014c7da92af"},{url:"connect/jira/editor-1-3-3.html",revision:"a2b0e7267a08a838f3cc404eba831ec0"},{url:"connect/jira/viewerPanel-1-3-12.html",revision:"2ce6e99d95113e9ca6b24343cea202e0"},{url:"connect/jira/fullScreenViewer-1-3-3.html",revision:"ba7ece2dfb2833b72f97280d7092f25e"},{url:"connect/jira/viewerPanel.js",revision:"6e9412c359a21b86dc7c5128bf6208d4"},{url:"connect/jira/spinner.gif",revision:"7d857ab9d86123e93d74d48e958fe743"},{url:"connect/jira/editor.js",revision:"01caa325f3ad3f6565e0b4228907fb63"},{url:"connect/jira/fullscreen-viewer-init.js",revision:"197ed5837ed27992688fc424699a9a78"},{url:"connect/jira/fullscreen-viewer.js",revision:"4e0775a6c156a803e777870623ac7c3e"},{url:"plugins/connectJira.js",revision:"4cefa13414e0d406550f3c073923080c"},{url:"plugins/cConf-comments.js",revision:"c787357209cff2986dcca567b599e2ef"},{url:"plugins/cConf-1-4-8.js",revision:"ff6d6e41b861a30d0b39ac80bd34afa7"},{url:"connect/confluence/connectUtils-1-4-8.js",revision:"5c1347e70320818c040f941b428757a6"},{url:"connect/new_common/cac.js",revision:"3d8c436c566db645fb1e6e6ba9f69bbc"},{url:"connect/gdrive_common/gac.js",revision:"38f1df3ecc4d78290493f47e62202138"},{url:"connect/onedrive_common/ac.js",revision:"887d3ac605a7bb297067537e7c1f5686"},{url:"connect/confluence/viewer-init.js",revision:"4a60c6c805cab7bc782f1e52f7818d9f"},{url:"connect/confluence/viewer.js",revision:"2c2497f5cadbfc653d9081a29f262c5b"},{url:"connect/confluence/viewer-1-4-42.html",revision:"c7b38b3af4eb7a58ab6dc4791216530e"},{url:"connect/confluence/macroEditor-1-4-8.html",revision:"8cd74a2fb60bf2e3e86026d66107cf11"},{url:"connect/confluence/includeDiagram-1-4-8.js",revision:"8b670f4b6ccde55358851da705ae884f"},{url:"connect/confluence/includeDiagram.html",revision:"c03c89622d22227313645900af4e3c3d"},{url:"connect/confluence/macro-editor.js",revision:"e273a48b8e81faac4530bf1a68d75aa0"},{url:"math/MathJax.js",revision:"b2c103388b71bb3d11cbf9aa45fe9b68"},{url:"math/config/TeX-MML-AM_SVG-full.js",revision:"d5cb8ac04050983170ae4af145bc66ff"},{url:"math/jax/output/SVG/fonts/TeX/fontdata.js",revision:"495e5a410955d1b6178870e605890ede"},{url:"math/jax/element/mml/optable/BasicLatin.js",revision:"cac9b2e71382e62270baa55fab07cc13"},{url:"math/jax/output/SVG/fonts/TeX/Size2/Regular/Main.js",revision:"e3e5e4d5924beed29f0844550b5c8f46"},{url:"math/jax/output/SVG/fonts/TeX/Main/Regular/LetterlikeSymbols.js",revision:"0767cbad7275b53da128e7e5e1109f7c"},{url:"math/jax/output/SVG/fonts/TeX/Main/Regular/GreekAndCoptic.js",revision:"346302a5c5ee00e01c302148c56dbfe3"},{url:"resources/dia.txt",revision:"b942f922d9f8bc11cd18ae480bf3384a"},{url:"resources/dia_am.txt",revision:"f6aff3a89141f9dfb5251ba18e211dd7"},{url:"resources/dia_ar.txt",revision:"63ee921f667182ac92c129fb0c317259"},{url:"resources/dia_bg.txt",revision:"d4bb8f751ad71e65a4683b6df7e15c8e"},{url:"resources/dia_bn.txt",revision:"a1d06103fdaa143f785b350e0101b934"},{url:"resources/dia_bs.txt",revision:"1370931d55b06a46eb49644865518743"},{url:"resources/dia_ca.txt",revision:"d3c70e67e9a998e676bb66197c94d11e"},{url:"resources/dia_cs.txt",revision:"df8679b009544ee1c939089186a177ab"},{url:"resources/dia_da.txt",revision:"3c5a857024218fe6a13caf7212741915"},{url:"resources/dia_de.txt",revision:"3b8042acbfe49f30a73a81194c5c33bf"},{url:"resources/dia_el.txt",revision:"28b978f085272adf11e425d4813dd73a"},{url:"resources/dia_eo.txt",revision:"f6dcae5d1e7e5f69e1fe9911d2f507cd"},{url:"resources/dia_es.txt",revision:"316295da9d7afc594021e9f1033e5eb6"},{url:"resources/dia_et.txt",revision:"15c4cea25fb49a098b88c3ff409febb8"},{url:"resources/dia_eu.txt",revision:"05ce0996775e6bcc4c9b7d58de7c61b2"},{url:"resources/dia_fa.txt",revision:"979342876980ea5e03835c544e245217"},{url:"resources/dia_fi.txt",revision:"fac93d35fd040a64b081bce0c79bc62e"},{url:"resources/dia_fil.txt",revision:"d3028fbc594d706c256ee168e9a1f681"},{url:"resources/dia_fr.txt",revision:"1e3bb397f523c0350979a6b08928abe4"},{url:"resources/dia_gl.txt",revision:"4cf58d65673201fb2d491295763ed98f"},{url:"resources/dia_gu.txt",revision:"33ba86f2a2f8c1f49edb5b2e5535cc40"},{url:"resources/dia_he.txt",revision:"06b0ff666752ac117bb278acf5dd7f7d"},{url:"resources/dia_hi.txt",revision:"8ec1315a2d310fddce76861e203b9118"},{url:"resources/dia_hr.txt",revision:"16b93403b047402ceebe68322c6c6a98"},{url:"resources/dia_hu.txt",revision:"2d93b53ecad72fa6e4691e2f33e515d1"},{url:"resources/dia_id.txt",revision:"dd308fb6e8449f3f7bd971a2a98c2f9c"},{url:"resources/dia_it.txt",revision:"8fc95c3409c798f65e05bb73b0fde0a3"},{url:"resources/dia_ja.txt",revision:"7b947cb4fd340d77187c5677364de8d2"},{url:"resources/dia_kn.txt",revision:"5ad22f0173968949a42d71b1af5879f6"},{url:"resources/dia_ko.txt",revision:"eb17aa9b3959b66790cabb8bea06c9ba"},{url:"resources/dia_lt.txt",revision:"87005a8fb56a12d320d46a8f6571878e"},{url:"resources/dia_lv.txt",revision:"003fe6c0cc520c1e046ecef3f2e24645"},{url:"resources/dia_ml.txt",revision:"b9fdb8da7c54ccc2551e31fa0717a79a"},{url:"resources/dia_mr.txt",revision:"eed2d64d7bf2d931ea09e245ffe42b08"},{url:"resources/dia_ms.txt",revision:"47e7838533a65fc020fa2889613282c4"},{url:"resources/dia_my.txt",revision:"b942f922d9f8bc11cd18ae480bf3384a"},{url:"resources/dia_nl.txt",revision:"1c3aa22b9c49bfde8aafbc03f8150720"},{url:"resources/dia_no.txt",revision:"c4e0a7ca411c3b755c4a727c04ec5738"},{url:"resources/dia_pl.txt",revision:"9326d2a6dc735e202e9505e8d6e6e950"},{url:"resources/dia_pt-br.txt",revision:"c5e1bb5c2e5672fe99939c16a253f0ab"},{url:"resources/dia_pt.txt",revision:"655db5e90b18c50c7869575f638b7a60"},{url:"resources/dia_ro.txt",revision:"09cc16739652f0bcd41e7d0e317a113b"},{url:"resources/dia_ru.txt",revision:"1ee82074fdd272083dd8b6e3dc376b9b"},{url:"resources/dia_si.txt",revision:"b942f922d9f8bc11cd18ae480bf3384a"},{url:"resources/dia_sk.txt",revision:"00e784a4b2af31147cc9c3915635a5ae"},{url:"resources/dia_sl.txt",revision:"e5b49cebef2e88a66532aa9af5cd20a8"},{url:"resources/dia_sr.txt",revision:"ca3ca503bf33072e2317a50f184c105c"},{url:"resources/dia_sv.txt",revision:"9169da00f2a33611e3f0b879af606754"},{url:"resources/dia_sw.txt",revision:"f399364e9417c8aec86db60e8064814d"},{url:"resources/dia_ta.txt",revision:"9e4d67e5778c56f499d300b7d0d6a2f9"},{url:"resources/dia_te.txt",revision:"282bd2b23844f71675b95db66f313cd9"},{url:"resources/dia_th.txt",revision:"2edc6530d9b58be6f4b7d914f330059b"},{url:"resources/dia_tr.txt",revision:"bee6c7d243888806a6f61bfba83f99db"},{url:"resources/dia_uk.txt",revision:"24b2b79bcf00730564e29a1e1dabd69c"},{url:"resources/dia_vi.txt",revision:"8e7e43451b96eab8b2a0fd22477b3b02"},{url:"resources/dia_zh-tw.txt",revision:"4117663abeb6a0ce4dc2afe13d64610a"},{url:"resources/dia_zh.txt",revision:"e5f7866889b288a97401a234185dcb52"},{url:"favicon.ico",revision:"fab2d88b37c72d83607527573de45281"},{url:"images/manifest.json",revision:"c6236bde53ed79aaaec60a1aca8ee2ef"},{url:"images/logo.png",revision:"89630b64b911ebe0daa3dfe442087cfa"},{url:"images/drawlogo.svg",revision:"4bf4d14ebcf072d8bd4c5a1c89e88fc6"},{url:"images/drawlogo48.png",revision:"8b13428373aca67b895364d025f42417"},{url:"images/drawlogo-gray.svg",revision:"0aabacbc0873816e1e09e4736ae44c7d"},{url:"images/drawlogo-text-bottom.svg",revision:"f6c438823ab31f290940bd4feb8dd9c2"},{url:"images/default-user.jpg",revision:"2c399696a87c8921f12d2f9e1990cc6e"},{url:"images/logo-flat-small.png",revision:"4b178e59ff499d6dd1894fc498b59877"},{url:"images/apple-touch-icon.png",revision:"73da7989a23ce9a4be565ec65658a239"},{url:"images/favicon-16x16.png",revision:"1a79d5461a5d2bf21f6652e0ac20d6e5"},{url:"images/favicon-32x32.png",revision:"e3b92da2febe70bad5372f6f3474b034"},{url:"images/android-chrome-196x196.png",revision:"f8c045b2d7b1c719fda64edab04c415c"},{url:"images/android-chrome-512x512.png",revision:"959b5fac2453963ff6d60fb85e4b73fd"},{url:"images/delete.png",revision:"5f2350f2fd20f1a229637aed32ed8f29"},{url:"images/droptarget.png",revision:"bbf7f563fb6784de1ce96f329519b043"},{url:"images/help.png",revision:"9266c6c3915bd33c243d80037d37bf61"},{url:"images/download.png",revision:"35418dd7bd48d87502c71b578cc6c37f"},{url:"images/logo-flat.png",revision:"038070ab43aee6e54a791211859fc67b"},{url:"images/google-drive-logo.svg",revision:"5d9f2f5bbc7dcc252730a0072bb23059"},{url:"images/onedrive-logo.svg",revision:"3645b344ec0634c1290dd58d7dc87b97"},{url:"images/dropbox-logo.svg",revision:"e6be408c77cf9c82d41ac64fa854280a"},{url:"images/github-logo.svg",revision:"a1a999b69a275eac0cb918360ac05ae1"},{url:"images/gitlab-logo.svg",revision:"0faea8c818899e58533e153c44b10517"},{url:"images/trello-logo.svg",revision:"006fd0d7d70d7e95dc691674cb12e044"},{url:"images/osa_drive-harddisk.png",revision:"b954e1ae772087c5b4c6ae797e1f9649"},{url:"images/osa_database.png",revision:"c350d9d9b95f37b6cfe798b40ede5fb0"},{url:"images/google-drive-logo-white.svg",revision:"f329d8b1be7778515a85b93fc35d9f26"},{url:"images/dropbox-logo-white.svg",revision:"4ea8299ac3bc31a16f199ee3aec223bf"},{url:"images/onedrive-logo-white.svg",revision:"b3602fa0fc947009cff3f33a581cff4d"},{url:"images/github-logo-white.svg",revision:"537b1127b3ca0f95b45782d1304fb77a"},{url:"images/gitlab-logo-white.svg",revision:"5fede9ac2f394c716b8c23e3fddc3910"},{url:"images/trello-logo-white-orange.svg",revision:"e2a0a52ba3766682f138138d10a75eb5"},{url:"images/logo-confluence.png",revision:"ed1e55d44ae5eba8f999aba2c93e8331"},{url:"images/logo-jira.png",revision:"f8d460555a0d1f87cfd901e940666629"},{url:"images/clear.gif",revision:"db13c778e4382e0b55258d0f811d5d70"},{url:"images/spin.gif",revision:"487cbb40b9ced439aa1ad914e816d773"},{url:"images/checkmark.gif",revision:"ba764ce62f2bf952df5bbc2bb4d381c5"},{url:"images/hs.png",revision:"fefa1a03d92ebad25c88dca94a0b63db"},{url:"images/aui-wait.gif",revision:"5a474bcbd8d2f2826f03d10ea44bf60e"},{url:"mxgraph/css/common.css",revision:"b5b7280ec98671bb6c3847a36bc7ea12"},{url:"mxgraph/images/expanded.gif",revision:"2b67c2c035af1e9a5cc814f0d22074cf"},{url:"mxgraph/images/collapsed.gif",revision:"73cc826da002a3d740ca4ce6ec5c1f4a"},{url:"mxgraph/images/maximize.gif",revision:"5cd13d6925493ab51e876694cc1c2ec2"},{url:"mxgraph/images/minimize.gif",revision:"8957741b9b0f86af9438775f2aadbb54"},{url:"mxgraph/images/close.gif",revision:"8b84669812ac7382984fca35de8da48b"},{url:"mxgraph/images/resize.gif",revision:"a6477612b3567a34033f9cac6184eed3"},{url:"mxgraph/images/separator.gif",revision:"7819742ff106c97da7a801c2372bbbe5"},{url:"mxgraph/images/window.gif",revision:"fd9a21dd4181f98052a202a0a01f18ab"},{url:"mxgraph/images/window-title.gif",revision:"3fb1d6c43246cdf991a11dfe826dfe99"},{url:"mxgraph/images/button.gif",revision:"00759bdc3ad218fa739f584369541809"},{url:"mxgraph/images/point.gif",revision:"83a43717b284902442620f61bc4e9fa6"}],{ignoreURLParametersMatching:[/.*/]})}));
//# sourceMappingURL=service-worker.js.map
