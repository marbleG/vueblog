module.exports = {
    base: "/vueblog/",
    themeConfig: {
        nav: [
            {text: 'Home', link: '/'},
            {text: 'java', link: '/zh/java/'},
            {text: 'redis', link: '/redis/'},
            {text: 'CI/CD', link: '/cicd/'},
            {text: '网络', link: '/network/'},
            {text: '存储', link: '/store/'},
            {text: 'k8s', link: '/k8s/'},
            {text: 'linux', link: '/linux/'},
            {text: '规范', link: '/standard/'},
            {text: '百度一下', link: 'https://www.baidu.com'},
            {text: 'google', link: 'https://www.google.com'},
        ],
        sidebar: {
            '/cicd/': [
                '',     /* /cicd/ */
                'devops',  /* /cicd/devops.html */
            ],
            '/redis/': [
                '',  /* /redis/README.html */
                'aof',  /* /redis/aof.html */
                'rdb'   /* /redis/chapter2.html */
            ],
            '/store/': [
                '',  /* /ceph/README.html */
                'ceph',  /* /ceph/ceph.html */
            ],
            '/standard/': [
                '',  /* /standard/README.html */
                'design',  /* /standard/design.html */
            ],
            '/network/': [
                '',  /* /network/README.html */
                'base',  /* /network/base.html */
            ]
        }
    },
    sidebar: 'auto',
    plugins: ['@vuepress/back-to-top']

}
