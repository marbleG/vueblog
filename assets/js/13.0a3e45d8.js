(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{288:function(a,s,t){"use strict";t.r(s);var e=t(10),r=Object(e.a)({},(function(){var a=this,s=a._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"ci-cd"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ci-cd"}},[a._v("#")]),a._v(" CI/CD")]),a._v(" "),s("h3",{attrs:{id:"sonar"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sonar"}},[a._v("#")]),a._v(" sonar")]),a._v(" "),s("ol",[s("li",[a._v("必备条件"),s("br"),a._v("\n#linux")])]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sysctl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-w")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("vm.max_map_count")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("524288")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sysctl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-w")]),a._v(" fs.file-max"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("131072")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("ulimit")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-n")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("131072")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("ulimit")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-u")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("8192")]),a._v("\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[a._v("安装数据库")])]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" run "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--name")]),a._v(" postgresqldb "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--restart")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("always "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-p")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("5432")]),a._v(":5432 "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-e")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("POSTGRES_USER")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("root "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-e")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("POSTGRES_PASSWORD")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("root "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" postgres\n")])])]),s("p",[a._v("创建数据库帐号")]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("create user sonar with password "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'sonar'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\ncreate database sonar owner sonar"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\ngrant all privileges on database sonar to sonar"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[a._v("启动sonar")])]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" run "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--name")]),a._v(" sonarqube "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-p")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("9000")]),a._v(":9000 "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-e")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("SONAR_JDBC_URL")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("jdbc:postgresql://127.0.0.1:5432/sonar "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-e")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("SONAR_JDBC_USERNAME")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("sonar "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-e")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("SONAR_JDBC_PASSWORD")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("sonar "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v(" sonarqube_data:/opt/sonarqube/data "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v(" sonarqube_extensions:/opt/sonarqube/extensions "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v(" sonarqube_logs:/opt/sonarqube/logs "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    sonarqube\n")])])]),s("ol",{attrs:{start:"4"}},[s("li",[a._v("查看服务器控制台: http://127.0.0.1:9000   admin/admin")]),a._v(" "),s("li",[a._v("maven项目使用sonar")])]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v(" mvn clean verify sonar:sonar "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-DskipTests")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-Dsonar.projectKey")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("projectKey"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("   "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-Dsonar.host.url")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("http://127.0.0.1:9000   "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-Dsonar.login")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("loginToken"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);